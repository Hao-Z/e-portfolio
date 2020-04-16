import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {NgZorroAntdModule} from "ng-zorro-antd";
import { CVsComponent } from './explore/cvs.component';
import { IconsProviderModule } from './icons-provider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {MyAccountComponent} from "./my-account/my-account.component";
import {SettingsComponent} from "./settings/settings.component";
import { CvComponent } from './cv/cv.component';
import { LayoutComponent } from './layout/layout.component';
import { CvEducationComponent } from './cv-education/cv-education.component';
import { CvIntroComponent } from './cv-intro/cv-intro.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AuthComponent,
    HomeComponent,
    CVsComponent,
    MyAccountComponent,
    SettingsComponent,
    CvComponent,
    LayoutComponent,
    CvEducationComponent,
    CvIntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
