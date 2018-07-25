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
import { Area } from '../../../../models/area';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  public request: RequestDTO;
  public user: UserAccountDTO;
  public startDate: Date;
  public estimatedDay: Date;
  public today: Date;
  public passwordAux: string;
  public insertRequest: boolean;
  public usernameExists: boolean;
  public nResources: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public nResource: string;
  public developEnv: string[] = ['Entorno desarrollo 1', 'Entorno desarrollo 2', 'Entorno desarrollo 3', 'Entorno desarrollo 4'];
  public programLang: string[] = ['Lenguaje programacion 1', 'Lenguaje programacion 2', 'Lenguaje programacion 3'];
  public infraBd: string[] = ['Infraestructura 1', 'Infraestructura 2', 'Infraestructura 3'];
  public reqdes: string[] = ['Requerido', 'Deseable'];
  public expyears: string[] = ['', '', '', ''];
  public widget: number;
  public areas: Array<Area> = [];

  reqTechnicals: Array<ReqTechnical> = new Array<ReqTechnical>();
  isValid: boolean;

  constructor(
    private requestService: RequestService,
    private datePipe: DatePipe,
    private configurationService: ConfigurationService
    ) {

  }

  ngOnInit() {

    this.widget = 1;
    this.startDate = new Date();
    this.today = new Date();
    this.user = SessionUtils.getCurrentLoggedInUser();
    this.getAllAreas();
    this.request = new RequestDTO(null, this.user.id, '', '', this.startDate , '', [], []);
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

  getAllAreas(): void {
    this.configurationService.getAllAreas().subscribe((res: Array<Area>) => {
      this.areas = res;
      if (this.areas !== null) {
        console.log(this.areas);

      }
    });
  }

}
