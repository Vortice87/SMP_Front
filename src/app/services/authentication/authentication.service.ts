import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs/Observable/of";
import { RequestOptions } from '@angular/http';
import { UserAccount } from '../../models/userAccount';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

const options = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) };

@Injectable()
export class AuthenticationService {

  private usersURL = "http://localhost:8060/users";

  constructor(private http: HttpClient) { }

  authlogin(username: string, password: string): Observable<UserAccount> {

    let userAccount: UserAccount = {
      id: null,
      username: username,
      password: password,
      profile: null
    }

    let body: any = JSON.stringify(userAccount);

    return this.http.post<UserAccount>(this.usersURL + "/authentication", JSON.parse(body), options).catch(this.handError);

  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}
