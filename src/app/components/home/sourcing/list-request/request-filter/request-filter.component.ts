import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { RequestFilter } from '../../../../../models/request-filter';

@Component({
  selector: 'app-request-filter',
  templateUrl: './request-filter.component.html',
  styleUrls: ['./request-filter.component.css']
})
export class RequestFilterComponent implements OnInit {

  public currentFilter: RequestFilter;
  public titulo: string;
  public solicitante: string;
  public tecnologia: string;
  public descripcion: string;
  public fechaAlta: string;
  public estado: string = '';
  public estados: Array<string> = ['Nueva', 'En proceso', 'Cerrada', 'Abierta'];
  public bsRangeValue: Date[];
  @Output() findRequests: EventEmitter<RequestFilter> = new EventEmitter();

  constructor() {
    this.currentFilter = new RequestFilter('', 1, '', '',  new Date(), new Date(), '');
  }

  ngOnInit() {
  }

  public onFilter() {
    if (this.bsRangeValue !== undefined && this.bsRangeValue.length !== 0) {
      this.currentFilter.fechaDesde = this.bsRangeValue[0];
      this.currentFilter.fechaHasta = this.bsRangeValue[1];
    }
    this.findRequests.emit(this.currentFilter);
    this.currentFilter = new RequestFilter('', 1, '', '',  new Date(), new Date(), '');
  }

}
