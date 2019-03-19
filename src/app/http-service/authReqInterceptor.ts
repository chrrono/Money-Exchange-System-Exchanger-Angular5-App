import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { AuthHttpService } from "./auth-http-service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

@Injectable()
export class AuthReqInterceptor implements HttpInterceptor{
    
    constructor(private authService : AuthHttpService,
                private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // debugger
        // let token = this.authService.getToken()
        // const copyReq = req.clone();
        // if( copyReq.url != 'http://localhost:8080/oauth/token'){
        //     copyReq.headers.set("Authorization","Bearer "+token);
        //     console.log("Interceptor");
        // }

        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {}
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
               this.authService.logout()
               alert("Wymagane ponowne logowanie, z powodu wygaśnięcia sesji");
               this.router.navigate(['login']);
              }
              else if (err.status == 400){
                alert("Niepowodzenie operacji");
                this.router.navigate(['home']);
              }
            }
          });

    }

}