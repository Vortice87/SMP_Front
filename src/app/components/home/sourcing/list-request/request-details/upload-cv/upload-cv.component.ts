import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Cv } from '../../../../../../models/cv';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {

  private cv: Cv;
  public requestId: number;
  public miarchivo: File;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.cv = new Cv(null, this.requestId, '', new Date(), null, '', '' );
  }

  uploadFile(): void {
    console.log(this.miarchivo.size);
  }

}
