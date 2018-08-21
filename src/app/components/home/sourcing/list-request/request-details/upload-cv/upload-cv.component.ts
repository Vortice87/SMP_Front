import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Cv } from '../../../../../../models/cv';

import {ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {

  // form: FormGroup;
  // loading: boolean = false;

  // private cv: Cv;
  // public requestId: number;
  // public miarchivo: Blob;


  // ngOnInit() {
  //   this.cv = new Cv(null, this.requestId, '', new Date(), null, '', '' );
  // }

  // @ViewChild('fileInput') fileInput: ElementRef;

  // constructor(private fb: FormBuilder,
  //   public bsModalRef: BsModalRef
  // ) {
  //   this.createForm();
  // }

  // createForm() {
  //   this.form = this.fb.group({
  //     name: ['', Validators.required],
  //     avatar: null
  //   });
  // }

  // onFileChange(event) {
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.form.get('avatar').setValue({
  //         filename: file.name,
  //         filetype: file.type,
  //         value: reader.result.split(',')[1]
  //       })
  //     };
  //   }
  // }

  // onSubmit() {
  //   const formModel = this.form.value;
  //   this.loading = true;

  //   setTimeout(() => {
  //     console.log(formModel);
  //     alert('done!');
  //     this.loading = false;
  //   }, 1000);
  // }

  // clearFile() {
  //   this.form.get('avatar').setValue(null);
  //   this.fileInput.nativeElement.value = '';
  // }

  private cv: Cv;
  public requestId: number;
  public miarchivo: any;


  ngOnInit() {
    this.cv = new Cv(null, this.requestId, '', new Date(), null, '', '' );
  }

  constructor(public bsModalRef: BsModalRef
  ) { }

  onFileChange(event) {
    let reader = new FileReader();

      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
         this.miarchivo = reader.result.split(',')[1]
         console.log(this.miarchivo);
      };
  }

}
