import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Observable } from "rxjs";
import { of } from "rxjs/Observable/of";
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { UserAccount } from '../../models/userAccount';


@Injectable()
export class AuthenticationService {

  private usersURL = "http://localhost:8060/users";

  userAccount: UserAccount;
  constructor(private http:HttpClient) { }

  authlogin(username : string, password:string) : Observable <UserAccount>
  {
    this.userAccount = {
      id: null,
      username: username,
      password: password,
      profile: null
  }

    return this.http.post<UserAccount>(this.usersURL + "/authentication", this.userAccount);

  }

}
