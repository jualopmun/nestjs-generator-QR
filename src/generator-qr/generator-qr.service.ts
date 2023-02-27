import { Injectable } from '@nestjs/common';
import { CreateGeneratorQrDto } from './dto/create-generator-qr.dto';
import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';
import { GenerateQRClass } from './class/generate-qr.class';
import { GenerateQRInterface } from './interfaces/generate-qr.interface';

@Injectable()
export class GeneratorQrService {
  async create(
    createGeneratorQrDto: CreateGeneratorQrDto,
  ): Promise<GenerateQRInterface> {
    const {
      url,
      size = 20,
      color = { dark: '#000', light: '#ffffff' },
    } = createGeneratorQrDto;
    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      scale: size,
      color,
    };
    const getQrinBase64 = await toDataURL(url, opts);
    return new GenerateQRClass(getQrinBase64);
  }
}
