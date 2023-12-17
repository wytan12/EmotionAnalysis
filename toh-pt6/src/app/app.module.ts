import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './MainComponent/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import {ReflectionsComponent} from "./reflections/reflections.component";
import {StaticsComponent} from "./statics/statics.component";
import { HeaderComponent } from './header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import {MessagesComponent} from "./messages/messages.component";
import {BarChartComponent} from "./BarChart/bar-chart.component";
import * as echarts from 'echarts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import 'element-angular/theme/index.css'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
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
    MessagesComponent,
    BarChartComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
