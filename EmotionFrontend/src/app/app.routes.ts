import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnalysisComponent } from './analysis/analysis.component';

export const routes: Routes = [
    {path:"home", component: HomeComponent},
    {path:"analysis", component: AnalysisComponent},
];
