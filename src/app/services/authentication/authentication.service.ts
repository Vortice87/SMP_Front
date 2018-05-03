import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs/Observable/of";
import { RequestOptions } from '@angular/http';
import { UserAccountDTO } from '../../models/UserAccountDTO';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

const options = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) };

@Injectable()
export class AuthenticationService {

  private usersURL = "http://localhost:8060/users";

  constructor(private http: HttpClient) { }

  authlogin(username: string, password: string): Observable<UserAccountDTO> {

    let UserAccountDTO: UserAccountDTO = {
      id: null,
      name:"",
      lastName: "",
      username: username,
      password: password,
      profile: null,
      requests:[]
    }

    let body: any = JSON.stringify(UserAccountDTO);

    return this.http.post<UserAccountDTO>(this.usersURL + "/authentication", JSON.parse(body), options).catch(this.handError);

  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}
