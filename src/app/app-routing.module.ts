import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import the components for the routing
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdministrationComponent } from './components/home/administration/administration.component';
import { NewAccountComponent } from './components/home/administration/new-account/new-account.component';
// import the guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CreateRequestComponent } from './components/home/sourcing/create-request/create-request.component';
import { ListRequestComponent } from './components/home/sourcing/list-request/list-request.component';
import { RequestDetailsComponent } from './components/home/sourcing/list-request/request-details/request-details.component';
import { AreasComponent } from './components/home/administration/areas/areas.component';
import { NewAreaComponent } from './components/home/administration/areas/new-area/new-area.component';
import { DetailsComponent } from './components/home/administration/areas/details/details.component';
import { NewdetailComponent } from './components/home/administration/areas/details/newdetail/newdetail.component';
import { ConfigurationComponent } from './components/home/administration/configuration/configuration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:
      [
        { path: 'accounts', component: AdministrationComponent, canActivate: [AdminGuard] },
        { path: 'newaccount', component: NewAccountComponent, canActivate: [AdminGuard] },
        { path: 'areas', component: AreasComponent, canActivate: [AdminGuard] },
        { path: 'newarea', component: NewAreaComponent, canActivate: [AdminGuard] },
        { path: 'newarea/:id', component: NewAreaComponent, canActivate: [AdminGuard] },
        { path: 'details/:id', component: DetailsComponent, canActivate: [AdminGuard] },
        { path: 'newdetail', component: NewdetailComponent, canActivate: [AdminGuard] },
        { path: 'newdetail/:id', component: NewdetailComponent, canActivate: [AdminGuard] },
        { path: 'configuration', component: ConfigurationComponent, canActivate: [AdminGuard] },
        { path: 'newrequest', component: CreateRequestComponent },
        { path: 'requests', component: ListRequestComponent },
        { path: 'request-details/:id', component: RequestDetailsComponent }
      ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
