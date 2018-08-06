import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../../../services/request/request.service';
import { RequestDTO } from '../../../../../../models/request';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  public requestId: number;
  public request: RequestDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== null) {
          this.requestId = +params['id'];
          this.loadRequestDetails(this.requestId);
      }
   });
  }

  private loadRequestDetails(id: number) {
     this.requestService.getRequestById(id).subscribe(res => {
       this.request = res;
       console.log(this.request);
     });
  }

}
