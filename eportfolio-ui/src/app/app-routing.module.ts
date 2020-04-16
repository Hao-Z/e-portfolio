import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { CVsComponent } from "./explore/cvs.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { SettingsComponent } from "./settings/settings.component";
import { LayoutComponent } from "./layout/layout.component";
import { CvComponent } from "./cv/cv.component";



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'welcome', component: HomeComponent },
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  {
    path: 'cv',
    component: LayoutComponent,
    children: [{ path: '', component: CvComponent }]
  },
  {
    path: 'ma',
    component: LayoutComponent,
    children: [{ path: '', component: MyAccountComponent}]
  },
  {
    path: 'sts',
    component: LayoutComponent,
    children: [{ path: '', component: SettingsComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
