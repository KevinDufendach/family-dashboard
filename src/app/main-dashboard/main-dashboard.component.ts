import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {PeopleService} from '../people.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  constructor (public afAuth: AngularFireAuth, public peopleService: PeopleService) {}
}
