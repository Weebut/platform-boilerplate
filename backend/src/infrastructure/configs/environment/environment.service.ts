import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  get dbHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get dbPort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  get dbUser(): string {
    return this.configService.get<string>('MYSQL_USER');
  }

  get dbPassword(): string {
    return this.configService.get<string>('MYSQL_ROOT_PASSWORD');
  }

  get dbName(): string {
    return this.configService.get<string>('MYSQL_DATABASE');
  }

  get dbSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNC');
  }

  get cmsHost(): string {
    return this.configService.get<string>('CMS_HOST');
  }

  get cmsPort(): number {
    return this.configService.get<number>('CMS_PORT');
  }

  get cmsUser(): string {
    return this.configService.get<string>('CMS_USER');
  }

  get cmsPassword(): string {
    return this.configService.get<string>('MYSQL_ROOT_PASSWORD');
  }

  get cmsName(): string {
    return this.configService.get<string>('CMS_NAME');
  }

  get cmsSync(): boolean {
    return this.configService.get<boolean>('CMS_SYNC');
  }

  get redisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  get redisPort(): number {
    return Number(this.configService.get<number>('REDIS_PORT'));
  }
}
