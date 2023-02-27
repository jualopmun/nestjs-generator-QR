import { GeneratorQrService } from './generator-qr.service';
import { CreateGeneratorQrDto } from './dto/create-generator-qr.dto';
import { TypeEnum } from './enums/type.enum';

describe('GeneratorQrService', () => {
  let service: GeneratorQrService;

  beforeEach(() => {
    service = new GeneratorQrService();
  });

  describe('create', () => {
    const createGeneratorQrDto: CreateGeneratorQrDto = {
      url: 'https://example.com',
      type: TypeEnum.JSON,
      size: 10,
      color: { dark: '#000', light: '#fff' },
    };

    it('should return a valid GenerateQRInterface object', async () => {
      const result = await service.create(createGeneratorQrDto);

      expect(result).toBeDefined();
      expect(result.generateqr).toContain('data:image/png;base64,');
    });

    it('should return a GenerateQRInterface object with the correct data', async () => {
      const result = await service.create(createGeneratorQrDto);

      expect(result.generateqr).toContain('data:image/png;base64,');
    });
  });
});
