import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAccountDTO } from '../models/userAccountDTO';
import { SessionUtils } from '../utils/session-utils/session-utils';
import { ComunicationService } from '../services/shared/comunication.service';

@Injectable()
export class AdminGuard implements CanActivate {

  private user: UserAccountDTO;

  constructor(private router: Router,
              private comunicationService: ComunicationService) {
                this.comunicationService.getUser().subscribe( res => {
                  this.user = res;
                });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.user.profile === 'admin') {
      return true;
    }

    this.router.navigate(['home']);
    return false;

  }
}
