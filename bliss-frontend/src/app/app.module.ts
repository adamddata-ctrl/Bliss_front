import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Added HTTP_INTERCEPTORS here
import { FormsModule } from '@angular/forms'; 

import { MenuManageComponent } from './components/menu-manage/menu-manage.component';
import { LoginComponent } from './login/login.component';

import { AuthInterceptor } from './services/auth.interceptor'; // Added the interceptor import

@NgModule({
  declarations: [
    AppComponent,
    MenuManageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule 
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