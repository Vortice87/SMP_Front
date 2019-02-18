import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { RequestFilter } from '../../../../../models/request-filter';
import { Requester } from '../../../../../models/requester';
import { UserAccountDTOService } from '../../../../../services/user-accounts/user-accounts.service';

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
  public requesters: Array<Requester>;
  public currentRequester: Requester;
  public bsRangeValue: Date[];
  @Output() findRequests: EventEmitter<RequestFilter> = new EventEmitter();

  constructor(private UserService: UserAccountDTOService) {
    this.currentFilter = new RequestFilter('', 0 , '', '',  null, null, '');
  }

  ngOnInit() {
    this.getAllRequesters();
  }

  public onFilter() {
    if (this.bsRangeValue !== undefined && this.bsRangeValue.length !== 0) {
      this.currentFilter.fechaDesde = this.bsRangeValue[0];
      this.currentFilter.fechaHasta = this.bsRangeValue[1];
    }
    this.currentFilter.solicitante = this.currentRequester.id;
    this.findRequests.emit(this.currentFilter);
  }

  public clear() {
    this.bsRangeValue = [];
    this.currentFilter = new RequestFilter('', 0, '', '',  null, null, '');
    this.currentRequester = this.requesters[0];
  }

  public getAllRequesters() {
    const emptyRequester: Requester = new Requester();
    emptyRequester.id = 0;
    emptyRequester.requester = '- Seleccionar -';
    this.UserService.getAllRequesters().subscribe(res => {
      this.requesters = res;
      this.requesters.unshift(emptyRequester);
      this.currentRequester = this.requesters[0];
    });
  }

}
