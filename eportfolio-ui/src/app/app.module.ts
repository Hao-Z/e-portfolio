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
import {en_US, NgZorroAntdModule, NZ_I18N} from "ng-zorro-antd";
import { ExploreComponent } from './explore/explore.component';
import { IconsProviderModule } from './icons-provider.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MyAccountComponent } from "./my-account/my-account.component";
import { SettingsComponent } from "./settings/settings.component";
import { CvComponent } from './cv/cv.component';
import { LayoutComponent } from './layout/layout.component';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyDatepickerFieldType } from './dynamic-form/datepicker.type';
import { NgbDatepickerModule, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalIntroductionComponent } from './cv-form/modal-introduction/modal-introduction.component';
import { ModalEducationComponent } from './cv-form/modal-education/modal-education.component';
import { ModalAboutComponent } from './cv-form/modal-about/modal-about.component';
import { ModalFeatureComponent } from './cv-form/modal-feature/modal-feature.component';
import { ModalWorkExperienceComponent } from './cv-form/modal-work-experience/modal-work-experience.component';
import { ModalLicenseCertificationComponent } from './cv-form/modal-license-certification/modal-license-certification.component';
import { ModalVolunteerExperienceComponent } from './cv-form/modal-volunteer-experience/modal-volunteer-experience.component';
import { ModalSkillComponent } from './cv-form/modal-skill/modal-skill.component';
import { ModalProjectComponent } from './cv-form/modal-project/modal-project.component';
import { ModalHonourAwardComponent } from './cv-form/modal-honour-award/modal-honour-award.component';
import { ModalPublicationComponent } from './cv-form/modal-publication/modal-publication.component';
import { ModalLanguageComponent } from './cv-form/modal-language/modal-language.component';
import { ModalRecommendationComponent } from './cv-form/modal-recommendation/modal-recommendation.component';
import { PropertiesPipe } from "./core/properties-pipe";
import { DataPipe } from "./core/data-pipe";
import { FooterComponent } from "./footer/footer.component";
import { CvShowComponent } from './cv-show/cv-show.component';
import { AboutComponent } from "./cv/cv-card/about.component"
import { WorkExperienceComponent } from "./cv/cv-card/work-experience.component"
import { VolunteerExperienceComponent } from "./cv/cv-card/volunteer-experience.component"
import { SkillComponent } from "./cv/cv-card/skill.component"
import { EducationComponent } from "./cv/cv-card/education.component"
import { FeatureComponent } from "./cv/cv-card/feature.component"
import { HonourAwardComponent } from "./cv/cv-card/honour-award.component"
import { LanguageComponent } from "./cv/cv-card/language.component"
import { LicenseCertificationComponent } from "./cv/cv-card/license-certification.component"
import { ProjectComponent } from "./cv/cv-card/project.component"
import { PublicationComponent } from "./cv/cv-card/publication.component"
import { RecommendationComponent } from "./cv/cv-card/recommendation.component"
import { FormlyFileFieldType } from './dynamic-form/file.type';
import { ShareLinkComponent } from './cv/share-link/share-link.component';
import { EditAvarterComponent } from './cv/edit-avarter/edit-avarter.component';
import {ManageUsersComponent} from "./manage-users/manage-users.component";



registerLocaleData(en);

export function patternValidationMessage(err, field: FormlyFieldConfig) {
  if (field.key === 'phoneNumber') {
    return 'Please provide a phone number with correct format! '
  } else if (field.key === 'email') {
    return 'Please provide a email address with correct format! '
  } else if (field.type === 'datepicker') {
    return 'Please provide a date with valid format!'
  } else if (field.key === 'grade') {
    return 'Please provide a grade with number format! '
  } else if (field.key === 'workingYear') {
    return 'Please provide a number no longer than 3 digits! '
  }
}

export function maxlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
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
    CvShowComponent,
    LayoutComponent,
    FormlyDatepickerFieldType,
    ModalIntroductionComponent,
    ModalEducationComponent,
    ModalAboutComponent,
    ModalFeatureComponent,
    ModalWorkExperienceComponent,
    ModalLicenseCertificationComponent,
    ModalVolunteerExperienceComponent,
    ModalSkillComponent,
    ModalProjectComponent,
    ModalHonourAwardComponent,
    ModalPublicationComponent,
    ModalLanguageComponent,
    ModalRecommendationComponent,
    PropertiesPipe,
    DataPipe,
    FooterComponent,
    FooterComponent,
    AboutComponent,
    WorkExperienceComponent,
    VolunteerExperienceComponent,
    SkillComponent,
    EducationComponent,
    FeatureComponent,
    HonourAwardComponent,
    LanguageComponent,
    LicenseCertificationComponent,
    ProjectComponent,
    PublicationComponent,
    RecommendationComponent,
    FormlyFileFieldType,
    ShareLinkComponent,
    EditAvarterComponent,
    ManageUsersComponent
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
        { name: 'datepicker', component: FormlyDatepickerFieldType, wrappers: ['form-field'] },
        { name: 'file', component: FormlyFileFieldType, wrappers: ['form-field'], defaultOptions: { defaultValue: "" } }
      ],
      validationMessages: [
        { name: 'required', message:'This field is required!'},
        { name: 'maxLength', message: maxlengthValidationMessage},
        { name: 'pattern', message: patternValidationMessage }
      ]
    }),
    FormlyBootstrapModule,
    NgbDatepickerModule,
    NgbModule
  ],
  providers: [
    NgbActiveModal,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalIntroductionComponent,
    ModalEducationComponent
  ]

})
export class AppModule { }
