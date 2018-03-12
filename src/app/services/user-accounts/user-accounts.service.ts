import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { UserAccount } from '../../models/userAccount';

@Injectable()
export class UserAccountsService {

  private usersURL = "http://localhost:8060/users"; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserAccount[]>
  {
    return this.http.get<any>(this.usersURL + "/all");
  }

}
