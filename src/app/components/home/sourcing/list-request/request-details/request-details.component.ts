import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../../services/request/request.service';
import { RequestDTO } from '../../../../../models/request';
import { Cv } from '../../../../../models/cv';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import { CvService } from '../../../../../services/cv/cv.service';
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
  public user: UserAccountDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private modalService: BsModalService,
    private cvService: CvService,
    private comunicationService: ComunicationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== null) {
          this.requestId = +params['id'];
          this.loadRequestDetails(this.requestId);
      }
   });
   this.comunicationService.getUser().subscribe(res => {
    this.user = res;
  });
  }

  private uploadCv(): void {
    const initialState = {
      requestId: this.requestId
    };
    this.bsModalRef = this.modalService.show(UploadCvComponent, { class: 'modal-md', initialState });
    this.bsModalRef.content.refreshRequest.subscribe((value) => {
    if (value) {
      this.loadRequestDetails(this.requestId);
    }
  });
  }

  private seeCandidate(currentCv: Cv): void {
    const initialState = {
      cv: currentCv
    };
    this.bsModalRef = this.modalService.show(CandidateDetailsComponent, { class: 'modal-lg', initialState });
    this.bsModalRef.content.refreshRequest.subscribe((value) => {
      if (value) {
        this.loadRequestDetails(this.requestId);
      }
    });

  }

  private loadRequestDetails(id: number) {
     this.requestService.getRequestById(id).subscribe(res => {
       this.request = res;
     });
  }

  private downloadCv(cv: Cv) {
    window.open('http://localhost:8060/requests/findCvById/' + cv.cvId, '_blank');
  }

}
