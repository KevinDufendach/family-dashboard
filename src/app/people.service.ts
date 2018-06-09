import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {Person} from './shared/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  peopleRef: AngularFireList<Person>;
  people: Observable<Person[]>;

  constructor(private db: AngularFireDatabase) {
    this.peopleRef = db.list('people');

    this.people = this.peopleRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  createPerson(): Observable<Person> {
    const newPerson = new Person();

    return of(newPerson);
  }

  getPersonDetails(key: string): Observable<Person> {
    // const myVar = this.peopleRef.valueChanges().
    console.log('getting person details')

    return new Observable<Person>(subject => {
      this.people.subscribe( data => {
        console.log(data);

        data.forEach(data2 => {
          console.log(data2);
          if (data2['key'] === key) {
            subject.next(Person.copyPerson(data2));
          }
        })
      })
    });
  }

  addPerson(person: Person): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const key = this.peopleRef.push(person).key;
      resolve(key);
    });
  }

  updatePerson(key: string, person: Person): Promise<void> {
    return this.peopleRef.update(key, person);
  }

  removePerson(key: string): Promise<void> {
    return this.peopleRef.remove(key);
  }
}
