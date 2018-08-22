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
  private requestId: number;
  private dataFile: string;


  ngOnInit() {
    this.cv = new Cv(null, this.requestId, '', new Date(), null, '', '', '', '');
  }

  constructor(public bsModalRef: BsModalRef
  ) { }

  onFileChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.dataFile = reader.result.split(',')[1];
      console.log(file.name.split('.')[0]);
      console.log(file.type);
      console.log(this.dataFile);
    };
  }

}
