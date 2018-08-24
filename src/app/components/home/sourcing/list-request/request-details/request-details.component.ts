import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../../services/request/request.service';
import { RequestDTO } from '../../../../../models/request';
import { Cv } from '../../../../../models/cv';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import { CvService } from '../../../../../services/cv/cv.service';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  public requestId: number;
  public bsModalRef: BsModalRef;
  public request: RequestDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private modalService: BsModalService,
    private cvService: CvService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== null) {
          this.requestId = +params['id'];
          this.loadRequestDetails(this.requestId);
      }
   });
  }

  public uploadCv(): void {
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

  private loadRequestDetails(id: number) {
     this.requestService.getRequestById(id).subscribe(res => {
       this.request = res;
       console.log(this.request);
     });
  }

  private downloadCv(cv: Cv) {
    this.cvService.downloadCv(cv.cvId).subscribe(res => {

    });
  }

}
