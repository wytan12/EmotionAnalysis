import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmotionDetailComponent } from './emotion-detail/emotion-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import {ReflectionsComponent} from "./reflections/reflections.component";
import {StaticsComponent} from "./statics/statics.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    EmotionDetailComponent,
    StaticsComponent,
    MessagesComponent,
    HeroSearchComponent,
    ReflectionsComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
