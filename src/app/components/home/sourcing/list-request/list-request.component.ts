import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request/request.service';
import { RequestDTO } from '../../../../models/request';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {

  public requests: Array<RequestDTO>;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getAllRequests();

  }

  private getAllRequests() {
    this.requestService.getAllRequest().subscribe((res: Array<RequestDTO>) => {
      if (res !== null) {
        this.requests = res;
        console.log(this.requests);
      }
    });
  }

}
