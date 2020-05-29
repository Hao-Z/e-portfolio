import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ExploreComponent } from "./explore/explore.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import { SettingsComponent } from "./settings/settings.component";
import { LayoutComponent } from "./layout/layout.component";
import { CvComponent } from "./cv/cv.component";
import { CvShowComponent} from "./cv-show/cv-show.component"
import {ManageUsersComponent} from "./manage-users/manage-users.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'welcome', component: HomeComponent },
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent },
      { path: 'logoff', component: AuthComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  {
    path: 'explore',
    component: ExploreComponent
  },
  {
    path: 'cv-show',
    component: CvShowComponent
  },
  {
    path: 'cv-show', redirectTo:'/cv-show', pathMatch:'prefix'
  },
  {
    path: 'cv',
    component: LayoutComponent,
    children: [{ path: '', component: CvComponent }]
  },
  {
    path: 'my_account',
    component: LayoutComponent,
    children: [{ path: '', component: MyAccountComponent}]
  },
  {
    path: 'security',
    component: LayoutComponent,
    children: [{ path: '', component: SettingsComponent }]
  },
  {
    path: 'manage_users',
    component: LayoutComponent,
    children: [{ path: '', component: ManageUsersComponent }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
