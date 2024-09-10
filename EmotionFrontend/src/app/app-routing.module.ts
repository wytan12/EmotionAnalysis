import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {StaticsComponent} from "./statics/statics.component";
import { SurveyComponent } from './survey/survey.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
// import { ScrollspyComponent } from './scrollspy/scrollspy.component';
import { NegativeBarchartComponent } from './negative-barchart/negative-barchart.component';
import { TryingnoteComponent } from './tryingnote/tryingnote.component';


const routes: Routes = [
  { path: '', redirectTo: '/tryingnote', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tryingnote', component: TryingnoteComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'reflect-form', component: ReflectFormComponent},
  { path: 'reflect-history', component: ReflectHistoryComponent},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
