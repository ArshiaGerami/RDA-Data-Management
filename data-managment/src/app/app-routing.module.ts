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
import { ProfileComponent } from './common/profile/profile.component';
import { SettingComponent } from './common/setting/setting.component';
import { ErrorMessageComponent } from './common/error-message/error-message.component';
const routes: Routes = [
  {
    path: 'en/login',
    component: LogInComponent,
  },
  {
    path: 'en/:username/super-admin/dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data:{expectedRole:[Role.superAdmin]}
  },
  {
    path: 'en/admin/:username/dashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data:{expectedRole:[Role.admin]}
  },
  {
    path:'en/super-user/dashboard/:username',
    component: SuperUserDashboardComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.superUser]}
  },
  {
    path:'en/:username/user/dashboard',
    component: UserDashboardComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.user]}
  },
  {
    path:'en/switch-account',
    component: SwitchAccountComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.user, Role.admin, Role.superUser]}
  },
  {
    path:'en/profile',
    component: ProfileComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.admin, Role.superAdmin,Role.superUser, Role.user]}
  },
  {
    path:'en/setting',
    component: SettingComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.user, Role.admin, Role.superUser, Role.superAdmin]}
  },
  {
    path:'**',
    component: ErrorMessageComponent,
    canActivate:[RoleGuard],
    data:{expectedRole:[Role.admin, Role.user, Role.superUser, Role.superAdmin]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
