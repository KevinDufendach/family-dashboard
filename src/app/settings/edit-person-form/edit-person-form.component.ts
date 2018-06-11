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

  startDate = new Date(2010, 0, 1);

  first: string;
  last:  string;
  display: string;
  birthdate: Date;
  mediaMinutes: number;

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {

    if (!this.subject) {
      this.subject = {};
    }

    this.first = this.subject.nameGiven;
    this.last = this.subject.nameFamily;
    this.display = this.subject.displayName;
    this.birthdate = this.subject.birthdate;
    this.mediaMinutes = this.subject.mediaMinutes;
  }

  save(): void {
    this.subject.nameGiven = this.first;
    this.subject.nameFamily = this.last;
    this.subject.displayName = this.display;
    this.subject.birthdate = this.birthdate;
    this.subject.mediaMinutes = this.mediaMinutes;
  }

  onSubmit(): void {
    this.save();

    if (this.hasSubjectKey()) {
      console.log('attempting to update person:');
      console.log(this.subject);

      this.peopleService.updatePerson(this.id, this.subject);
    } else {

      this.peopleService.addPerson(this.subject);

    }
  }

  hasSubjectKey(): boolean {
    return (this.id !== undefined);
  }

}
