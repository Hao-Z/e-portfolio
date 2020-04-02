import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CVsComponent } from './MyComponents/cvs/cvs.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {RouterModule,Routes} from "@angular/router";
import {MyAccountComponent} from "./MyComponents/my-account/my-account.component";
import {SettingsComponent} from "./MyComponents/settings/settings.component";
import {NzAffixComponent} from "ng-zorro-antd";
import {NzAffixModule} from "ng-zorro-antd";

registerLocaleData(zh);

const appRoutingModule:Routes = [
  {path:'cvs', component:CVsComponent},
  {path:'my-account', component: MyAccountComponent},
  {path:'settings', component: SettingsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CVsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutingModule)
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
