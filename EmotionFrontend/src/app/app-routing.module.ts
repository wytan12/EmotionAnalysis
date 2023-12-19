import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import {StaticsComponent} from "./statics/statics.component";
import {ReflectionsComponent} from "./reflections/reflections.component";
import { SurveyComponent } from './survey/survey.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { NegativeBarchartComponent } from './negative-barchart/negative-barchart.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'emotion-detail', component: EmotionDetailComponent },
  // { path: 'emotion/:id', component: EmotionDetailComponent },
  { path: 'reflections', component: ReflectionsComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'reflect-form', component: ReflectFormComponent},
  { path: 'negative-barchart', component: NegativeBarchartComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
