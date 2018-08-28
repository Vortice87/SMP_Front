import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cv } from '../../../../../../models/cv';
import { BsModalRef } from 'ngx-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  @Output()
  public refreshRequest: EventEmitter<any> = new EventEmitter<any>();
  public cv: Cv;
  public currentCv: Cv;
  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.currentCv = this.cv;
    console.log(this.currentCv);
  }

  private modifyStatus() {
    this.bsModalRef.hide();
    // this.cvService.addCandidate(this.cv).subscribe((res: boolean) => {
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

}
