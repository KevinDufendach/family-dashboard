import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {EditPersonComponent} from './settings/edit-person/edit-person.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'edit_person/:id',
    component: EditPersonComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
