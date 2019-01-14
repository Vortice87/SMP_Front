import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../../../../../../models/candidate';
import { BsModalRef } from 'ngx-bootstrap';
import swal from 'sweetalert2';
import { RequestService } from '../../../../../../services/request/request.service';
import { UserAccountDTO } from '../../../../../../models/userAccountDTO';
import { ComunicationService } from '../../../../../../services/shared/comunication.service';
import { IOUtils } from '../../../../../../utils/io-utils';
import { CandidateService } from '../../../../../../services/candidate/candidate.service';
import { DocumentData } from '../../../../../../models/document-data';
import { Comment } from '../../../../../../models/comment';
import { DateUtils } from '../../../../../../utils/date-utils';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})

export class CandidateDetailsComponent implements OnInit {

  @Output()
  public refreshRequest: EventEmitter<any> = new EventEmitter<any>();
  public candidateId: number;
  public currentCandidate: Candidate;
  public pdfSrc: string;
  public user: UserAccountDTO;
  public newComment: Comment;
  public comments: Array<Comment>;
  public emptyComment: boolean;
  public now: Date;
  public validDate: boolean;

  constructor(
    private bsModalRef: BsModalRef,
    private comunicationService: ComunicationService,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.loadCandidate(this.candidateId);
    this.initializeData();
    this.comunicationService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  public initializeData(): void {
    this.newComment = new Comment(null, '', new Date, 0);
    this.now = new Date();
    this.validDate = true;
  }

  public modifyStatus(newStatus: string) {
    this.currentCandidate.status = newStatus;

    console.log(this.currentCandidate.interviewDate);
    if (this.currentCandidate.status === 'Revisado' && this.currentCandidate.interviewDate == null) {
      this.currentCandidate.interviewDate = new Date();
    }

    if (this.currentCandidate.status === 'Descartado') {
      this.currentCandidate.interviewDate = null;
    }
    this.candidateService.updateCandidate(this.currentCandidate).subscribe(res => {
      if (res) {
        this.refreshRequest.emit(true);
        this.bsModalRef.hide();
      }
    });
  }

  public addComment(): void {
    this.newComment.candidateId = this.currentCandidate.candidateId;
    this.candidateService.addComment(this.newComment).subscribe(res => {
      if (res) {
        this.loadCandidate(this.currentCandidate.candidateId);
        this.newComment.description = '';
      }
    });
  }

  public deleteComment(comment: Comment): void {
    this.candidateService.deleteComment(comment.commentId).subscribe(res => {
      if (res) {
        this.loadCandidate(this.currentCandidate.candidateId);
      }
    });
  }

  public loadCandidate(candidateId: number): any {
    this.candidateService.getCandidateById(candidateId).subscribe(candidate => {
      this.currentCandidate = candidate;
      this.pdfSrc = IOUtils.getDocumentDownloadLink(this.currentCandidate.documentBase64);
      if (this.currentCandidate.comments.length === 0) {
        this.emptyComment = true;
      } else {
        this.emptyComment = false;
      }
    });
  }

  public closeModal() {
    this.refreshRequest.emit(true);
    this.bsModalRef.hide();
  }

  public assignInterviewDate(event): void {
    if (DateUtils.formatDate(event) < DateUtils.formatDate(new Date())) {
      this.validDate = false;
    } else if (DateUtils.formatDate(event) >= DateUtils.formatDate(new Date())) {
      this.currentCandidate.interviewDate = event;
      this.validDate = true;
    }
  }

  public goToTop() {

      $('#modal-content').scrollTop(0);
    console.log('going top');
  //window.scrollTo(0, 0);

  }

}
