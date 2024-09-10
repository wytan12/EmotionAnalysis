import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule, UserGuideComponent } from 'ng-devui';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule

import { AppComponent } from './app.component';
import { StaticsComponent} from "./statics/statics.component";
import { HeaderComponent } from './header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { SurveyComponent } from './survey/survey.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PopupWindowComponent} from "./popup-window/popup-window.component";
import { ReflectFormComponent } from './reflect-form/reflect-form.component';
import { ReflectButtonComponent } from './reflect-button/reflect-button.component';
import { NegativeBarchartComponent } from './negative-barchart/negative-barchart.component';
import { ReflectHistoryComponent } from './reflect-history/reflect-history.component';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';

import { SelectTimeDropdownComponent } from './select-time-dropdown/select-time-dropdown.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** 配置 ng-zorro-antd 国际化 **/
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import { SelectMemberDropdownComponent } from './select-member-dropdown/select-member-dropdown.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectViewDropdownComponent } from './select-view-dropdown/select-view-dropdown.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { StarRatingComponent } from './star-rating/star-rating.component';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
// import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { UserGuideButtonComponent } from './user-guide-button/user-guide-button.component';
import { IntensityDropdownComponent } from './intensity-dropdown/intensity-dropdown.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReportEmotionButtonComponent } from './report-emotion-button/report-emotion-button.component';
import { ReportReadwriteButtonComponent } from './report-readwrite-button/report-readwrite-button.component';

import {MatTabsModule} from '@angular/material/tabs';
import { TabComponent } from './tab/tab.component';
import { ReflectHistoryButtonComponent } from './reflect-history-button/reflect-history-button.component';
import { WriteRatingComponent } from './write-rating/write-rating.component';
import { TryingnoteComponent } from './tryingnote/tryingnote.component';
import { RadarChartJerrisonapiComponent } from './radar-chart-jerrisonapi/radar-chart-jerrisonapi.component';
import { TestNoteratingComponent } from './test-noterating/test-noterating.component';

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
    ReactiveFormsModule,
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzSelectModule,
    NzRateModule,
    ScrollingModule,
    DragDropModule,
    NzDropDownModule,
    NzIconModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    StaticsComponent,
    HeaderComponent,
    RadarChartComponent,
    BarChartComponent,
    SurveyComponent,
    ReflectFormComponent,
    ReflectButtonComponent,
    ReflectHistoryComponent,
    PopupWindowComponent,
    NegativeBarchartComponent,
    SelectTimeDropdownComponent,
    ScrollspyComponent,
    SelectMemberDropdownComponent,
    SelectViewDropdownComponent,
    StarRatingComponent,
    UserGuideButtonComponent,
    IntensityDropdownComponent,
    ReportEmotionButtonComponent,
    ReportReadwriteButtonComponent,
    TabComponent,
    ReflectHistoryButtonComponent,
    WriteRatingComponent,
    TryingnoteComponent,
    RadarChartJerrisonapiComponent,
    TestNoteratingComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    provideNzI18n(en_US),
    // { provide: NZ_ICONS, useValue: icons }
  ]
})
export class AppModule { }

