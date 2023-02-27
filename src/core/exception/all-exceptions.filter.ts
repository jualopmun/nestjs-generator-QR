import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { ExceptionControlInterface } from '../interfaces/index.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { getRequestUrl, reply } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const data =
      exception?.getResponse instanceof Function
        ? (exception.getResponse() as ExceptionControlInterface)
        : exception?.message;

    const message = data instanceof Object ? data?.message : data;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: getRequestUrl(ctx.getRequest()),
      exception: {
        message,
      },
    };

    reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
