import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupformComponent } from './signupform/signupform.component';
import { LoginformComponent } from './loginform/loginform.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { TestledComponent } from './testled/testled.component';

import { IsLoggedInService } from '../services/isLoggedIn.canactivate.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupformComponent },
  { path: 'login', component: LoginformComponent },
  { path: 'logout', redirectTo: '', canActivate: [ IsLoggedInService ]},
  { path: 'user',  component: UserprofileComponent, canActivate: [ IsLoggedInService ] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ IsLoggedInService ]},
  { path: 'test', component: TestledComponent, canActivate: [ IsLoggedInService ]},
  { path: 'realtime', component: RealtimeComponent, canActivate: [ IsLoggedInService ]},
  { path: '**', redirectTo: ''}
]
