import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request/request.service';
import { RequestDTO } from '../../../../models/request';
import { RequestFilter } from '../../../../models/request-filter';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {

  public requests: Array<RequestDTO>;
  public filter: RequestFilter;
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getAllRequests();

  }

  private getAllRequests() {
    this.requestService.getAllRequest().subscribe((res: Array<RequestDTO>) => {
      if (res !== null) {
        this.requests = res;
      }
    });
  }

  public findRequests(event) {
    this.requests = [];
    console.log(event);
    this.filter = event;
    this.filter.solicitante = 1;
    this.requestService.findByRequestFilter(this.filter).subscribe((res: Array<RequestDTO>) => {
      this.requests = res;
      console.log(res);
    });
  }

}
