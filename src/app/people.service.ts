import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
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
  // peopleRef: AngularFireList<Person>;
  people: Observable<Person[]>;

  private peopleCollection: AngularFirestoreCollection<Person>;
  peopleIds: Observable<PersonId[]>;

  constructor(private afAuth: AngularFireAuth, private readonly afs: AngularFirestore) {
    console.log('loading people service');

    // this.peopleRef = db.list('people');
    //
    // this.people = this.peopleRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    //   )
    // );

    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    this.afAuth.user.subscribe(
      user => {
        console.log('User: ' + user.uid);
        this.peopleCollection = afs.collection<Person>('users/' + user.uid + '/people');

        console.log('type: ' + this.peopleCollection.constructor.name);

        const collection$: Observable<Person[]> = this.peopleCollection.valueChanges();
        collection$.subscribe(data => console.log(data) );

        // const newPerson: Person = {
        //   displayName: 'myNewPerson',
        //   nameGiven: 'MyFirstName',
        //   mediaMinutes: 30,
        // };
        // this.peopleCollection.add(newPerson);

        // this.people = this.peopleCollection.valueChanges();
        console.log('subscribing to peopleCollection');

        this.peopleIds = this.peopleCollection.snapshotChanges().pipe(
          map(actions => actions.map( a => {
            console.log('received snapshotchanges from peopleCollection');

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
    return this.peopleCollection.doc(id).set(person);

    // return this.peopleRef.update(id, person);
  }

  checkPeople(): void {
    this.people.subscribe(data => console.log(data));
  }

  // removePerson(key: string): Promise<void> {
  //   return this.peopleRef.remove(key);
  // }
}
