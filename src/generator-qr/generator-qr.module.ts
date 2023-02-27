import { Module } from '@nestjs/common';
import { GeneratorQrService } from './generator-qr.service';
import { GeneratorQrController } from './generator-qr.controller';

@Module({
  controllers: [GeneratorQrController],
  providers: [GeneratorQrService],
})
export class GeneratorQrModule {}
