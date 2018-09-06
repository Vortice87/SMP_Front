import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Candidate } from '../../models/candidate';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class CandidateService {

  private urlRequest = 'http://localhost:8060/requests';

  constructor(private http: HttpClient) { }

  addCandidate(candidate: Candidate): Observable<boolean> {
    const body: any = JSON.stringify(candidate);

    return this.http.post<boolean>(this.urlRequest + '/addCandidate', JSON.parse(body), options).catch(this.handError);
  }

  downloadCandidate(candidateId: number) {
    return this.http.get(this.urlRequest + '/findCandidateById/' + candidateId).catch(this.handError);
  }

  handError(error: any) {
    console.log('Error: ' + error);
    return Observable.throw(error);
  }

}
