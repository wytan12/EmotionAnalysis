import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaticsComponent} from "./statics/statics.component";
import { SurveyComponent } from './survey/survey.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
// import { ScrollspyComponent } from './scrollspy/scrollspy.component';
import { NegativeBarchartComponent } from './negative-barchart/negative-barchart.component';
import { TryingnoteComponent } from './tryingnote/tryingnote.component';


const routes: Routes = [
  { path: '', redirectTo: '/tryingnote/6645ab836782b352b64ea86c', pathMatch: 'full' },
  //{ path: 'view/:communityId', redirectTo: 'tryingnote/:communityId', pathMatch: 'full' }，
  { path: 'tryingnote/:communityId', component: TryingnoteComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'reflect-form', component: ReflectFormComponent},
  { path: 'reflect-history', component: ReflectHistoryComponent},
  { path: '**', redirectTo: '/tryingnote' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
