import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Candidate } from '../../models/candidate';
import { Comment } from '../../models/comment';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class CandidateService {

  private urlRequest = 'http://localhost:8060/candidates';

  constructor(private http: HttpClient) { }

  addCandidate(candidate: Candidate): Observable<boolean> {
    const body: any = JSON.stringify(candidate);
    return this.http.post<boolean>(this.urlRequest + '/addCandidate', JSON.parse(body), options).catch(this.handError);
  }

  updateCandidate(candidate: Candidate): Observable<boolean> {
    return this.http.post<boolean>(this.urlRequest + '/updateCandidate', candidate, options).catch(this.handError);
  }

  addComment(comment: Comment): Observable<boolean> {
    const body: any = JSON.stringify(comment);
    return this.http.post<boolean>(this.urlRequest + '/addComment', JSON.parse(body), options).catch(this.handError);
  }

  deleteComment(commentId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.urlRequest + '/deleteComment/' +  commentId).catch(this.handError);
  }

  getDocumentByCandidateId(candidateId: number) {
    return this.http.get(this.urlRequest + '/findCvById/' + candidateId).catch(this.handError);
  }

  getCandidateById(candidateId: number) {
    return this.http.get<Candidate>(this.urlRequest + '/getCandidateById/' + candidateId);
  }

  handError(error: any) {
    console.log('Error: ' + error);
    return Observable.throw(error);
  }

}
