import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ComunicationService } from '../services/shared/comunication.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private comunicationService: ComunicationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this.comunicationService.getUser().map( res => {
      if (res !== null && res.profile === 'admin') {
        return true;
      }
      this.router.navigate(['/home']);
      return false;
    });


  }
}
