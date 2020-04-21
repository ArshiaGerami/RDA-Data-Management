import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './common/sign-up/sign-up.component';
import { LogInComponent } from './common/log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'en/sign-up',
    component: SignUpComponent,
  },
  {
    path: 'en/login',
    component: LogInComponent,
  },
  {
    path: 'en/dashboard',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
