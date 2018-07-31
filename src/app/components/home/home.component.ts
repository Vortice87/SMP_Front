import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionUtils } from '../../utils/session-utils/session-utils';
import { Input } from '@angular/core/src/metadata/directives';
import { ComunicationService } from '../../services/shared/comunication.service';
import { UserAccountDTO } from '../../models/userAccountDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user: UserAccountDTO;
  public isAdmin: boolean;
  constructor(private router: Router,
              private comunicationService: ComunicationService) { }

  ngOnInit() {
    this.comunicationService.getUser().subscribe(res => {
      this.user = res;
      if (res !== null) {
        this.checkForLoggedUser();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  checkForLoggedUser(): void {

    if (this.user.profile === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}

