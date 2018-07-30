import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserAccountDTO } from '../../models/userAccountDTO';

@Injectable()
export class ComunicationService {

  private loginSubject = new BehaviorSubject<UserAccountDTO>(null);

  constructor() { }

  public sendUser(user: UserAccountDTO) {
    this.loginSubject.next(user);
  }

  public clearUser() {
    this.loginSubject.next(null);
  }

  public getUser(): Observable<UserAccountDTO> {
    return this.loginSubject.asObservable();
  }
}
