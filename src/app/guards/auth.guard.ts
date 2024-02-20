import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (!this.auth.isLoggedIn()) {
      alert('Vous devez vous connecter pour accéder à cette page')
      this.router.navigate([''])
      return false
    }
    return true
  }
}