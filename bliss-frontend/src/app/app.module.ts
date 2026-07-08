import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MenuManageComponent } from './components/menu-manage/menu-manage.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NgChartsModule } from 'ng2-charts'; // 1. ADDED CHARTS IMPORT

@NgModule({
  declarations: [
    AppComponent,
    MenuManageComponent,
    LoginComponent,
    AnalyticsComponent // 2. REGISTERED THE ANALYTICS COMPONENT
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule // 3. REGISTERED THE CHARTS MODULE
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }