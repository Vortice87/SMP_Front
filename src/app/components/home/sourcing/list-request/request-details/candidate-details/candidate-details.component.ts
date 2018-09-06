import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../../../../../../models/candidate';
import { BsModalRef } from 'ngx-bootstrap';
import swal from 'sweetalert2';
import { RequestService } from '../../../../../../services/request/request.service';
import { UserAccountDTO } from '../../../../../../models/userAccountDTO';
import { ComunicationService } from '../../../../../../services/shared/comunication.service';

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

  constructor(
    private bsModalRef: BsModalRef,
    private comunicationService: ComunicationService
  ) { }

  ngOnInit() {
    this.currentCandidate = this.candidate;
    this.pdfSrc = 'http://localhost:8060/requests/findCvById/' + this.currentCandidate.candidateId;
    this.comunicationService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  private modifyStatus() {
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

  private discardCandidate() {

  }

}
