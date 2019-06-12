import { Component, OnInit } from '@angular/core';


import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UserAccountDTO } from '../../../../../../models/userAccountDTO';
import { UserAccountDTOService } from '../../../../../../services/user-accounts/user-accounts.service';
import { Detalles } from '../../../../../../models/detalles';
import { ConfigurationService } from '../../../../../../services/configuration/configuration.service';
import { ActivatedRoute } from '@angular/router';
import { Area } from '../../../../../../models/area';

@Component({
  selector: 'app-newdetail',
  templateUrl: './newdetail.component.html',
  styleUrls: ['./newdetail.component.css']
})
export class NewdetailComponent implements OnInit {

  detail: Detalles;
  detailId: number;
  formValid: boolean;
  passwordAux: string;
  insertDetail: boolean;
  selectedArea: boolean;
  detailExists: boolean;
  profiles: string[] = ['admin', 'sourcing', 'area'];
  actionArea: string;
  action: string;
  message: string;
  areas: Area[];
  currentArea: Area;

  constructor(
    private configurationService: ConfigurationService,
    private route: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.getAllAreasWithNoRelationship();
    this.initializations();
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.detailId = +params['id'];
        this.actionArea = 'MODIFICAR DETALLE';
        this.action = 'Modificar';
        this.message = 'Detalle modificado satisfactoriamente';
        this.selectedArea = true;
        this.loadDetail(this.detailId);
      }
    });
  }

  getAllAreasWithNoRelationship(): void {
    const emptyArea: Area = new Area();
    emptyArea.areaId = 0;
    emptyArea.nombreArea = '- Seleccionar -';
    this.configurationService.getAllAreasWithNoRelationship().subscribe(
      (response: Area[]) => {
        this.areas = response;
        this.areas.unshift(emptyArea);
        this.currentArea = this.areas[0];
      },
      (error) => {
        console.log('error:' + error);
      }
    );
  }

  loadDetail(detailId: number): void {
    this.configurationService.getDetalleById(detailId).subscribe(res => {
      this.detail = res;
      this.configurationService.getAreaById(this.detail.areaId).subscribe(area => {
      this.areas.forEach(element => {
        if (element.areaId === area.areaId) {
          this.currentArea = element;
        }
      });
      // this.formValid = true;
      });
      });
  }

  initializations(): void {
    this.actionArea = 'NUEVO DETALLE';
    this.action = 'Crear';
    this.message = 'Detalle creado satisfactoriamente';
    this.formValid = true;
    this.detail = new Detalles();
    this.detail.nombreDetalle = '';
    this.selectedArea = false;
  }

  detalleExists(): boolean {
    this.detailExists = false;
    if (this.detail.nombreDetalle !== '') {

      this.configurationService.detalleExists(this.detail.nombreDetalle).subscribe(
        (response: boolean) => {
          this.detailExists = response;
          if (this.detailExists) {
            this.formValid = true;
          }
        }
      );
    }
    return true;
  }

  createDetail(form: NgForm): void {
    this.detail.areaId = this.currentArea.areaId;
    this.configurationService.createDetail(this.detail).subscribe(
      (response: boolean) => {
        this.insertDetail = response;
        if (this.insertDetail) {
          swal({
            type: 'success',
            title: this.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.currentArea = this.areas[0];
        this.initializations();
      }
    );
  }

  modelChanged(): void {
    if (this.detail != null || this.detail !== undefined) {
      if (this.detail.nombreDetalle.length === 0 || this.currentArea.areaId === 0) {
        this.detalleExists();
        this.formValid = true;
      } else {
        this.detalleExists();
        this.formValid = false;
      }
    }
  }

  modelDetailChanged(): void {
    if (this.detail.nombreDetalle === '') {
        this.formValid = true;
      } else {
        this.formValid = false;
      }
    }

}
