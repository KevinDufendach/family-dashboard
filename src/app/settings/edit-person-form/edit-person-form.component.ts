import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../shared/person';
import {PeopleService} from '../../people.service';

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

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    console.log(this.subject);
    console.log('Subject class: ' + this.subject.constructor.name);

    if (!this.subject) {
      this.subject = {};
    }

    this.subjectClone = Object.create(this.subject);
  }

  onSubmit(): void {
    this.subject = this.subjectClone;

    if (this.hasSubjectKey()) {
      this.peopleService.updatePerson(this.id, this.subject);
    } else {
      this.peopleService.addPerson(this.subject);
    }

    this.reset();
  }

  hasSubjectKey(): boolean {
    return (this.id !== undefined);
  }

}
