import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupformComponent } from './signupform/signupform.component';
import { LoginformComponent } from './loginform/loginform.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ConfigAcComponent } from './config-ac/config-ac.component';

import { IsLoggedInService } from '../services/isLoggedIn.canactivate.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginformComponent },
  { path: 'signup', component: SignupformComponent, redirectTo: 'controller' },
  { path: 'user',  component: UserprofileComponent, canActivate: [ IsLoggedInService ] },
  { path: 'controller', component: ConfigAcComponent, canActivate: [ IsLoggedInService ]},
  { path: '**', redirectTo: ''}
]
