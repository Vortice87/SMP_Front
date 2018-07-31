import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ComunicationService } from '../services/shared/comunication.service';
import { UserAccountDTO } from '../models/userAccountDTO';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

  private user: UserAccountDTO;

  constructor(
    private router: Router,
    private comunicationService: ComunicationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.comunicationService.getUser().map( res => {
        if (res != null) {
          this.user = res;
          return true;
        }
        this.router.navigate(['login']);
        return false;
      });
  }
}
