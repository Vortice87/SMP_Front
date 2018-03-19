import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Request } from '../../models/request';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class RequestService {

  private urlRequest = "http://localhost:8060/requests";

  constructor(private http: HttpClient) { }

  createRequest(request: Request): Observable<boolean> {

    let body: any = JSON.stringify(request);

    return this.http.post<boolean>(this.urlRequest + "/create", JSON.parse(body), options).catch(this.handError);

  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}

