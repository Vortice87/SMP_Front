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
import { Detalles } from '../../../../models/detalles';
import { ComunicationService } from '../../../../services/shared/comunication.service';
import { DateUtils } from '../../../../utils/date-utils';
import { Configuration } from '../../../../models/configuration';
import { ContextEmail } from '../../../../models/contextEmail';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  public request: RequestDTO;
  public user: UserAccountDTO;
  public creationDate: Date;
  public startDate: Date;
  public estimatedDay: Date;
  public today: Date;
  public passwordAux: string;
  public insertRequest: boolean;
  public usernameExists: boolean;
  public nResources: Array<string>;
  public nResource: string;
  public developEnv: Array<string>;
  public programLang: Array<string>;
  public infraBd: Array<string>;
  public reqdes: Array<string>;
  public expyears: Array<string>;
  public areas: Array<Area> = [];
  public selectedArea: Area;
  public defaultArea: Area;
  public detalle: string;
  public experience: string;
  public requeriment: string;
  public details: Array<Detalles>;
  public reqTechnicals: Array<ReqTechnical>;
  public isValid: boolean;
  public validDate: boolean;
  public config: Configuration;

  constructor(
    private requestService: RequestService,
    private datePipe: DatePipe,
    private configurationService: ConfigurationService,
    private comunicationService: ComunicationService
  ) {

  }

  ngOnInit() {

    this.creationDate = new Date();
    this.startDate = new Date();
    this.today = new Date();
    this.comunicationService.getUser().subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
    this.getAllAreas();
    this.initializedNewRequest();
    this.getConfig();
  }

  getConfig(): void {
    this.configurationService.getConfiguration(1).subscribe(res => {
      this.config = res;
    });
  }

  private initializedNewRequest(): void {
    this.request = new RequestDTO(null, this.user, this.creationDate, '', '', this.startDate, 'Nueva', '', this.reqTechnicals, []);
    this.nResources = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    this.developEnv = ['Entorno desarrollo 1', 'Entorno desarrollo 2', 'Entorno desarrollo 3', 'Entorno desarrollo 4'];
    this.programLang = ['Lenguaje programacion 1', 'Lenguaje programacion 2', 'Lenguaje programacion 3'];
    this.infraBd = ['Infraestructura 1', 'Infraestructura 2', 'Infraestructura 3'];
    this.reqdes = ['Requerido', 'Deseable'];
    this.expyears = ['', '', '', ''];
    this.areas = [];
    this.detalle = '';
    this.experience = '';
    this.requeriment = '';
    this.details = [];
    this.reqTechnicals = new Array<ReqTechnical>();
    this.validDate = true;
  }

  public createRequest(form: NgForm): void {

    this.request.reqTechs = this.reqTechnicals;
    this.requestService.createRequest(this.request).subscribe(
      (response: boolean) => {
        this.insertRequest = response;
        if (this.insertRequest) {
          swal({
            type: 'success',
            title: 'Solicitud añadida correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.sendEmail();
        } else {
          swal({
            type: 'error',
            title: 'Se produjo un error al crear la solicitud',
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.reqTechnicals = [];
        this.selectedArea = new Area();
        this.detalle = '';
        this.experience = '';
        this.requeriment = '';
        this.request = new RequestDTO(null, this.user, this.creationDate, '', '', this.startDate, 'Nueva', '', this.reqTechnicals, []);

      }
    );
  }

  sendEmail(): any {
    if (this.config.notificationRequest === true) {
      const context: ContextEmail = new ContextEmail();
      context.from = this.request.petitioner.name + ' ' + this.request.petitioner.lastName;
      context.subject = this.request.profile;
      context.text = this.request.descTask;
      this.requestService.sendEmail(context).subscribe(res => {
      });
    }
  }

  public loadDetails() {
    this.details = this.selectedArea.detalles;
    if (this.selectedArea !== undefined || this.selectedArea !== null) {
      this.detalle = '';
    }
  }

  public addRequeriment() {
    const req = new ReqTechnical(null, this.selectedArea.nombreArea, this.detalle, this.experience, this.requeriment, null);
    if (!this.checkTechnicalScope()) {
      this.reqTechnicals.push(req);
    }
  }

  public deleteRequeriment(i: number) {
    this.reqTechnicals.splice(i, 1);
  }

  private checkTechnicalScope(): boolean {
    let match = false;
    this.reqTechnicals.forEach(req => {
      if (req.techscope === this.detalle) {
        match = true;
      }
    });
    return match;
  }
  private assignStartDate(event): void {

    if (DateUtils.formatDate(event) < DateUtils.formatDate(new Date())) {
      this.validDate = false;
    } else if (DateUtils.formatDate(event) >= DateUtils.formatDate(new Date())) {
      this.request.startDate = event;
      this.validDate = true;
    }
  }

  private sumarDias(fecha, dias): Date {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  private getAllAreas(): void {
    this.configurationService.getAllAreas().subscribe((res: Array<Area>) => {
      this.areas = res;
      if (this.areas !== null) {
        console.log(this.areas);
      }
    });
  }

}
