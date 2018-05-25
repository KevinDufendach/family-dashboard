import { Component } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {MediaDay} from './shared/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  daysRef: AngularFireList<MediaDay>;
  days: Observable<any[]>;
  bookCounter = 0;

  title = 'Dufendach Family Page';

  constructor(private afStorage: AngularFireStorage, public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.daysRef = db.list('days')
    this.days = this.daysRef.valueChanges();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.ref.getDownloadURL(); // could never get this to work correctly
  }



  public AddDay(): void {
    const newDay = new MediaDay(`My book #1`);
    this.daysRef.push(newDay);
    // this.days.
  }
}
