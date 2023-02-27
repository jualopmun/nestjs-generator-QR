import { Controller, Post, Body, Res } from '@nestjs/common';
import { GeneratorQrService } from './generator-qr.service';
import { CreateGeneratorQrDto } from './dto/create-generator-qr.dto';
import { TypeEnum } from './enums/type.enum';
import { getBase64StringFromDataURLFn } from './uitls/index.util';
import { environment } from '@/core/config/environment';
import { ApiTags } from '@nestjs/swagger';
import { GenerateQRInterface } from './interfaces/index.interface';

import { Response } from 'express';

const TYPEOPERATIONCREATE = {
  [TypeEnum.HTML]: (res: Response, getQR: GenerateQRInterface) =>
    res.status(200).render('index', { uri: environment.URI, ...getQR }),
  [TypeEnum.JSON]: (res: Response, getQR: GenerateQRInterface) =>
    res.status(200).send(getQR),
  [TypeEnum.IMAGE]: (res: Response, getQR: GenerateQRInterface) => {
    const getBase64StringFromDataURL = getBase64StringFromDataURLFn(
      getQR.generateqr,
    );
    const buff = Buffer.from(getBase64StringFromDataURL, 'base64');
    return res.status(200).setHeader('Content-Type', 'image/png').send(buff);
  },
};

@ApiTags('GeneratorQR')
@Controller('generator-qr')
export class GeneratorQrController {
  constructor(private readonly generatorQrService: GeneratorQrService) {}

  @Post()
  async create(
    @Body() createGeneratorQrDto: CreateGeneratorQrDto,
    @Res() res: Response,
  ) {
    const { type } = createGeneratorQrDto;
    const getQR = await this.generatorQrService.create(createGeneratorQrDto);

    return TYPEOPERATIONCREATE[type](res, getQR);
  }
}
