import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { EmployeeDetailsComponent } from './registration/employee-details/employee-details.component';
import {ProblemStatementComponent} from './registration/problem-statement/problem-statement.component';
import {WelcomePageComponent} from './registration/welcome-page/welcome-page.component';
import {LoginComponent} from './login/login/login.component';


const routes: Routes = [{
  path: 'page1',
  component: DemoFormComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{ path: 'employeedetails', component: EmployeeDetailsComponent },
    { path: 'problemstatement', component: ProblemStatementComponent },
    { path: 'welcomepage', component: WelcomePageComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
