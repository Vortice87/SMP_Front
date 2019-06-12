import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../../../models/configuration';
import { ConfigurationService } from '../../../../services/configuration/configuration.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public config: Configuration;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getConfiguration();
  }


  getConfiguration(): void {
    this.configurationService.getConfiguration(1).subscribe(res => {
      if (res != null || res !== undefined) {
        this.config = res;
      }
    });
  }

  saveConfig(): void {
    this.configurationService.saveConfiguration(this.config).subscribe(res => {
      if (res) {
        swal({
          type: 'success',
          title: 'Configuración guardada con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        swal({
          type: 'error',
          title: 'No se ha podido guardar la configuración',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
