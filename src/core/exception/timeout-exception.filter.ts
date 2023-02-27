import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CustomLogger } from '../logger/custom-logger.helper';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger: CustomLogger;

  constructor() {
    this.logger = new CustomLogger();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          this.logger.error(`Error timeout exception ${err}`);
          return throwError(
            () =>
              new HttpException(
                {
                  status: HttpStatus.REQUEST_TIMEOUT,
                  message: 'Error timeout exception',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
