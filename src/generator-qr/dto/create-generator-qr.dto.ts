import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { ColorQrClass } from '../class/color-qr.class';
import { TypeEnum } from '../enums/type.enum';
import {
  ColorQRInterface,
  CreateQRInterface,
} from '../interfaces/index.interface';

export class CreateGeneratorQrDto implements CreateQRInterface {
  @ApiProperty({
    type: 'string',
    example: 'https://www.atsistemas.com/es',
    description: 'URL for QR',
  })
  @IsString()
  public url: string;

  @ApiProperty({
    enum: TypeEnum,
    example: TypeEnum.IMAGE,
    description: 'Format of file QR: [image, html, json]',
  })
  @IsEnum(TypeEnum)
  public type: TypeEnum;

  @ApiProperty({
    type: 'number',
    example: 20,
    description: 'Size of QR',
  })
  @IsOptional()
  @IsNumber()
  @Max(50)
  public size?: number;

  @ApiProperty({
    type: 'object',
    example: { dark: '#000', light: '#ffffff' },
    description: 'Color of QR',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ColorQrClass)
  public color?: ColorQRInterface;
}
