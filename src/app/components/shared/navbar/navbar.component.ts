import { Component, OnInit } from '@angular/core';
import { SessionUtils } from '../../../utils/session-utils/session-utils';
import { Router } from '@angular/router';
import { ComunicationService } from '../../../services/shared/comunication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private comunicationService: ComunicationService) { }

  ngOnInit() {
  }

  logout(): void {
    this.comunicationService.clearUser();
   this.router.navigate(['/login']);
  }
}
