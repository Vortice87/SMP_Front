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
import swal from 'sweetalert2';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  public requestId: number;
  public bsModalRef: BsModalRef;
  public request: RequestDTO;
  public coveredResources: number;

  // config = {
  //   animated: true,
  //   keyboard: true,
  //   backdrop: true,
  //   ignoreBackdropClick: true,
  //   class: 'my-modal'
  // };

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
    this.bsModalRef = this.modalService.show(UploadCandidateComponent, { class: 'modal-md', initialState, ignoreBackdropClick: false });
    this.bsModalRef.content.refreshRequest.subscribe((value) => {
      if (value) {
        this.loadRequestDetails(this.requestId);
      }
    });
  }

  private seeCandidate(currentCandidate: Candidate): void {
    const initialState = {
      candidateId: currentCandidate.candidateId
    };
    this.bsModalRef = this.modalService.show(CandidateDetailsComponent, { class: 'modal-lg', initialState, ignoreBackdropClick: true });
    this.bsModalRef.content.refreshRequest.subscribe((value) => {
      if (value) {
        this.loadRequestDetails(this.requestId);
      }
    });

  }

  private loadRequestDetails(id: number) {
    this.coveredResources = 0;
    this.requestService.getRequestById(id).subscribe(res => {
      this.request = res;
      if (this.request.candidates !== null) {
        this.request.candidates.forEach(candidate => {
          if (candidate.status === 'Apto') {
            this.coveredResources++;
          }
        });
        if (this.coveredResources === Number.parseInt(this.request.resources)) {
          if (this.request.status === 'En proceso') {
            this.closeRequest(this.request.id);
          }
        }
      }
    });
  }

  public closeRequest(requestId: number): void {
    if (this.coveredResources !== Number.parseInt(this.request.resources)) {

      swal({
        title: 'No se han cubierto el total de recursos,¿Esta seguro de cerrar la solicitud?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.requestService.closeRequest(requestId).subscribe(res => {
            if (res) {
              console.log('Solicitud cerrada.');
              this.router.navigate(['/home/requests']);
            }
          });
        }
      });
    } else {
      this.requestService.closeRequest(requestId).subscribe(res => {
        if (res) {
          console.log('Solicitud cerrada.');
          this.router.navigate(['/home/requests']);
        }
      });
    }
  }

  public openRequest(requestId: number): void {
    this.requestService.openRequest(requestId).subscribe(res => {
      if (res) {
        console.log('Solicitud reabierta.');
        this.loadRequestDetails(this.requestId);
      }
    });
}

}
