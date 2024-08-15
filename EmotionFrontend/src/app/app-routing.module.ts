import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {StaticsComponent} from "./statics/statics.component";
import { SurveyComponent } from './survey/survey.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
// import { ScrollspyComponent } from './scrollspy/scrollspy.component';
import { EmotionRatingComponent } from './emotion-rating/emotion-rating.component';
import { SurveyReasonComponent } from './survey-reason/survey-reason.component';
import { NegativeBarchartComponent } from './negative-barchart/negative-barchart.component';
import { InconduciveComponent } from './inconducive/inconducive.component';
import { TryingnoteComponent } from './tryingnote/tryingnote.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tryingnote', component: TryingnoteComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'reflect-form', component: ReflectFormComponent},
  { path: 'reflect-history', component: ReflectHistoryComponent},
  { path: 'survey-reason', component: SurveyReasonComponent},
  { path: 'emotion-rating', component: EmotionRatingComponent},
  { path: 'inconducive-chart', component:InconduciveComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
