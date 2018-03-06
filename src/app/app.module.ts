import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//import the services
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserAccountsService } from './services/user-accounts/user-accounts.service';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AdministrationComponent } from './components/home/administration/administration.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    AdministrationComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClient, AuthenticationService, AuthGuard ,UserAccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
