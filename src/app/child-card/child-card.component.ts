import { Component, OnInit } from '@angular/core';
import {RewardService} from '../reward.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent implements OnInit {

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
  }

  getMinutes(child_id: string): number {
    return this.rewardService.getMinutes(child_id);
  }

  addEvent(): void {
    this.rewardService.addEvent();
  }

  getEvents(): Observable<any[]> {
    return this.rewardService.getEvents();
  }

}