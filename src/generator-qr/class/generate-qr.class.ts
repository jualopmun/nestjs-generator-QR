import { GenerateQRInterface } from '../interfaces/index.interface';

export class GenerateQRClass implements GenerateQRInterface {
  public generateqr: string;

  constructor(generateqr: string) {
    this.generateqr = generateqr;
  }
}
