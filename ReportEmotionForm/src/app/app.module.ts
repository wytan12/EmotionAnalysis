import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { EmotionSliderComponent } from './emotion-slider/emotion-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ConfigService } from './shared/config.service';
import { initializeApiEndpoints } from './shared/api-endpoints';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig().then(() => initializeApiEndpoints(configService));
}

@NgModule({
  declarations: [AppComponent, FormComponent, EmotionSliderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], // Dependency injection for ConfigService
      multi: true // Allows multiple initializers
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
