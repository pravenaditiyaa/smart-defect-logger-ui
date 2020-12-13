import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login/login.component';
import { EmployeeDetailsComponent } from './registration/employee-details/employee-details.component';
import { ProblemStatementComponent } from './registration/problem-statement/problem-statement.component';
import { WelcomePageComponent } from './registration/welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoFormComponent,
    DashboardComponent,
    NavigationComponent,
    LoginComponent,
    EmployeeDetailsComponent,
    ProblemStatementComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
