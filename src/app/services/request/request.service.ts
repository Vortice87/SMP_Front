import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RequestDTO } from '../../models/request';
import { UserAccountDTO } from '../../models/userAccountDTO';
import { RequestFilter } from '../../models/request-filter';
import { ContextEmail } from '../../models/contextEmail';

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

  deleteRequest(requestId: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlRequest + '/deleteRequest/' + requestId).catch(this.handError);
  }

  closeRequest(requestId: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlRequest + '/closeRequest/' + requestId).catch(this.handError);
  }

  openRequest(requestId: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlRequest + '/openRequest/' + requestId).catch(this.handError);
  }

  getCountByRequestsFilter(requestFilter: RequestFilter): Observable<number> {
    const body: any = JSON.stringify(requestFilter);
    return this.http.post<number>(this.urlRequest + '/countByRequestsFilter', JSON.parse(body), options).catch(this.handError);
  }

  findByRequestFilter(filter: RequestFilter): Observable<RequestDTO[]> {
    const body: any = JSON.stringify(filter);
    return this.http.post<RequestDTO[]>(this.urlRequest + '/findRequests', JSON.parse(body), options).catch(this.handError);
  }

  getRequestById(requestId: number) {
    return this.http.get<RequestDTO>(this.urlRequest + '/requestById/' + requestId).catch(this.handError);
  }

  requestByIdWithOutRelationships(requestId: number) {
    return this.http.get<RequestDTO>(this.urlRequest + '/requestByIdWithOutRelationships/' + requestId).catch(this.handError);
  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

  sendEmail(context: ContextEmail): Observable<any> {
    const body: any = JSON.stringify(context);
    return this.http.post<any>(this.urlRequest + '/sendEmail', JSON.parse(body), options).catch(this.handError);
  }

}

