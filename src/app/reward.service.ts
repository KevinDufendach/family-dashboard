import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/internal/operators';
import {MediaEvent} from './shared/media-event';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import * as firebase from 'firebase';

export interface MediaEventId extends MediaEvent {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  userId: string;
  idFilter$: BehaviorSubject<MediaEvent | null>;
  dateString = '20150525';
  queryPath = 'users/' + this.userId + '/dates/' + this.dateString + '/events';
  eventIds: Observable<MediaEventId[]>;
  events: Observable<MediaEvent[]>;
  eventList: MediaEvent[] = [
    {title: 'Hitting', reward: -3},
    {title: 'Yelling', reward: -3},
    {title: 'Helpful', reward: 2},
  ];

  // children: string[] = [];
  // minutes_count: number[] = [];
  private eventCollection: AngularFirestoreCollection<MediaEvent>;

  constructor(private afAuth: AngularFireAuth, private readonly afs: AngularFirestore) {
    // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
    this.afAuth.user.subscribe(
      user => {
        this.userId = user.uid;

        // this.idFilter$ = new BehaviorSubject(null);

        this.eventCollection = this.afs.collection<MediaEvent>(this.queryPath);

        this.events = this.eventCollection.valueChanges();

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

  getEventsById(id: string): Observable<MediaEvent[]> {
    console.log('getting events where subject ID = ', id);

    const idFilter$: BehaviorSubject<string | null> = new BehaviorSubject(null);

    const events = combineLatest(
      idFilter$
    ).pipe(
      switchMap((subjectId) =>
        this.afs.collection<MediaEvent>(this.queryPath, ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

          console.log('query initiated');
          if (subjectId) {
            query = query.where('subjectId', '==', subjectId);
          }

          // query = query.where('subjectId', '==', subjectId);

          return query;
        }).valueChanges()
      )
    );

    idFilter$.next(id);

    return events;
  }

  generateEventObservable(idFilter: BehaviorSubject<string | null>): Observable<MediaEvent[]> {
    return combineLatest(
      idFilter
    ).pipe(
      switchMap((subjectId) =>
        this.afs.collection<MediaEvent>(this.queryPath, ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

          if (subjectId) {
            query = query.where('subjectId', '==', subjectId);
          }
          return query;
        }).valueChanges()
      )
    );


  }

  getEvents(id: string): Observable<MediaEvent[]> {
    return new Observable<MediaEvent[]>(subscriber => {
      const queryPath = 'users/' + this.userId + '/dates/' + this.dateString + '/events';

      const subjectId$ = new Subject<string>();
      const queryObservable = subjectId$.pipe(
        switchMap(subjectId =>
          this.afs.collection<MediaEvent>(queryPath, ref => ref.where('subjectId', '==', subjectId)).valueChanges()
        )
      );

      // subscribe to changes
      queryObservable.subscribe(queriedItems => {
        console.log(queriedItems);
        subscriber.next(queriedItems);
      });

      console.log('Getting events with subjectId ==', id);
      subjectId$.next(id);
    });
    //
    //
    // // const uid = this.afAuth.user;
    //
    //
    // console.log('Getting query path: ', queryPath);
    //
    // return this.afs.collection<MediaEvent>(queryPath,
    //   ref => ref.where('subjectId', '==', id)).snapshotChanges();
    //
    // // return this.afs.collection<MediaEvent>(
    // //   'users/' + this.userId + '/dates/' + this.dateString + '/events',
    // //   ref => ref.where('subjectId', '==', id)).valueChanges();
    //
    // // return new Observable<MediaEvent[]>( subscriber => {
    // //   this.afAuth.user.subscribe( user => {
    // //     const uid = user.uid;
    // //
    // //
    // //     const events = this.afs.collection<MediaEvent>(
    // //       'users/' + this.userId + '/dates/' + this.dateString + '/events',
    // //       ref => ref.where('subjectId', '==', id)).valueChanges();
    // //
    // //     subscriber.next(events);
    // //     subscriber.complete();
    // //   });
    // // });
    //

  }

  addEvent(event: MediaEvent) {
    this.eventCollection.add(event);
  }
}
