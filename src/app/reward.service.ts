import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import * as firebase from 'firebase';
import {MediaEvent} from './shared/media-event';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/internal/operators';
import {of} from 'rxjs';

export interface MediaEventId extends MediaEvent {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  userId: string;
  dateString = '20150525';
  queryPath: string;
  eventIds: Observable<MediaEventId[]>;
  events: Observable<MediaEvent[]>;
  eventList: MediaEvent[] = [
    {title: 'Hitting', reward: -3},
    {title: 'Yelling', reward: -3},
    {title: 'Helpful', reward: 2},
  ];

  private eventCollection: AngularFirestoreCollection<MediaEvent>;

  constructor(private afAuth: AngularFireAuth, private readonly afs: AngularFirestore) {
    this.getUserId().subscribe(_ => {
      this.queryPath = 'users/' + this.userId + '/dates/' + this.dateString + '/events';

      this.eventCollection = this.afs.collection<MediaEvent>(this.queryPath);

      this.events = this.eventCollection.valueChanges();

      this.eventIds = this.eventCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as MediaEvent;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
      );

    });
  }

  getUserId(): Observable<string> {
    if (this.userId) {
      return of(this.userId);
    }

    return new Observable<string>(subscriber => {
      this.afAuth.user.subscribe(user => {
        this.userId = user.uid;

        subscriber.next(this.userId);
        subscriber.complete();
      });
    });
  }

  generateEventObservable(idFilter$: BehaviorSubject<string | null>): Observable<MediaEvent[]> {
    return Observable.combineLatest(
      idFilter$
    ).switchMap(([subjectId]) =>
      this.afs.collection<MediaEvent>(this.queryPath, ref => {
        let query: firebase.firestore.Query = ref;

        if (subjectId) {
          query = query.where('subjectId', '==', subjectId);
        }

        return query;
      }).valueChanges()
    );
  }

  addEvent(event: MediaEvent) {
    this.eventCollection.add(event);
  }
}
