import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../people.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public peopleService: PeopleService) { }

  ngOnInit() {
  }
}
