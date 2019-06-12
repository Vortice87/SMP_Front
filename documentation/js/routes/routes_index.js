var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"login","component":"LoginComponent"},{"path":"home","component":"HomeComponent","canActivate":["AuthGuard"],"children":[{"path":"accounts","component":"AdministrationComponent","canActivate":["AdminGuard"]},{"path":"newaccount","component":"NewAccountComponent","canActivate":["AdminGuard"]},{"path":"areas","component":"AreasComponent","canActivate":["AdminGuard"]},{"path":"newarea","component":"NewAreaComponent","canActivate":["AdminGuard"]},{"path":"newarea/:id","component":"NewAreaComponent","canActivate":["AdminGuard"]},{"path":"details/:id","component":"DetailsComponent","canActivate":["AdminGuard"]},{"path":"newdetail","component":"NewdetailComponent","canActivate":["AdminGuard"]},{"path":"newdetail/:id","component":"NewdetailComponent","canActivate":["AdminGuard"]},{"path":"configuration","component":"ConfigurationComponent","canActivate":["AdminGuard"]},{"path":"newrequest","component":"CreateRequestComponent"},{"path":"requests","component":"ListRequestComponent"},{"path":"request-details/:id","component":"RequestDetailsComponent"}]},{"path":"","redirectTo":"/home","pathMatch":"full"},{"path":"**","redirectTo":"/login"}],"kind":"module"}]}
