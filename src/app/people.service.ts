import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {MediaChild} from './shared/models';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  peopleRef: AngularFireList<MediaChild>;
  people: Observable<MediaChild[]>;

  constructor(private db: AngularFireDatabase) {
    console.log('people service starting');

    this.peopleRef = db.list('people');

    this.people = this.peopleRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  createPerson(): Observable<MediaChild> {
    const mc = new MediaChild();
    mc.id = Math.round(Math.random() * 1000000 + 1).toString();

    // this.peopleRef.push(mc);
    return of(mc);
  }

  getPersonDetails(id: string): Observable<MediaChild> {
    return new Observable<MediaChild>(subject => {
      this.people.forEach(mc => {

        console.log(mc);

        subject.next(new MediaChild());

        // if (mc. === id) {
        //   resolve(mc);
        // }
      });
    });
  }

  // createPerson(): MediaChild {
  //   const mc = new MediaChild();
  //   mc.id = (Math.random() * 1000000000 + 1).toString();
  //   return mc;
  // }
}
