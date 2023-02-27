import { TypeEnum } from '../enums/index.enum';

export interface CreateQRInterface {
  url: string;
  type: TypeEnum;
  size?: number;
  color?: ColorQRInterface;
}

export interface ColorQRInterface {
  dark: string;
  light: string;
}
