import { existsSync } from 'fs';
import { resolve } from 'path';
import { EnvironmentEnum } from '../enum/environment.enum';

export function getEnvPath(): string {
  const env: string | undefined =
    process.env.NODE_ENV || EnvironmentEnum.development;

  const envitomentPath = {
    [EnvironmentEnum.development]: `${__dirname}/../envs/development.env`,
    [EnvironmentEnum.production]: `${__dirname}/../envs/production.env`,
    unknown: `${__dirname}/../envs/.env`,
  };

  let filePath: string = resolve(
    `${envitomentPath[env] || envitomentPath.unknown}`,
  );
  if (!existsSync(filePath)) {
    const fallback: string = resolve(`${__dirname}/../envs/.env`);
    filePath = fallback;
  }

  return filePath;
}
