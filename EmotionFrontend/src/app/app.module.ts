import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import {ReflectionsComponent} from "./reflections/reflections.component";
import {StaticsComponent} from "./statics/statics.component";
import { HeaderComponent } from './header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SurveyComponent } from './survey/survey.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EmotionDetailComponent,
    StaticsComponent,
    ReflectionsComponent,
    HeaderComponent,
    RadarChartComponent,
    BarChartComponent,
    SurveyComponent,
    CarouselComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
