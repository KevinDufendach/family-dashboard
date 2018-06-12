import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {MediaEvent} from './shared/media-event';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

export interface MediaEventId extends MediaEvent {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  userId: string;

  dateString = '20150525';
  eventIds: Observable<MediaEventId[]>;
  events: Observable<MediaEvent[]>;
  eventList: MediaEvent[] = [
    {title: 'Hitting', reward: -3},
    {title: 'Yelling', reward: -3},
  ];

  // children: string[] = [];
  // minutes_count: number[] = [];
  private eventCollection: AngularFirestoreCollection<MediaEvent>;

  constructor(private afAuth: AngularFireAuth, private readonly afs: AngularFirestore) {
    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    this.afAuth.user.subscribe(
      user => {
        this.userId = user.uid;
        // console.log('User: ' + user.uid);
        this.eventCollection = this.afs.collection<MediaEvent>('users/' + user.uid + '/dates/' + this.dateString + '/events');

        this.events = this.eventCollection.valueChanges();

        // const newPerson: Person = {
        //   displayName: 'myNewPerson',
        //   nameGiven: 'MyFirstName',
        //   mediaMinutes: 30,
        // };
        // this.peopleCollection.add(newPerson);

        this.eventIds = this.eventCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as MediaEvent;
            const id = a.payload.doc.id;
            return {id, ...data};
          }))
        );
      }
    );
  }

  getEvents(id: string): Observable<MediaEvent[]> {
    return this.afs.collection<MediaEvent>(
      'users/' + this.userId + '/dates/' + this.dateString + '/events',
        ref => ref.where('subjectId', '==', id)).valueChanges();
  }

  addEvent(event: MediaEvent) {
    this.eventCollection.add(event);
  }
}
