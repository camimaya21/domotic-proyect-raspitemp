//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//Services
import { AuthService } from '../services/auth.service';
import { IsLoggedInService } from '../services/isLoggedIn.canactivate.service';
import { RealTimeDataService } from '../services/realtimedata.service';
import { ConfigAcService } from '../services/config-ac.service';
import { ProyectorService } from '../services/proyector.service';

//Routes
import { RouterModule } from '@angular/router';
import { routes } from './routes';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TestledComponent } from './testled/testled.component';
import { ProyectorComponent } from './proyector/proyector.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RealtimeComponent } from './realtime/realtime.component';

//Others
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ControllerComponent } from './controller/controller.component';

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
    RealtimeComponent,
    ControllerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    IsLoggedInService,
    RealTimeDataService,
    ConfigAcService,
    ProyectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
