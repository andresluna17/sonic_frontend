import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root"
})
export class CanActivateGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogging();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  checkLogging() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([""]);
    return false;
  }
}
