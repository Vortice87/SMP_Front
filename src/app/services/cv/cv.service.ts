import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cv } from '../../models/cv';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class CvService {

  private urlRequest = 'http://localhost:8060/requests';

  constructor(private http: HttpClient) { }

  addCandidate(cv: Cv): Observable<boolean> {
    const body: any = JSON.stringify(cv);

    return this.http.post<boolean>(this.urlRequest + '/addcv', JSON.parse(body), options).catch(this.handError);
  }

  downloadCv(cvId: number) {
    return this.http.get(this.urlRequest + '/findCvById/' + cvId).catch(this.handError);
  }

  handError(error: any) {
    console.log('Error: ' + error);
    return Observable.throw(error);
  }

}
