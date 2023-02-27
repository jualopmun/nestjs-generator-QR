import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ColorQRInterface } from '../interfaces/index.interface';

export class ColorQrClass implements ColorQRInterface {
  @ApiProperty({
    type: 'string',
    example: '#000000',
    description: 'Color of body QR',
  })
  @IsString()
  public dark: string;

  @ApiProperty({
    type: 'string',
    example: '#FFFFFF',
    description: 'Color of background QR',
  })
  @IsString()
  light: string;
}
