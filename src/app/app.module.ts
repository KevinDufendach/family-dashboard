import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {CoreModule} from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { ChildCardComponent } from './child-card/child-card.component';
import {MaterialSharedModule} from './material-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    ChildCardComponent
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
    CoreModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
