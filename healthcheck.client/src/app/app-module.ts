import { HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { Home } from './home/home';
import { FetchData } from './fetch-data/fetch-data';
import { NavMenu } from './nav-menu/nav-menu';

@NgModule({
  declarations: [AppComponent, Home, FetchData, NavMenu],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [AppComponent],
})
export class AppModule {}
