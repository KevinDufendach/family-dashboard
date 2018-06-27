import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainDashboardComponent} from './main-dashboard/main-dashboard.component';
import {QueryTrialComponent} from './query-trial/query-trial.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent
  },
  {
    path: 'query',
    component: QueryTrialComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
