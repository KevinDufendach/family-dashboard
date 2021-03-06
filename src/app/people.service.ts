import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {Person} from './shared/person';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';

export interface PersonId extends Person { id: string; }

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<Person>;
  peopleIds: Observable<PersonId[]>;

  constructor(private afAuth: AngularFireAuth, private readonly afs: AngularFirestore) {
    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    this.afAuth.user.subscribe(
      user => {
        // console.log('User: ' + user.uid);
        this.peopleCollection = afs.collection<Person>('users/' + user.uid + '/people');

        // const collection$: Observable<Person[]> = this.peopleCollection.valueChanges();
        // collection$.subscribe(data => console.log(data) );

        // const newPerson: Person = {
        //   displayName: 'myNewPerson',
        //   nameGiven: 'MyFirstName',
        //   mediaMinutes: 30,
        // };
        // this.peopleCollection.add(newPerson);

        this.peopleIds = this.peopleCollection.snapshotChanges().pipe(
          map(actions => actions.map( a => {
            const data = a.payload.doc.data() as Person;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      }
    );
  }

  static createPerson(): Observable<Person> {
    const newPerson: Person = {};

    return of(newPerson);
  }

  getPersonDetails(id: string): Observable<Person> {
    return this.peopleCollection.doc(id).valueChanges();

    // return new Observable<Person>(subject => {
    //   this.people.subscribe( data => {
    //     console.log(data);
    //
    //     data.forEach(data2 => {
    //       console.log(data2);
    //       if (data2['key'] === key) {
    //         subject.next(Person.copyPerson(data2));
    //       }
    //     });
    //   });
    // });
  }

  addPerson(person: Person): Promise<DocumentReference> {
    return this.peopleCollection.add(person);
  }

  updatePerson(id: string, person: Person): Promise<void> {
    // TODO: Remove ID from updating
    return this.peopleCollection.doc(id).set(this.clean(person));
  }


  clean<T>(obj: T): T {
    const copy = Object.assign({}, obj);

    const propNames = Object.getOwnPropertyNames(copy);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (copy[propName] === null || copy[propName] === undefined) {
        delete copy[propName];
      }
    }

    return copy;
  }
}
