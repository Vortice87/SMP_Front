import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { of } from 'rxjs/Observable/of';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserAccountDTO } from '../../models/userAccountDTO';
import { SessionUtils } from '../../utils/session-utils/session-utils';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ComunicationService {

  private loginSubject = new BehaviorSubject<UserAccountDTO>(null);
  private secretKey = 'df/7k3;';

  constructor() {
    const encryptedUser: any = sessionStorage.getItem('llud;');
    if (encryptedUser != null) {
      const decryptedUser = CryptoJS.AES.decrypt(encryptedUser, this.secretKey).toString(CryptoJS.enc.Utf8);
      this.sendUser(JSON.parse(decryptedUser));
    } else {
      this.sendUser(null);
    }
  }

  public sendUser(user: UserAccountDTO) {
    this.loginSubject.next(user);
    if (user != null) {
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
      sessionStorage.setItem('llud;', encryptedData);
    }
  }

  public clearUser() {
    this.loginSubject.next(null);
    sessionStorage.removeItem('llud;');
  }

  public getUser(): Observable<UserAccountDTO> {
    return this.loginSubject.asObservable();
  }

}
