import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// import the services
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserAccountDTOService } from './services/user-accounts/user-accounts.service';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AdministrationComponent } from './components/home/administration/administration.component';
import { HomeComponent } from './components/home/home.component';
import { NewAccountComponent } from './components/home/administration/new-account/new-account.component';
import { AdminGuard } from './guards/admin.guard';
import { CreateRequestComponent } from './components/home/sourcing/create-request/create-request.component';

// import external modules
import { NgxSelectModule } from 'ngx-select-ex';
import { RequestService } from './services/request/request.service';
import { ListRequestComponent } from './components/home/sourcing/list-request/list-request.component';

import { InputFileModule } from 'ngx-input-file';
import { RequestComponent } from './components/home/sourcing/list-request/request/request.component';
import { ConfigurationService } from './services/configuration/configuration.service';
import { ComunicationService } from './services/shared/comunication.service';
import { RequestDetailsComponent } from './components/home/sourcing/list-request/request-details/request-details/request-details.component';


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
    ListRequestComponent,
    RequestComponent,
    RequestDetailsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSelectModule,
    InputFileModule
  ],
  providers: [
    HttpClient,
    AuthenticationService,
    AuthGuard,
    AdminGuard,
    UserAccountDTOService,
    RequestService,
    DatePipe,
    ConfigurationService,
    ComunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
