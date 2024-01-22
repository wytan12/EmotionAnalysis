import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule } from 'ng-devui';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import { StaticsComponent} from "./statics/statics.component";
import { HeaderComponent } from './header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { SurveyComponent } from './survey/survey.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PopupComponent} from "./popup/popup.component";
import { PopupWindowComponent} from "./popup-window/popup-window.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectButtonComponent } from './reflect-button/reflect-button.component';
import { NegativeBarchartComponent } from './negative-barchart/negative-barchart.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';

import { EmotionButtonComponent } from './emotion-button/emotion-button.component';
import { SelectTimeDropdownComponent } from './select-time-dropdown/select-time-dropdown.component';
import { EmotionRatingComponent } from './emotion-rating/emotion-rating.component';
import { SurveyReasonComponent } from './survey-reason/survey-reason.component';

// import {MatInputModule} from "@angular/material/input";
// import {MatDatepickerModule} from "@angular/material/datepicker";
// import { MatNativeDateModule } from '@angular/material/core';
// import { SelectTimeRangeComponent } from './messages/select-time-range.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

/** 导入需要使用的 Angular 语言包 **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** 配置 ng-zorro-antd 国际化 **/
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    DevUIModule,
    MdbScrollspyModule,
    NzButtonModule,
    ReactiveFormsModule,
    // MatNativeDateModule
    // MatInputModule,
    // MatDatepickerModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EmotionDetailComponent,
    StaticsComponent,
    HeaderComponent,
    RadarChartComponent,
    BarChartComponent,
    SurveyComponent,
    CarouselComponent,
    ReflectFormComponent,
    ReflectButtonComponent,
    ReflectHistoryComponent,
    PopupComponent,
    PopupWindowComponent,
    NegativeBarchartComponent,
    EmotionButtonComponent,
    SelectTimeDropdownComponent,
    ScrollspyComponent,
    EmotionRatingComponent,
    SurveyReasonComponent,
    // SelectTimeRangeComponent

  ],
  bootstrap: [ AppComponent ],
  providers: [
    provideNzI18n(en_US)
  ]
})
export class AppModule { }

