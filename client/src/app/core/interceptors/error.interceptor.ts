import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toastr.error(error.error.message, error.error.statusCode);
            }
          }
          if (error.status === 401) {
            this.toastr.error(error.error.message, error.error.statusCode);
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
        }
        return throwError(error);
      })
    );
  }
}
