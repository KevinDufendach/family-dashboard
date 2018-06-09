import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PeopleService} from '../../people.service';
import {Observable} from 'rxjs';
import {Person} from '../../shared/person';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  startDate = new Date(2010, 0, 1);
  subject: Person;
  subjectKey: string;

  // first: string;
  // last: string;
  // display: string;
  // birthdate: Date;
  // minutes: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private peopleService: PeopleService,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { subject: Person }) => {
        console.log('received data from route:');
        console.log(data);

        this.subject = data.subject;
      });
  }

  // ngOnInit() {
  //   this.getSubject().subscribe(s => this.subject = s);
  // }

  getSubject(): Observable<Person> {
    this.subjectKey = this.route.snapshot.paramMap.get('key');
    console.log('key is ' + this.subjectKey);

    if (this.hasSubjectKey()) {
      return this.peopleService.createPerson();
    } else {
      return this.peopleService.getPersonDetails(this.subjectKey);
    }
  }

  private hasSubjectKey(): boolean {
    return (this.subjectKey !== undefined && this.subjectKey !== '' && this.subjectKey !== 'new');
  }

  onSubmit(): void {
    console.log('form submitted');
    console.log(this.subject);
    // TODO impelment on submit

    if (this.hasSubjectKey()) {
      this.peopleService.updatePerson(this.subjectKey, this.subject);
    } else {
      this.peopleService.addPerson(this.subject);
    }
  }

}
