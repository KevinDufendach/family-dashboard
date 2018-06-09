import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsDialogComponent} from './settings-dialog.component';
import {SettingsHomeComponent} from './settings-home/settings-home.component';
import {SettingsComponent} from './settings.component';
import {PersonListComponent} from './person-list/person-list.component';
import {EditPersonComponent} from './edit-person/edit-person.component';
import {AppMaterialModule} from '../shared/app-material.module';
import {FormsModule} from '@angular/forms';
import { EditPersonFormComponent } from './edit-person-form/edit-person-form.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    AppMaterialModule,
    FormsModule,
  ],
  declarations: [
    SettingsComponent,
    SettingsDialogComponent,
    EditPersonComponent,
    PersonListComponent,
    SettingsHomeComponent,
    EditPersonFormComponent,
  ]
})
export class SettingsModule { }
