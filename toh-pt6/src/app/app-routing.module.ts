import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import {StaticsComponent} from "./statics/statics.component";
import {ReflectionsComponent} from "./reflections/reflections.component";
import {BarChartComponent} from "./BarChart/bar-chart.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'emotion/:id', component: EmotionDetailComponent },
  { path: 'reflections', component: ReflectionsComponent },
  { path: 'statics', component: StaticsComponent },
  { path: 'bar', component: BarChartComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
