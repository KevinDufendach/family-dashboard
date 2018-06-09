import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { ChildCardComponent } from './child-card/child-card.component';
import { AppMaterialModule } from './shared/app-material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SettingsModule} from './settings/settings.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    AppMaterialModule,
    SettingsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    MainDashboardComponent,
    ChildCardComponent,
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
