import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpSentEvent } from '@angular/common/http';
import { HttpHeaderResponse } from '@angular/common/http';
import { HttpProgressEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpUserEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private userService: UserService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    'x-access-token': token,
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            this.userService.logout();
        }

        return next.handle(req).pipe((catchError((error) => {

            console.log("error", error);

            if (error.status === 500 || error.status === 401) {
                this.userService.logout();
            }
            const objError = error.error.message || error.statusText;
            return throwError(objError);
        })));
    }
}
