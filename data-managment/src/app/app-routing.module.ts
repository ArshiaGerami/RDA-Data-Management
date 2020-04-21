import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './common/sign-up/sign-up.component';
import { LogInComponent } from './common/log-in/log-in.component';

const routes: Routes = [
  {
    path: 'en/sign-up',
    component: SignUpComponent,
  },
  {
    path: 'en/login',
    component: LogInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
