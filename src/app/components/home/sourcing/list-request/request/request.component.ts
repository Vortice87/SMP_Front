import { Component, OnInit, Input } from '@angular/core';
import { RequestDTO } from '../../../../../models/request';
import { UserAccountDTOService } from '../../../../../services/user-accounts/user-accounts.service';
import { UserAccountDTO } from '../../../../../models/userAccountDTO';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input()
  public request: RequestDTO;
  public petitioner: UserAccountDTO;

  constructor(private userService: UserAccountDTOService) { }

  ngOnInit() {
    this.getPetitionerName(this.request.petitionerId);
  }

  private getPetitionerName(id: number) {
    this.userService.getUserById(id).subscribe((user: UserAccountDTO) => {
      this.petitioner = user;
    });
  }

}
