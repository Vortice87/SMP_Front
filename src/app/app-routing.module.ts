import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import the components for the routing
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdministrationComponent } from './components/home/administration/administration.component';

// import the guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'admin', component: AdministrationComponent },
  ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", redirectTo: "/login" }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
