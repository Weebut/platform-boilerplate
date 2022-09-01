import { EnvironmentConfigModule } from '@infrastructure/configs/environment/environment.module';
import { EnvironmentConfigService } from '@infrastructure/configs/environment/environment.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  return [
    {
      name: 'default',
      type: 'mysql',
      host: config.getDatabaseHost(),
      port: config.getDatabasePort(),
      username: 'root',
      password: config.getDatabasePassword(),
      database: config.getDatabaseName(),
      entities: [],
      autoLoadEntities: true,
      logging: ['error', 'migration', 'schema'],
      synchronize: config.getDatabaseSync(),
      migrations: ['src/**/migrations/*.ts'],
      migrationsTableName: 'migrations',
      cli: {
        migrationsDir: 'src/infrastructure/database/migrations',
      },
    },
    {
      name: 'cms',
      type: 'mysql',
      host: config.getCMSHost(),
      port: config.getCMSPort(),
      username: 'root',
      password: config.getCMSPassword(),
      database: config.getCMSName(),
      entities: [],
      autoLoadEntities: true,
      logging: ['error', 'migration', 'schema'],
      synchronize: config.getCMSSync(),
      migrations: ['src/**/migrations/*.ts'],
      migrationsTableName: 'migrations',
      cli: {
        migrationsDir: 'src/infrastructure/database/migrations',
      },
    },
  ] as TypeOrmModuleOptions;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeormConfigModule {}
