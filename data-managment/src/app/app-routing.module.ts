import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from '../app/integration/guardsAndRoles/role';
import { RoleGuard} from '../app/integration/guardsAndRoles/role.guard';
import { LogInComponent } from './common/log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { SuperUserDashboardComponent } from './dashboard/super-user-dashboard/super-user-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component'
import { SwitchAccountComponent } from './common/switch-account/switch-account.component'
const routes: Routes = [
  {
    path: 'en/login',
    component: LogInComponent,
  },
  {
    path: 'en/super-admin/dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data:{expectedRole:[Role.superAdmin]}
  },
  {
    path: 'en/admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data:{expectedRole:[Role.admin]}
  },
  {
    path:'en/super-user/dashboard',
    component: SuperUserDashboardComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.superUser]}
  },
  {
    path:'en/user/dashboard',
    component: UserDashboardComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.user]}
  },
  {
    path:'en/switch-account',
    component: SwitchAccountComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.user, Role.admin, Role.superUser]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
