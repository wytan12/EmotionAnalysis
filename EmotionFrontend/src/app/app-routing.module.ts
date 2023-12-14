import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import {StaticsComponent} from "./statics/statics.component";
import {ReflectionsComponent} from "./reflections/reflections.component";
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'emotion-detail', component: EmotionDetailComponent },
  { path: 'reflections', component: ReflectionsComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'survey', component: SurveyComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
