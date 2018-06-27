import {Component, Input, OnInit} from '@angular/core';
import {RewardService} from '../reward.service';
import {Person} from '../shared/person';
import {MediaEvent} from '../shared/media-event';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent implements OnInit {
  @Input() child: Person;
  @Input() id: string;

  // events: MediaEvent[];
  events$: Observable<MediaEvent[]>;
  idFilter$: BehaviorSubject<string|null>;

  constructor(private rewardService: RewardService) {
  }

  ngOnInit() {
    // this.getEvents();
  }

  getMinutes(child_id: string): number {
    return 0;
  }

  getEventList(): MediaEvent[] {
    return this.rewardService.eventList;
  }

  // getEvents(): Observable<any[]> {
  //   return this.rewardService.getEvents();
  // }

  addEvent(event: MediaEvent) {
    const eventCopy: MediaEvent = Object.assign({}, event);
    eventCopy.subjectId = this.id;
    eventCopy.date = new Date();

    this.rewardService.addEvent(eventCopy);
  }

  // getEventsObservable(): Observable<MediaEvent[]> {
  //   // console.log('attempting to get events for');
  //   return this.rewardService.getEvents(this.id);
  // }

  getEvents() {
    this.idFilter$ = new BehaviorSubject<string|null>(null);
    this.events$ = this.rewardService.generateEventObservable(this.idFilter$);


    this.events$.subscribe(data => {
      console.log('data retrieved');
      console.log(data);
    });


    console.log(this.idFilter$);

    this.idFilter$.next(this.id);

    // // console.log('attempting to get events for');
    // this.rewardService.getEventsById(this.id).subscribe( data => {
    //   console.log(data);
    // });
  }
}
