import { NgModule } from '@angular/core';

// import { AuthService } from './auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ]
})
export class CoreModule { }
