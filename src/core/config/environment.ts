import * as dotenv from 'dotenv';
import { getEnvPath } from '../../core/common/helper/env.helper';
import { EnvironmentInterface } from '../interfaces/index.interface';
dotenv.config({ path: getEnvPath() });

export const environment: EnvironmentInterface = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10) || 3000,
  BASE64_SECRET: process.env.BASE64_SECRET,
  URI: process.env.URI,
};
