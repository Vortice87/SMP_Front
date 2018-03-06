import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from "rxjs";
import { of } from "rxjs/Observable/of";
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Credentials } from '../../models/credentials';


@Injectable()
export class AuthenticationService {

  private usersURL = "http://localhost:8060/users";

  credentials: Credentials;
  constructor(private http:HttpClient) { }

  authlogin(username : string, password:string) : Observable <Credentials>
  {
    this.credentials = {
      id: null,
      username: username,
      password: password,
      profile: null
  }

    return this.http.post<Credentials>(this.usersURL + "/authentication", this.credentials);

  }

}
