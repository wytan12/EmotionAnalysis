import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaticsComponent} from "./statics/statics.component";
import { SurveyComponent } from './survey/survey.component';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
import { TryingnoteComponent } from './tryingnote/tryingnote.component';
import { RedirectComponent } from './redirect/redirect.component';


const routes: Routes = [
  // Accept redirect pattern with token in query param
  { path: 'community-data/community-id/:communityId', component: RedirectComponent },
  
  // Redirect route from backend
  { path: 'redirect/:communityId', component: RedirectComponent },
  
  // Main dynamic redirect from base URL or from view/:id
  { path: '', component: RedirectComponent },
  { path: 'view/:communityId', component: RedirectComponent },

  // Dashboard route
  { path: 'tryingnote/:communityId', component: TryingnoteComponent },

  // Other pages
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'reflect-form', component: ReflectFormComponent },
  { path: 'reflect-history', component: ReflectHistoryComponent },

  // Fallback to base (which leads to redirect)
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
