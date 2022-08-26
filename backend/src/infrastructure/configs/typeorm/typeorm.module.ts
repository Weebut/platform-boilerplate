import { EnvironmentConfigModule } from '@infrastructure/configs/environment/environment.module';
import { EnvironmentConfigService } from '@infrastructure/configs/environment/environment.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
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
  } as TypeOrmModuleOptions;
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
