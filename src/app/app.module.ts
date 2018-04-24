import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//import the services
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserAccountService } from './services/user-accounts/user-accounts.service';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AdministrationComponent } from './components/home/administration/administration.component';
import { HomeComponent } from './components/home/home.component';
import { NewAccountComponent } from './components/home/administration/new-account/new-account.component';
import { AdminGuard } from './guards/admin.guard';
import { CreateRequestComponent } from './components/home/sourcing/create-request/create-request.component';

//import external modules
import { NgxSelectModule } from 'ngx-select-ex';
import { NewRowLangComponent } from './components/home/sourcing/create-request/new-row-lang/new-row-lang.component';
import { RequestService } from './services/request/request.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    AdministrationComponent,
    HomeComponent,
    NewAccountComponent,
    CreateRequestComponent,
    NewRowLangComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSelectModule
  ],
  providers: [
    HttpClient,
    AuthenticationService,
    AuthGuard,
    AdminGuard,
    UserAccountService,
    RequestService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
