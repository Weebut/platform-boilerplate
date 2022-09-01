import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('MYSQL_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('MYSQL_ROOT_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('MYSQL_DATABASE');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNC');
  }

  getCMSHost(): string {
    return this.configService.get<string>('CMS_HOST');
  }

  getCMSPort(): number {
    return this.configService.get<number>('CMS_PORT');
  }

  getCMSUser(): string {
    return this.configService.get<string>('CMS_USER');
  }

  getCMSPassword(): string {
    return this.configService.get<string>('MYSQL_ROOT_PASSWORD');
  }

  getCMSName(): string {
    return this.configService.get<string>('CMS_NAME');
  }

  getCMSSync(): boolean {
    return this.configService.get<boolean>('CMS_SYNC');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getRedisPort(): number {
    return Number(this.configService.get<number>('REDIS_PORT'));
  }
}
