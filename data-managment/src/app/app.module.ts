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
import { SwitchAccountComponent } from './common/switch-account/switch-account.component'

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
    MatIconModule,
  ],
  providers: [
    DatePipe, 
    MatIconRegistry,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
