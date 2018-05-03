import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
// import { RequestOptions } from '@angular/http';
import { UserAccountDTO } from '../../models/userAccountDTO';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const options = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) };

@Injectable()
export class UserAccountDTOService {

  private usersURL = "http://localhost:8060/users";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserAccountDTO[]> {
    return this.http.get<UserAccountDTO[]>(this.usersURL + "/all");
  }

  userExists(username: String): Observable<boolean> {
    return this.http.get<boolean>(this.usersURL + "/exists/" + username).catch(this.handError);
  }

  createUser(user: UserAccountDTO): Observable<boolean> {

    let body: any = JSON.stringify(user);

    return this.http.post<boolean>(this.usersURL + "/create", JSON.parse(body), options).catch(this.handError);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.usersURL + "/delete/" + id).catch(this.handError);
  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}
