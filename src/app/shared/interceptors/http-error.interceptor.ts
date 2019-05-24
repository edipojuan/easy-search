import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: any, next: any) {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          const errorMessage = `Error: ${error.error.message}`;
          return throwError(errorMessage);
        } else {
          // server-side error
          const { status } = error;

          switch (status) {
            case 401:
              message = 'Você deve fazer login para acessar este recurso.';
              return throwError({ status, message });

            case 500:
              if (error.error && error.error.error) {
                return throwError(error.error.error.message);
              } else {
                message =
                  'Ops! Aconteceu um erro inesperado. Entre em contato com o administrador.';
                return throwError(message);
              }

            default:
              let errorMessage = `Error Code: ${status}`;
              errorMessage += `\nMessage: ${error.message}`;
              return throwError(errorMessage);
          }
        }
      })
    );
  }
}
