import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditPersonComponent} from './edit-person/edit-person.component';
import {SettingsComponent} from './settings.component';
import {PersonListComponent} from './person-list/person-list.component';
import {SettingsHomeComponent} from './settings-home/settings-home.component';
import {PersonDetailResolver} from './person-detail/person-detail-resolver.service';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: PersonListComponent,
        children: [
          {
            path: ':key',
            component: EditPersonComponent,
            resolve: {
              subject: PersonDetailResolver
            }
          },
          {
            path: '',
            component: SettingsHomeComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PersonDetailResolver
  ]
})
export class SettingsRoutingModule { }
