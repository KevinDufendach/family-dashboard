import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {MediaEvent} from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  eventsRef: AngularFireList<MediaEvent>;
  events: Observable<any[]>;
  dateString = '20150525';

  children: string[] = [];
  minutes_count: number[] = [];

  title = 'Dufendach Family Page';

  constructor(private afStorage: AngularFireStorage, public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.eventsRef = db.list('days/' + this.dateString + '/events');
    this.events = this.eventsRef.valueChanges();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  getMinutes(child_id: string): number {
    return (this.setMinutes(child_id, 0));
  }

  setMinutes(child_id: string, change_value: number) {
    const child_index = this.children.indexOf(child_id);
    if (change_value && change_value !== 0) {
      this.minutes_count[child_index] += change_value;
    }

    return (this.minutes_count[child_index]);
  }

  addEvent(): void {
    const newEvent = new MediaEvent('johnny', 'helpful', 4);

    this.eventsRef.push(newEvent);
  }

  ngOnInit(): void {
    this.events.subscribe((events) => {
      for (const event of events) {
        console.log(event);

        if (!this.children.includes(event.child_id)) {
          console.log('adding child ' + event.child_id);
          this.children.push(event.child_id);

          const child_index = this.children.indexOf(event.child_id);
          this.minutes_count[child_index] = 0;
        }

        if (event.value_change) {
          this.setMinutes(event.child_id, event.value_change);
        }
      }

      console.log(this.minutes_count);
    });
  }
}
