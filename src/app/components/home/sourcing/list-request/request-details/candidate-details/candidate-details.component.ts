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

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})

export class CandidateDetailsComponent implements OnInit {

  @Output()
  public refreshRequest: EventEmitter<any> = new EventEmitter<any>();
  public candidate: Candidate;
  public currentCandidate: Candidate;
  public pdfSrc: string;
  public user: UserAccountDTO;
  public newComment: Comment;
  public comments: Array<Comment>;

  constructor(
    private bsModalRef: BsModalRef,
    private comunicationService: ComunicationService,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.currentCandidate = this.candidate;
    this.initializedComment();
    this.comments = [];
    this.getDocumentByCandidateId(this.currentCandidate.candidateId);
    this.comunicationService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  public initializedComment(): any {
    this.newComment = new Comment(null , '', new Date, this.currentCandidate.candidateId);
  }

  public getDocumentByCandidateId(candidateId: number) {
    this.candidateService.getDocumentByCandidateId(candidateId).subscribe((document: DocumentData) => {
      this.pdfSrc = IOUtils.getDocumentDownloadLink(document.documentBase64);
    });
  }

  public modifyStatus() {
    this.bsModalRef.hide();
    // this.CandidateService.addCandidate(this.Candidate).subscribe((res: boolean) => {
    //   if (res) {
    //     swal({
    //       type: 'success',
    //       title: 'Candidato añadido correctamente',
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   } else {
    //     swal({
    //       type: 'error',
    //       title: 'Se produjo un error al añadir el candidato. El candidato ya existe.',
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   }
    //   this.refreshRequest.emit(true);

    // });
  }

  public discardCandidate() {
    this.currentCandidate.status = 'Descartado';
    console.log(this.currentCandidate);
    this.candidateService.updateCandidate(this.currentCandidate).subscribe(res => {
      if (res) {
        this.refreshRequest.emit(true);
        this.bsModalRef.hide();
      }
    });
  }

  public addComment(): void {
    this.candidateService.addComment(this.newComment).subscribe(res => {
      if (res) {
        this.refreshCandidate();
        this.newComment.description = '';
      }
    });
  }

  public deleteComment(comment: Comment): void {
    this.candidateService.deleteComment(comment.commentId).subscribe(res => {
      if (res) {
        this.refreshCandidate();
      }
    });
  }

  public refreshCandidate(): any {
    this.candidateService.getCandidateById(this.currentCandidate.candidateId).subscribe(candidate => {
      this.currentCandidate = candidate;
    });
  }

  public closeModal() {
    this.refreshRequest.emit(true);
    this.bsModalRef.hide();
  }

}
