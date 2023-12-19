import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule } from 'ng-devui';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import { ReflectionsComponent} from "./reflections/reflections.component";
import { StaticsComponent} from "./statics/statics.component";
import { HeaderComponent } from './header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { SurveyComponent } from './survey/survey.component';
import { MessagesComponent} from "./messages/messages.component";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CarouselComponent } from './carousel/carousel.component';
import {PopupComponent} from "./popup/popup.component";
import {PopupWindowComponent} from "./popup-window/popup-window.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectButtonComponent } from './reflect-button/reflect-button.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    DevUIModule,
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
    MessagesComponent,
    ReflectFormComponent,
    ReflectButtonComponent,
    PopupComponent,
    PopupWindowComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
