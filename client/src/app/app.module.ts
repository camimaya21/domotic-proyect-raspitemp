import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { IsLoggedInService } from '../services/isLoggedIn.canactivate.service';
import { ConfigAcComponent } from './config-ac/config-ac.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfigAcComponent,
    LoginformComponent,
    SignupformComponent,
    HomeComponent,
    UserprofileComponent
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
