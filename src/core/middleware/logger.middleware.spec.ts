import { TestingModule, Test } from '@nestjs/testing';
import { CustomLogger } from '../logger/custom-logger.helper';
import { GlobalMiddleware } from './logger.middleware';
import { Request } from 'express';

const mockFormat = (status) => {
  return {
    on: jest.fn().mockImplementation((event, cb) => {
      if (event === 'finish') {
        cb();
      }
    }),
    header: jest.fn(),
    statusCode: status,
  };
};

const mockResponse = () => mockFormat(200);

const mockResponse500 = () => mockFormat(500);

const mockResponse400 = () => mockFormat(400);

const mockRequest = (): Request => {
  return {
    headers: {
      origin: '',
    },
    method: 'GET',
    originalUrl: '/',
    body: {},
  } as Request;
};

describe('Middleware', () => {
  let middleware: GlobalMiddleware;
  let customLogger: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalMiddleware, CustomLogger],
    }).compile();

    middleware = module.get<GlobalMiddleware>(GlobalMiddleware);
    customLogger = module.get<CustomLogger>(CustomLogger);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('Response have statusCode 200 and call logger.log', () => {
    const log = jest.spyOn(customLogger, 'log');
    middleware.use(mockRequest(), mockResponse() as any, jest.fn());
    customLogger.log('mensaje');
    expect(log).toBeCalled();
  });

  it('Response have statusCode 500 and call logger.error', () => {
    const logError = jest.spyOn(customLogger, 'error');
    middleware.use(mockRequest(), mockResponse500() as any, jest.fn());
    customLogger.error('mensaje');
    expect(logError).toBeCalled();
  });

  it('Response have statusCode 400 and call logger.warn', () => {
    const logWarn = jest.spyOn(customLogger, 'warn');
    middleware.use(mockRequest(), mockResponse400() as any, jest.fn());
    customLogger.warn('mensaje');
    expect(logWarn).toBeCalled();
  });

  it('Testing logger when debug and verbose', () => {
    const logDebug = jest.spyOn(customLogger, 'debug');
    const logVerbose = jest.spyOn(customLogger, 'verbose');
    customLogger.debug('mensaje');
    customLogger.verbose('mensaje');
    expect(logDebug).toBeCalled();
    expect(logVerbose).toBeCalled();
  });
});
