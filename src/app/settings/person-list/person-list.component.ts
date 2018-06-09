import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../../people.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  constructor(public peopleService: PeopleService) { }

  ngOnInit() {
  }

}
