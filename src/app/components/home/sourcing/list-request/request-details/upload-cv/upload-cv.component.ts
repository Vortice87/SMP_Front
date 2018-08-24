import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Cv } from '../../../../../../models/cv';
import { FormControl } from '@angular/forms';
import { DateUtils } from '../../../../../../utils/date-utils';
import { CvService } from '../../../../../../services/cv/cv.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {

  @Output() public refreshRequest: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('file')
  private myInput: FormControl;
  private cv: Cv;
  private requestId: number;
  private fileData: string;
  private msgErrSupport: boolean;
  public filename: string;

  ngOnInit() {
    this.cv = new Cv(null, this.requestId, '', new Date(), null, '', 'Nuevo', '', '', '');
    this.msgErrSupport = false;
    this.filename = 'Ningun fichero seleccionado';
  }

  constructor(
    private bsModalRef: BsModalRef,
    private cvService: CvService
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
        this.cv.fileData = reader.result.split(',')[1];
        this.cv.fileName = file.name;
        this.filename = file.name;
        this.cv.fileType = file.type;
      };
    } else {
      this.msgErrSupport = true;
      this.filename = 'Ningun fichero seleccionado';
      this.myInput.reset();
    }
  }

  private addCv() {
    console.log(this.cv);
    this.bsModalRef.hide();
    this.cvService.addCandidate(this.cv).subscribe((res: boolean) => {
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
          title: 'Se produjo un error al añadir el candidato',
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.refreshRequest.emit(true);

    });
  }

}
