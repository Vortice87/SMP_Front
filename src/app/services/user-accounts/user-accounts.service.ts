import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { UserAccount } from '../../models/userAccount';

const options = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) };

@Injectable()
export class UserAccountService {

  private usersURL = "http://localhost:8060/users";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.usersURL + "/all");
  }

  createUser(user: UserAccount): Observable<boolean> {

    let body: any = JSON.stringify(user);

    return this.http.post<boolean>(this.usersURL + "/create", JSON.parse(body), options);
  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}
