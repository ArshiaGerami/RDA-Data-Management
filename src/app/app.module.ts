import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { LogInComponent } from './common/log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AppNavComponent } from './common/app-nav/app-nav.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { SuperUserDashboardComponent } from './dashboard/super-user-dashboard/super-user-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { SwitchAccountComponent } from './common/switch-account/switch-account.component';
import { ProfileComponent } from './common/profile/profile.component';
import { SettingComponent } from './common/setting/setting.component'
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ErrorMessageComponent } from './common/error-message/error-message.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteGroupComponent } from './dashboard/dashboard/delete-group/delete-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddGroupComponent } from './dashboard/dashboard/add-group/add-group.component';
import { AddNewUserComponent } from './dashboard/dashboard/add-new-user/add-new-user.component';
import { DisableGroupComponent } from './dashboard/dashboard/disable-group/disable-group.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LogInComponent,
    DashboardComponent,
    AppNavComponent,
    AdminDashboardComponent,
    SuperUserDashboardComponent,
    UserDashboardComponent,
    SwitchAccountComponent,
    ProfileComponent,
    SettingComponent,
    ErrorMessageComponent,
    DeleteGroupComponent,
    AddGroupComponent,
    AddNewUserComponent,
    DisableGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    HttpClientModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatInputModule,
    MatSnackBarModule,
    MatPasswordStrengthModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    DatePipe, 
    MatIconRegistry,
    AddGroupComponent,
    DisableGroupComponent
  ],
  exports:[AppRoutingModule],
  entryComponents:[
    DeleteGroupComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
