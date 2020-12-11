import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoFormComponent } from './demo-form/demo-form.component';


const routes: Routes = [{
  path: 'page1',
  component: DemoFormComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
