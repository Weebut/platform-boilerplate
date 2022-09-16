import { EnvironmentConfigModule } from '@infrastructure/configs/environment/environment.module';
import { EnvironmentConfigService } from '@infrastructure/configs/environment/environment.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDefaultTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: config.dbHost,
    port: config.dbPort,
    username: 'root',
    password: config.dbPassword,
    database: config.dbName,
    entities: [],
    autoLoadEntities: true,
    logging: ['error', 'migration', 'schema'],
    synchronize: config.dbSync,
    migrations: ['src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: 'src/infrastructure/database/migrations',
    },
  } as TypeOrmModuleOptions;
};
export const getCmsTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: config.cmsHost,
    port: config.cmsPort,
    username: 'root',
    password: config.cmsPassword,
    database: config.cmsName,
    entities: [],
    autoLoadEntities: true,
    logging: ['error', 'migration', 'schema'],
    synchronize: config.cmsSync,
    migrations: ['src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: 'src/infrastructure/database/migrations',
    },
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getDefaultTypeOrmModuleOptions,
    }),
    TypeOrmModule.forRootAsync({
      name: 'cms',
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getCmsTypeOrmModuleOptions,
    }),
  ],
})
export class TypeormConfigModule {}
