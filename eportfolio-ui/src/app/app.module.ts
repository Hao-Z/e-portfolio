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
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ExploreComponent } from './explore/explore.component';
import { IconsProviderModule } from './icons-provider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MyAccountComponent } from "./my-account/my-account.component";
import { SettingsComponent } from "./settings/settings.component";
import { CvComponent } from './cv/cv.component';
import { LayoutComponent } from './layout/layout.component';
import { CvEducationComponent } from './cv-education/cv-education.component';
import { CvIntroComponent } from './cv-intro/cv-intro.component';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyDatepickerFieldType } from './dynamic-form/datepicker.type';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(zh);

export function patternValidationMessage(err, field: FormlyFieldConfig) {
  if (field.key ==='phoneNumber') {
    return 'Please provide a phone number with correct format! '
  } else if (field.key ==='email') {
    return 'Please provide a email address with correct format! '
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AuthComponent,
    HomeComponent,
    ExploreComponent,
    MyAccountComponent,
    SettingsComponent,
    CvComponent,
    LayoutComponent,
    CvEducationComponent,
    CvIntroComponent,
    FormlyDatepickerFieldType
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
    BrowserAnimationsModule,
    AngularFullpageModule,
    FormlyModule.forRoot({
      types: [
        { name: 'datepicker', component: FormlyDatepickerFieldType, wrappers: ['form-field'] }
      ],
      validationMessages: [
        { name: 'required', message:'This field is required!'},
        { name: 'pattern', message: patternValidationMessage }
      ]
    }),
    FormlyBootstrapModule,
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
