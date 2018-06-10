import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../shared/person';
import {PeopleService, PersonId} from '../../people.service';

@Component({
  selector: 'app-edit-person-form',
  templateUrl: './edit-person-form.component.html',
  styleUrls: ['./edit-person-form.component.css']
})
export class EditPersonFormComponent implements OnInit {
  @Input() subject: Person;
  @Input() id?: string;

  subjectClone: Person;
  startDate = new Date(2010, 0, 1);

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    if (!this.subject) {
      this.subject = {};
    }

    this.subjectClone = Object.create(this.subject);
  }

  onSubmit(): void {
    this.subject = this.subjectClone;
    this.reset();

    if (this.hasSubjectKey()) {
      this.peopleService.updatePerson(this.id, this.subject);
    } else {
      this.peopleService.addPerson(this.subject);
    }
  }

  hasSubjectKey(): boolean {
    return (this.id !== undefined);
  }

}
