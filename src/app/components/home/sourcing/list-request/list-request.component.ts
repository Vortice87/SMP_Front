import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../../services/request/request.service';
import { RequestDTO } from '../../../../models/request';
import { RequestFilter } from '../../../../models/request-filter';
import { PageState, PaginateOptions } from 'ngx-paginate/src/app/paginate.component';


@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})


export class ListRequestComponent implements OnInit {

  public pageConf: PageState = {
    currentPage: 1,
    pageSize: 5,
    totalItems: 10
  };

  public optionConf: PaginateOptions = {
    spanPages : 2,
    previousPage: true,
    nextPage: true,
    firstPage: true,
    lastPage: true,
    titles: {
      firstPage: '<<',
      previousPage: '<',
      lastPage: '>>',
      nextPage: '>',
      pageSize: ' '
    },
    pageSizes: []
  };

  public requests: Array<RequestDTO>;
  public useFilter: boolean;
  public currentRequestFilter: RequestFilter;
  public noRegisters: boolean;

  constructor(private requestService: RequestService) {

  }

  ngOnInit() {
  this.noRegisters = false;
  this.currentRequestFilter = new RequestFilter('', 0, '', '', null, null, '', 0 , 5);
  this.getCountByRequestsFilter(this.currentRequestFilter);
  }

  public requestFilter(event) {
    this.useFilter = true;
    this.currentRequestFilter = event;
    this.currentRequestFilter.index = 0;
    this.currentRequestFilter.limit = this.pageConf.pageSize;
    this.getCountByRequestsFilter(this.currentRequestFilter);
  }

  private getCountByRequestsFilter(requestFilter: RequestFilter): void {
    this.requestService.getCountByRequestsFilter(requestFilter).subscribe(res => {
      this.pageConf = {
        currentPage: 1,
        pageSize: 5,
        totalItems: res
      };
      this.requestService.findByRequestFilter(requestFilter).subscribe((list: Array<RequestDTO>) => {
        this.requests = list;
        if (this.requests.length === 0) {
          this.noRegisters = true;
        } else {
          this.noRegisters = false;
        }
      });
    });
  }

  public setPage(pageState: PageState) {
      this.currentRequestFilter.index = (pageState.pageSize * pageState.currentPage) - pageState.pageSize;
      this.currentRequestFilter.limit = pageState.pageSize;
      this.requestService.findByRequestFilter(this.currentRequestFilter).subscribe((list: Array<RequestDTO>) => {
        this.requests = list;
      });
  }

  public goToTop() {
    window.scrollTo(0, 0);
  }
}
