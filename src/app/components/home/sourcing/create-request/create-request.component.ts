import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request/request.service';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { RequestDTO } from '../../../../models/request';
import { ReqTechnical } from '../../../../models/reqTechnical';
import { forEach } from '@angular/router/src/utils/collection';

import { SessionUtils } from '../../../../utils/session-utils/session-utils';
import { UserAccountDTO } from '../../../../models/userAccountDTO';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  request: RequestDTO;
  user: UserAccountDTO;
  startDate: Date;
  estimatedDay: Date;
  today: Date;
  passwordAux: string;
  insertRequest: boolean;
  usernameExists: boolean;
  nResources: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  nResource: string;
  developEnv: string[] = ['Entorno desarrollo 1', 'Entorno desarrollo 2', 'Entorno desarrollo 3', 'Entorno desarrollo 4'];
  programLang: string[] = ['Lenguaje programacion 1', 'Lenguaje programacion 2', 'Lenguaje programacion 3'];
  infraBd: string[] = ['Infraestructura 1', 'Infraestructura 2', 'Infraestructura 3'];
  reqdes: string[] = ['Requerido', 'Deseable'];
  expyears: string[] = ['', '', '', ''];
  widget: number;

  reqTechnicals: Array<ReqTechnical> = new Array<ReqTechnical>();
  isValid: boolean;

  constructor(private requestService: RequestService, private datePipe: DatePipe) {

  }

  ngOnInit() {

    this.widget = 1;
    this.startDate = new Date();
    this.today = new Date();
    this.user = SessionUtils.getCurrentLoggedInUser();

    this.reqTechnicals = [{ techId: null, techscope: '', exp: '', reqdes: '', requestId: null },
     { techId: null, techscope: '', exp: '', reqdes: '', requestId: null },
     { techId: null, techscope: '', exp: '', reqdes: '' , requestId: null}];

    this.request = new RequestDTO(null, this.user.id, '', '', this.startDate , '', this.reqTechnicals, []);
  }

  next(): void {
    this.widget = this.widget + 1;
  }


  previous(): void {
    this.widget = this.widget - 1;
  }


  createRequest(form: NgForm): void {

    this.requestService.createRequest(this.request).subscribe(
      (response: boolean) => {
        this.insertRequest = response;
        if (this.insertRequest) {
          swal({
            type: 'success',
            title: 'Request has been created successfully',
            showConfirmButton: false,
            timer: 1500
          });
        }
         this.widget = 1;

         this.reqTechnicals = [{ techId: null, techscope: '', exp: '', reqdes: '', requestId: null },
         { techId: null, techscope: '', exp: '', reqdes: '', requestId: null },
         { techId: null, techscope: '', exp: '', reqdes: '' , requestId: null}];
        this.request = new RequestDTO(null, this.user.id, '', '', this.startDate , '', this.reqTechnicals, []);
      }
    );
  }

  assignStartDate(event): void {
    this.request.startDate = event;
  }

  sumarDias(fecha, dias): Date {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

}
