import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Area } from '../../../../../models/area';
import { ConfigurationService } from '../../../../../services/configuration/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VALID } from '@angular/forms/src/model';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrls: ['./new-area.component.css']
})
export class NewAreaComponent implements OnInit {

  area: Area;
  passwordAux: string;
  insertArea: boolean;
  areaNameExists: boolean;
  areaId: number;
  actionArea: string;
  action: string;
  message: string;


  constructor(
    private route: ActivatedRoute,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {
    this.area = new Area();
    this.initializations();
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.areaId = +params['id'];
        this.actionArea = 'MODIFICAR AREA';
        this.action = 'Modificar';
        this.message = 'Area modificada satisfactoriamente';
        this.loadArea(this.areaId);
      }
    });
  }

  initializations(): void {
    this.actionArea = 'NUEVO AREA';
    this.action = 'Crear';
    this.message = 'Area creada satisfactoriamente';
    this.message = 'Area modificada satisfactoriamente';
  }

  loadArea(areaId: number): void {
    this.configurationService.getAreaById(areaId).subscribe(res => {
    this.area = res;
    });
  }

  areaExists(form: NgForm): boolean {
    this.areaNameExists = false;
    if (this.area.nombreArea !== '') {
      this.configurationService.areaExists(this.area.nombreArea).subscribe(
        (response: boolean) => {
          this.areaNameExists = response;
          if (this.areaNameExists) {
            form.control.reset();
          }
        }
      );
    }
    return true;
  }

  createArea(form: NgForm): void {
    this.area.nombreArea = this.area.nombreArea.toLocaleUpperCase();
    this.configurationService.createArea(this.area).subscribe(
      (response: boolean) => {
        this.insertArea = response;
        if (this.insertArea) {
          swal({
            type: 'success',
            title: this.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.initializations();
        }
        form.reset();
      }
    );
  }

}
