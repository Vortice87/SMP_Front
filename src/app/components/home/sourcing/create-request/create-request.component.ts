import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request/request.service';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { ReqFunctional } from '../../../../models/reqFunctional';
import { LanguagesRequest } from '../../../../models/languagesRequest';
import { Request } from '../../../../models/request';
import { ReqTechnical } from '../../../../models/reqTechnical';
import { forEach } from '@angular/router/src/utils/collection';

import { Provider } from '../../../../models/provider';
import { SessionUtils } from '../../../../utils/session-utils/session-utils';
import { UserAccount } from '../../../../models/userAccount';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  request: Request;
  user: UserAccount;
  startDate: Date;
  estimatedDay: Date;
  today: Date;
  passwordAux: string;
  insertRequest: boolean;
  usernameExists: boolean;
  profiles: string[] = ["admin", "sourcing", "provider", "area"];
  categoryFunc: string[] = ["Director", "Gerente"];
  nResources: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  nResource: string = "";

  providers: Array<Provider> = new Array<Provider>();

  reqProfiles: string[] = ["Consultor", "Desarrollador"];
  technologies: string[] = ["Java", ".Net"];
  areas: string[] = ["28000 - Dirección General", "28600 - RRHH"];
  departments: string[] = ["Department 1", "Department 2"];
  managements: string[] = ["Management 1", "Management 2"];
  developEnv: string[] = ["develop env 1", "develop env 2", "develop env 3", "develop env 4"];
  programLang: string[] = ["Programming language 1", "Programming language 2", "Programming language 3"];
  infraBd: string[] = ["Infra 1", "Infra 2", "Infra 3"];
  reqdes: string[] = ["Required", "Desireable"];
  locations: string[] = ["Location 1", "Location 2", "Location 3"];
  platEquips: string[] = ["DA SCISB", "DA PRBES"];
  yesno: string[] = ["Yes", "No"];
  expyears: string[] = ["", "", "", ""];
  typesAccess: string[] = ["PERMANENTE", "PUNTUAL(1 DÍA)", "5 DIAS/SEMANA"];
  units: string[] = ["28310 - Metodologia y Procesos", "28210 - Ctrl. de gestion de Proyectos"];
  widget: number;
  currentAddIndexReq: number = 0;
  currentAddIndexLang: number = 0;
  selectProvider = [];

  reqTechnicals: Array<ReqTechnical> = new Array<ReqTechnical>();
  isValid: boolean = false;

  constructor(private requestService: RequestService, private datePipe: DatePipe) {
    this.providers.push(new Provider(1, "Experis IT"));
    this.providers.push(new Provider(2, "KPMG IT"));
    this.providers.push(new Provider(3, "Proveedor 3"));

  }

  ngOnInit() {

    this.widget = 1;
    this.startDate = new Date();
    this.today = new Date();
    this.estimatedDay = this.sumarDias(this.today, 14);
    this.user = SessionUtils.getCurrentLoggedInUser();
    
    this.reqTechnicals = [{ id_tech: null, techscope: "", others: "", exp: "", reqdes: "" }, { id_tech: null, techscope: "", others: "", exp: "", reqdes: "" },
    { id_tech: null, techscope: "", others: "", exp: "", reqdes: "" }, { id_tech: null, techscope: "", others: "", exp: "", reqdes: "" }]
    this.request = new Request(null, this.user.username, "", "", "", "", "", "", null, "", "", "", this.startDate, null, "", "", "", "",
     [], this.reqTechnicals, "", "", null, "", "", "", "", "", "", [] , []);
    this.loadDataRequest();
  }

  next(): void {
    this.widget = this.widget + 1;
  }


  previous(): void {
    this.widget = this.widget - 1;
  }


  createRequest(form: NgForm): void {

    console.log(this.request);
    if(this.request.reqTechs[3].techscope == ''){
      this.request.reqTechs.splice(3,1);
    }
    this.requestService.createRequest(this.request).subscribe(
      (response: boolean) => {
        this.insertRequest = response;
        if (this.insertRequest) {
          swal({
            type: 'success',
            title: 'Request has been created successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
        this.widget = 1;
        form.reset();
        // form.controls.profile.setValue("");
      }
    )
  }

  loadDataRequest(): void {

    if (this.request.reqFuncts.length == 0) {
      this.loadReqFuncts(true, null);
    }
    else {
      // op.forEach(o => {
      //   this.loadComponent(false, o);
      // });
    }

    if (this.request.languages.length == 0) {
      this.loadLanguages(true, null);
    }
    else {
      // op.forEach(o => {
      //   this.loadComponent(false, o);
      // });
    }

  }

  loadReqFuncts(showHeader: boolean, reqFunct: ReqFunctional) {

    if (this.request.reqFuncts.length < 4) {
      if (reqFunct == null) {
        this.request.reqFuncts.push(new ReqFunctional(null, "", "", "", "", this.currentAddIndexReq, showHeader));
      }
      else {
        reqFunct.currentIndex = this.currentAddIndexReq;
        if (this.currentAddIndexReq == 0) {
          reqFunct.header = true;
        }
        this.request.reqFuncts.push(reqFunct);
      }

      this.currentAddIndexReq++;
      this.validate(true);
    }
  }

  
  loadLanguages(showHeader: boolean, lang: LanguagesRequest) {
    

    if (this.request.languages.length < 3) {
      if (lang == null) {
        this.request.languages.push(new LanguagesRequest(null, "", "", "", this.currentAddIndexLang, showHeader));
      }
      else {
        lang.currentIndex = this.currentAddIndexLang;
        if (this.currentAddIndexLang == 0) {
          lang.header = true;
        }
        this.request.languages.push(lang);
      }
      this.currentAddIndexLang++;
    }
  }

  removeReqFunct(id: number) {
    if (this.request.reqFuncts.length > 1) {
      this.request.reqFuncts.splice(this.findIndex(id, "reqfunct"), 1);
    }
    this.request.reqFuncts[0].header = true;
    this.validate(true);
  }

  removeLang(id: number) {
    if (this.request.languages.length > 1) {
      this.request.languages.splice(this.findIndex(id, "lang"), 1);
    }
    this.request.languages[0].header = true;
  }

  findIndex(id: number, nameComponent: string): number {
    let result: number = 0;
    let i: number = 0;

    if (nameComponent == "reqfunct") {
      this.request.reqFuncts.forEach(element => {
        if (element.currentIndex == id) {
          result = i;
        }
        i++;
      });
    }

    if (nameComponent == "lang") {
      this.request.languages.forEach(element => {
        if (element.currentIndex == id) {
          result = i;
        }
        i++;
      });
    }

    return result;
  }


  validate(isValid: boolean) {
    this.isValid = true;
    this.request.reqFuncts.forEach((element: ReqFunctional) => {
      if (!this.validateReqFunct(element)) {
        this.isValid = false;
        return;
      }
    });
    console.log(this.isValid)
  }

  private validateReqFunct(reqfunct: ReqFunctional): boolean {
    if (reqfunct.functscope == '' || reqfunct.exp == null || reqfunct.reqdes == '') {
      return false;
    }
    return true;
  }


  toClearTech(i: number): void {
    if (this.request.reqTechs[3].techscope == "") {
      this.request.reqTechs[3].exp = "";
      this.request.reqTechs[3].reqdes = "";
    }
  }

  assignStartDate(event): void {
    this.request.startDate = event;
    console.log(this.request.startDate);
  }

  assignEndDate(event): void {
    this.request.endDate = event;
    console.log(this.request.endDate);
  }

  sumarDias(fecha, dias): Date {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

}
