import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'; // Added
import { FormsModule } from '@angular/forms'; // Added

import { MenuManageComponent } from './components/menu-manage/menu-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   HttpClientModule, // Added
    FormsModule // Added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
