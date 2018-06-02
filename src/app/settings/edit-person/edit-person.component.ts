import { Component, OnInit } from '@angular/core';
import {MediaChild} from '../../shared/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PeopleService} from '../../people.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  startDate = new Date(2010, 0, 1);
  subject: MediaChild;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private peopleService: PeopleService,
  ) { }

  ngOnInit() {
    this.getSubject().subscribe(s => this.subject = s);
  }

  getSubject(): Observable<MediaChild> {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'new') {
      return this.peopleService.createPerson();
    } else {
      return this.peopleService.getPersonDetails(id);
    }
  }

  onSubmit(): void {
    // TODO impelment on submit
  }

}
