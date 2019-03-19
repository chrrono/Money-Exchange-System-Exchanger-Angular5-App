import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthHttpService } from "../http-service/auth-http-service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authHttpService: AuthHttpService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authHttpService.isAuthenticated();
  }

  
}