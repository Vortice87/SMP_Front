import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { ConfigurationService } from '../../../../../services/configuration/configuration.service';
import { Area } from '../../../../../models/area';
import { ActivatedRoute } from '@angular/router';
import { Detalles } from '../../../../../models/detalles';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  area: Area;
  areaId: number;

  constructor(
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.areaId = +params['id'];
        this.loadDetails(this.areaId);
      }
    });
  }

  loadDetails(areaId: number): void {
    this.configurationService.getAreaById(areaId).subscribe(res => {
      this.area = res;
    });
  }

  deleteDetail(detalle: Detalles): void {
    swal({
      title: '¿Esta seguro de eliminar el detalle?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.configurationService.deleteDetail(detalle.detalleId).subscribe(
          (response: boolean) => {
            if (!response) {
              swal(
                'Eliminado',
                'El detalle seleccionado ha sido eliminado',
                'success'
              );
              this.loadDetails(this.area.areaId);
            }
          }
        );
      }
    });
  }
}
