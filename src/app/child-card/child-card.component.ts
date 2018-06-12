import {Component, Input, OnInit} from '@angular/core';
import {RewardService} from '../reward.service';
import {Observable} from 'rxjs';
import {Person} from '../shared/person';
import {MediaEvent} from '../shared/media-event';
import {Query} from 'angularfire2/firestore';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent implements OnInit {
  @Input() child: Person;
  @Input() id: string;

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
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

  getEvents(): Observable<MediaEvent[]> {
    return this.rewardService.getEvents(this.id);
  }
}
