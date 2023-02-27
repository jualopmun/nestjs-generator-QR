import { Module } from '@nestjs/common';
import { CoreModule } from '@/core/core.module';
import { GeneratorQrModule } from './generator-qr/generator-qr.module';

@Module({
  imports: [CoreModule, GeneratorQrModule],
})
export class AppModule {}
