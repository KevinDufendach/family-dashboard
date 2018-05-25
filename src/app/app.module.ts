import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA8iJM598aSOWNdFK1j-uDdhjZAohTfWt8',
      authDomain: 'dufendach-family.firebaseapp.com',
      databaseURL: 'https://dufendach-family.firebaseio.com',
      projectId: 'dufendach-family',
      storageBucket: 'dufendach-family.appspot.com',
      messagingSenderId: '5280635346'
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
