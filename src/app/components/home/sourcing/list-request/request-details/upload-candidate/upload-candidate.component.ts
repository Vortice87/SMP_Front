import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Candidate } from '../../../../../../models/Candidate';
import { FormControl } from '@angular/forms';
import { DateUtils } from '../../../../../../utils/date-utils';
import { CandidateService } from '../../../../../../services/candidate/candidate.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-upload-candidate',
  templateUrl: './upload-candidate.component.html',
  styleUrls: ['./upload-candidate.component.css']
})
export class UploadCandidateComponent implements OnInit {

  @Output() public refreshRequest: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('file')
  private myInput: FormControl;
  private candidate: Candidate;
  private requestId: number;
  private fileData: string;
  private msgErrSupport: boolean;
  public filename: string;

  ngOnInit() {
    this.candidate = new Candidate(null, this.requestId, '', new Date(), null, [], 'Nuevo', '', '', '');
    this.msgErrSupport = false;
    this.filename = 'Ningun fichero seleccionado';
  }

  constructor(
    private bsModalRef: BsModalRef,
    private candidateService: CandidateService
  ) { }

  private onFileChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (event.target.files && event.target.files.length > 0 &&
      (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        || file.type === 'application/msword')) {
      this.msgErrSupport = false;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.candidate.fileData = reader.result.split(',')[1];
        this.candidate.fileName = file.name;
        this.filename = file.name;
        this.candidate.fileType = file.type;
      };
    } else {
      this.msgErrSupport = true;
      this.filename = 'Ningun fichero seleccionado';
      this.myInput.reset();
    }
  }

  private addCv() {
    console.log(this.candidate);
    this.bsModalRef.hide();
    this.candidateService.addCandidate(this.candidate).subscribe((res: boolean) => {
      if (res) {
        swal({
          type: 'success',
          title: 'Candidato añadido correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          type: 'error',
          title: 'Se produjo un error al añadir el candidato. El candidato ya existe.',
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.refreshRequest.emit(true);

    });
  }

}
