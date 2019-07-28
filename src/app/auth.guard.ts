import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  currentValue = true;
  constructor(private auth: AuthService, private router: Router) {
    var that = this;

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if(this.auth.authenticated().currentUser == null){
        console.log('Access Denied!');
        this.router.navigate(['login']);
        return false;
      }else{
        return true
      }
  }
}
