import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorQrController } from './generator-qr.controller';
import { GeneratorQrService } from './generator-qr.service';
import { CreateGeneratorQrDto } from './dto/create-generator-qr.dto';
import { TypeEnum } from './enums/type.enum';

describe('GeneratorQrController', () => {
  let controller: GeneratorQrController;
  let service: GeneratorQrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratorQrController],
      providers: [
        {
          provide: GeneratorQrService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GeneratorQrController>(GeneratorQrController);
    service = module.get<GeneratorQrService>(GeneratorQrService);
  });

  describe('create', () => {
    it('should return a rendered HTML page if type is HTML', async () => {
      const createGeneratorQrDto: CreateGeneratorQrDto = {
        type: TypeEnum.HTML,
        url: 'http://example.com',
      };
      const expectedResponse = {
        uri: 'http://localhost:3000',
        generateqr: 'test-uri',
      };
      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResponse);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        render: jest.fn().mockReturnThis(),
      } as any;

      await controller.create(createGeneratorQrDto, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.render).toHaveBeenCalledWith('index', {
        uri: 'test-uri',
        ...expectedResponse,
      });
    });

    it('should return a JSON response if type is JSON', async () => {
      const createGeneratorQrDto: CreateGeneratorQrDto = {
        type: TypeEnum.JSON,
        url: 'http://example.com',
      };
      const expectedResponse = {
        uri: 'http://localhost:3000',
        generateqr: 'test-uri',
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResponse);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as any;

      await controller.create(createGeneratorQrDto, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
    });

    it('should return an image response if type is IMAGE', async () => {
      const createGeneratorQrDto: CreateGeneratorQrDto = {
        type: TypeEnum.IMAGE,
        url: 'http://example.com',
      };
      const expectedResponse = { generateqr: 'test-data-url' };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResponse);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        setHeader: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      } as any;

      const mockBuffer = Buffer.from('test-buffer', 'base64');
      jest.spyOn(Buffer, 'from').mockReturnValueOnce(mockBuffer);

      await controller.create(createGeneratorQrDto, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'image/png',
      );
      expect(mockResponse.send).toHaveBeenCalledWith(mockBuffer);
    });
  });
});
