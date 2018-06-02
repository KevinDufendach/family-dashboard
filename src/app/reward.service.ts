import { Injectable } from '@angular/core';
import {MediaEvent} from './shared/models';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ThenableReference} from 'angularfire2/database-deprecated/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  eventsRef: AngularFireList<MediaEvent>;
  events: Observable<any[]>;
  dateString = '20150525';

  children: string[] = [];
  minutes_count: number[] = [];

  constructor(private db: AngularFireDatabase) {
    console.log('reward service starting');

    this.eventsRef = db.list('days/' + this.dateString + '/events');

    // Use snapshotChanges().map() to store the key
    this.events = this.eventsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    // this.events = this.eventsRef.valueChanges();

    // this.events.subscribe((events) => {
    //   for (const event of events) {
    //     console.log(event);
    //
    //     if (!this.children.includes(event.child_id)) {
    //       console.log('adding child ' + event.child_id);
    //       this.children.push(event.child_id);
    //
    //       const child_index = this.children.indexOf(event.child_id);
    //       this.minutes_count[child_index] = 0;
    //     }
    //
    //     if (event.value_change) {
    //       this.setMinutes(event.child_id, event.value_change);
    //     }
    //   }
    //
    //   console.log(this.minutes_count);
    // });
  }

  getChildren(): string[] {
    return this.children;
  }

  getMinutes(child_id: string): number {
    return (this.setMinutes(child_id, 0));
  }

  setMinutes(child_id: string, change_value: number) {
    const child_index = this.children.indexOf(child_id);
    if (change_value && change_value !== 0) {
      this.minutes_count[child_index] += change_value;
    }

    return (this.minutes_count[child_index]);
  }

  addEvent(): ThenableReference {
    const newEvent = new MediaEvent('johnny', 'helpful', 4);

    return this.eventsRef.push(newEvent);
  }

  getEvents(): Observable<any[]> {
    return this.events;
  }
}
