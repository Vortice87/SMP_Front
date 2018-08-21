import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../../services/request/request.service';
import { RequestDTO } from '../../../../../models/request';
import { Cv } from '../../../../../models/cv';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UploadCvComponent } from './upload-cv/upload-cv.component';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  public requestId: number;
  public bsModalRef: BsModalRef;
  public request: RequestDTO;
  private cvs: Array<Cv> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== null) {
          this.requestId = +params['id'];
          this.loadRequestDetails(this.requestId);
      }
   });
  //  const cv1 = new Cv(1, 1 , 'Miguel Sabillon', new Date(), new File(null, null, null), 'comentario', 'Nuevo');
  //  this.cvs.push(cv1);
  }

  public uploadCv(): void {
    const initialState = {
      requestId: this.requestId
    };
    this.bsModalRef = this.modalService.show(UploadCvComponent, { class: 'modal-md', initialState });
    // this.bsModalRef.content
  }

  private loadRequestDetails(id: number) {
     this.requestService.getRequestById(id).subscribe(res => {
       this.request = res;
       console.log(this.request);
     });
  }

}
