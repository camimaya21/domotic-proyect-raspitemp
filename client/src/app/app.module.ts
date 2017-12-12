import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { IsLoggedInService } from '../services/isLoggedIn.canactivate.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TestledComponent } from './testled/testled.component';
import { ProyectorComponent } from './proyector/proyector.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RealtimeComponent } from './realtime/realtime.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginformComponent,
    SignupformComponent,
    HomeComponent,
    UserprofileComponent,
    TestledComponent,
    ProyectorComponent,
    NavbarComponent,
    RealtimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, IsLoggedInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
