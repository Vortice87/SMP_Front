import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RequestDTO } from '../../models/request';
import { UserAccountDTO } from '../../models/userAccountDTO';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class RequestService {

  private urlRequest = 'http://localhost:8060/requests';

  constructor(private http: HttpClient) { }

  createRequest(request: RequestDTO): Observable<boolean> {
    const body: any = JSON.stringify(request);
    return this.http.post<boolean>(this.urlRequest + '/create', JSON.parse(body), options).catch(this.handError);
  }

  closeRequest(requestId: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlRequest + '/closeRequest/' + requestId).catch(this.handError);
  }

  openRequest(requestId: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlRequest + '/openRequest/' + requestId).catch(this.handError);
  }

  getAllRequest(): Observable<RequestDTO[]> {
    return this.http.get<RequestDTO[]>(this.urlRequest + '/all').catch(this.handError);
  }

  getRequestById(requestId: number) {
    return this.http.get<RequestDTO>(this.urlRequest + '/requestById/' + requestId).catch(this.handError);
  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}

