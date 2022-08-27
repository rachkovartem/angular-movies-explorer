import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './layouts/footer/footer.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AuthPageComponentComponent } from './components/auth-page-component/auth-page-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    AuthPageComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      backgroundPadding: 0,
      radius: 30,
      space: 0,
      maxPercent: 100,
      outerStrokeGradient: true,
      outerStrokeWidth: 6,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      animateTitle: false,
      animationDuration: 1000,
      showTitle: false,
      showSubtitle: false,
      showUnits: false,
      showBackground: false,
      showInnerStroke: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
