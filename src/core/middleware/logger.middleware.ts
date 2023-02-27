import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from '../logger/custom-logger.helper';
import * as moment from 'moment';
import * as crypto from 'crypto';
import { environment } from '../config/environment';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  private readonly logger: CustomLogger;

  constructor() {
    this.logger = new CustomLogger();
  }

  public use(req: Request, res: Response, next: NextFunction): void {
    const now = Date.now();
    const token = crypto
      .createHash('md5')
      .update(moment().milliseconds().toString())
      .digest('hex');

    res.on('finish', () => {
      const delay = Date.now() - now;
      const { method, originalUrl, body } = req;
      const { statusCode } = res;

      const message = `${token} ${method} ${originalUrl} ${delay}ms ${statusCode} ${
        Object.keys(body).length ? JSON.stringify(body) : ''
      }`;
      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    const origin = req.headers.origin;
    const validOrigin = environment?.ORIGIN?.includes(origin) ?? true;
    if (validOrigin) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      res.header('X-correlation-id', token);
    }

    next();
  }
}
