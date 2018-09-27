import { Component, OnInit, Input } from '@angular/core';
import { RequestDTO } from '../../../../../models/request';
import { UserAccountDTOService } from '../../../../../services/user-accounts/user-accounts.service';
import { UserAccountDTO } from '../../../../../models/userAccountDTO';
import { RequestService } from '../../../../../services/request/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input()
  public request: RequestDTO;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
  }
}
