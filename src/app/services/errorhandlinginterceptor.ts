import 'rxjs/add/operator/do';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NGXLogger } from 'ngx-logger';

import {environment} from '../../environments/environment';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  API_BASE_URL: string = environment.API_URL;
  AUTHORIZATION: string = environment.AUTHORIZATION;
  errorMessage: string;

  constructor(private logger: NGXLogger) {
 }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptedRequest = request.clone({
      url: `${this.API_BASE_URL}/${request.url}`,
      setHeaders: {
        Authorization: this.AUTHORIZATION || '',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
      return next.handle(interceptedRequest).do((event: HttpEvent<any>) => {
        this.logger.debug('Event:', event);
      }, (err: any) => {
        if (err) {
          if (err.error  && err.error.hasOwnProperty('message') && err.error.message !== null) {
            this.errorMessage = err.error.message;

          } else if (err.hasOwnProperty('message') && err.message !== null) {
             this.errorMessage = err.message;
            }  else {
            this.errorMessage = 'Unknown Server error';
          }
        } else {
          this.errorMessage = 'Unknown Server error';
        }
        if (err instanceof HttpErrorResponse) {
          const errMsg = (err && err.error) || 'Unknown Server error';
          // console.log('Handle Error:', errMsg, ' from ', err);
          this.logger.error('Handle Error:', errMsg, ' from ', err);
          if (this.errorMessage !== null && this.errorMessage.length > 0 && this.errorMessage.includes('unknown url'))  {
            this.errorMessage = this.errorMessage.replace('unknown url', request.url);
          }
          this.logger.error('Error Message:', this.errorMessage);
        this.openErrorModal(this.errorMessage);
          throw Observable.throw(errMsg);
        }
        this.openErrorModal(this.errorMessage);
      });
    }

    openErrorModal(errorMessage?: string) {
        /// To replace ngbModal with Ng Lightning Modal
    // const m = this.ngbModal.open(ConfirmationComponent);
    // m.componentInstance.confMessage = errorMessage ;
     // m.componentInstance.showErrorModal = true;
     // return m.result;
    }
}
