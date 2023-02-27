import { ConsoleLogger, LoggerService } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger implements LoggerService {
  constructor() {
    super();
  }

  public log(message: any): void {
    super.log(`${message}`);
  }

  public error(message: any): void {
    super.error(`${message}`);
  }

  public warn(message: any): void {
    super.warn(`${message}`);
  }

  public debug(message: any): void {
    super.verbose(`${message}`);
  }

  public verbose(message: any): void {
    super.verbose(`${message}`);
  }
}
