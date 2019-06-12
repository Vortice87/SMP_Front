import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Area } from '../../models/area';
import { Detalles } from '../../models/detalles';
import { Configuration } from '../../models/configuration';

const options = {
  headers: new HttpHeaders(
    { 'Content-Type': 'Application/json' }
  )
};

@Injectable()
export class ConfigurationService {

  private urlConfig = 'http://localhost:8060/configuration';


  constructor(private http: HttpClient) { }

  getAllAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.urlConfig + '/all').catch(this.handError);
  }

  getAllAreasWithNoRelationship(): Observable<Area[]> {
    return this.http.get<Area[]>(this.urlConfig + '/allwithNoRelationship').catch(this.handError);
  }

  getAreaById(areaId: number): Observable<Area> {
    return this.http.get<Area>(this.urlConfig + '/findAreaById/' + areaId).catch(this.handError);
  }

  getDetalleById(detalleId: number): Observable<Detalles> {
    return this.http.get<Detalles>(this.urlConfig + '/findDetalleById/' + detalleId).catch(this.handError);
  }

  createArea(area: Area): Observable<boolean> {
    const body: any = JSON.stringify(area);
    return this.http.post<boolean>(this.urlConfig + '/create', JSON.parse(body), options).catch(this.handError);
  }

  createDetail(detail: Detalles): Observable<boolean> {
    const body: any = JSON.stringify(detail);
    return this.http.post<boolean>(this.urlConfig + '/createDetail', JSON.parse(body), options).catch(this.handError);
  }

  deleteArea(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlConfig + '/delete/' + id).catch(this.handError);
  }

  deleteDetail(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.urlConfig + '/deleteDetail/' + id).catch(this.handError);
  }

  areaExists(areaName: String): Observable<boolean> {
    return this.http.get<boolean>(this.urlConfig + '/exists/' + areaName).catch(this.handError);
  }

  detalleExists(detalleName: String): Observable<boolean> {
    return this.http.get<boolean>(this.urlConfig + '/detailExists/' + detalleName).catch(this.handError);
  }

  getConfiguration(configId: number): Observable<Configuration> {
    return this.http.get<Configuration>(this.urlConfig + '/getConfiguration/' + configId).catch(this.handError);
  }

  saveConfiguration(config: Configuration): Observable<boolean> {
    const body: any = JSON.stringify(config);
    return this.http.post<boolean>(this.urlConfig + '/saveConfiguration', JSON.parse(body), options).catch(this.handError);
  }

  handError(error: any) {
    console.log('error: ' + error);
    return Observable.throw(error);
  }

}
