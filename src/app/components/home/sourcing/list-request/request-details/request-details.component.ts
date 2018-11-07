import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../../services/request/request.service';
import { RequestDTO } from '../../../../../models/request';
import { Candidate } from '../../../../../models/Candidate';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UploadCandidateComponent } from './upload-candidate/upload-candidate.component';
import { CandidateService } from '../../../../../services/candidate/candidate.service';
import { ComunicationService } from '../../../../../services/shared/comunication.service';
import { UserAccountDTO } from '../../../../../models/userAccountDTO';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  public requestId: number;
  public bsModalRef: BsModalRef;
  public request: RequestDTO;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'my-modal'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private modalService: BsModalService,
    private candidateService: CandidateService,
    private comunicationService: ComunicationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== null) {
          this.requestId = +params['id'];
          this.loadRequestDetails(this.requestId);
      }
   });

  }

  private uploadCandidate(): void {
    const initialState = {
      requestId: this.requestId
    };
    this.bsModalRef = this.modalService.show(UploadCandidateComponent, { class: 'modal-md', initialState, ignoreBackdropClick: false});
    this.bsModalRef.content.refreshRequest.subscribe((value) => {
    if (value) {
      this.loadRequestDetails(this.requestId);
    }
  });
  }

  private seeCandidate(currentCandidate: Candidate): void {
    const initialState = {
      candidate: currentCandidate
    };
    this.bsModalRef = this.modalService.show(CandidateDetailsComponent, { class: 'modal-lg', initialState, ignoreBackdropClick: true });
    this.bsModalRef.content.refreshRequest.subscribe((value) => {
      if (value) {
        this.loadRequestDetails(this.requestId);
        console.log(this.requestId);
        console.log('Estoy de vuelta');
      }
    });

  }

  private loadRequestDetails(id: number) {
     this.requestService.getRequestById(id).subscribe(res => {
       this.request = res;
     });
  }

}
