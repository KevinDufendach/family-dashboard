import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Person} from './shared/person';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  peopleRef: AngularFireList<Person>;
  people: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('people service starting');

    this.peopleRef = db.list('people');

    this.people = this.peopleRef.snapshotChanges().pipe(
      map( changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
