import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { Area } from '../../../../models/area';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  private areas: Area[];

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getAllAreasWithNoRelationship();
  }

  getAllAreasWithNoRelationship(): void {
    this.configurationService.getAllAreasWithNoRelationship().subscribe(
      (response: Area[]) => {
        this.areas = response;
      },
      (error) => {
        console.log('error:' + error);
      }
    );
  }

  deleteArea(area: Area): void {
    swal({
      title: '¿Esta seguro de eliminar el area?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.configurationService.deleteArea(area.areaId).subscribe(
          (response: boolean) => {
            if (!response) {
              swal(
                'Eliminada',
                'El area seleccionada ha sido eliminada',
                'success'
              );
              this.getAllAreasWithNoRelationship();
            }
          }
        );
      }
    });
  }

}
