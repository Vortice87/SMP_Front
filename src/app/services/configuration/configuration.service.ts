import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Area } from '../../models/area';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class ConfigurationService {

  private urlRequest = 'http://localhost:8060/configuration';


  constructor(private http: HttpClient) { }

  getAllAreas(): Observable<Area[]> {

    return this.http.get<Area>(this.urlRequest + '/all').catch(this.handError);

  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}
