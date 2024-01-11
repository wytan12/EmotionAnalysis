import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import {StaticsComponent} from "./statics/statics.component";
import { SurveyComponent } from './survey/survey.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'emotion-detail', component: EmotionDetailComponent },
  // { path: 'emotion/:id', component: EmotionDetailComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'reflect-form', component: ReflectFormComponent},
  { path: 'reflect-history', component: ReflectHistoryComponent},
  { path: 'scrollspy', component: ScrollspyComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
