import {Component, Input, OnInit} from '@angular/core';
import {RewardService} from '../reward.service';
import {Person} from '../shared/person';
import {MediaEvent} from '../shared/media-event';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent implements OnInit {
  @Input() child: Person;
  @Input() id: string;

  events$: Observable<MediaEvent[]>;
  idFilter$: BehaviorSubject<string | null>;

  constructor(private rewardService: RewardService, private readonly afs: AngularFirestore) {
    this.idFilter$ = new BehaviorSubject(null);

    this.rewardService.getUserId().subscribe(
      _ => {
        // console.log('retrieved user, continue...');
        // console.log(this.rewardService.queryPath);

        this.events$ = this.rewardService.generateEventObservable(this.idFilter$);

        this.events$.subscribe(data => {
          console.log('data retrieved');
          console.log(data);
        });

        this.getEvents();
      }
    );


  }

  ngOnInit() {
  }

  getMinutes(child_id: string): number {
    return 0;
  }

  getEventList(): MediaEvent[] {
    return this.rewardService.eventList;
  }

  addEvent(event: MediaEvent) {
    const eventCopy: MediaEvent = Object.assign({}, event);
    eventCopy.subjectId = this.id;
    eventCopy.date = new Date();

    this.rewardService.addEvent(eventCopy);
  }

  getEvents() {
    this.idFilter$.next(this.id);
  }
}
