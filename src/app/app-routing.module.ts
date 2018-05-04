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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:
      [
        { path: 'admin', component: AdministrationComponent, canActivate: [AdminGuard] },
        { path: 'newaccount', component: NewAccountComponent, canActivate: [AdminGuard] },
        { path: 'newrequest', component: CreateRequestComponent },
        { path: 'requests' ,component: ListRequestComponent }
      ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", redirectTo: "/login" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
