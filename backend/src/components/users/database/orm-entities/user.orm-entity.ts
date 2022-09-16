import { BaseTypeormEntity } from '@libs/structure/infrastructure/database/base-classes/base-typeorm-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoles } from '../../domain/entities/user.type';
import { PortfolioOrmEntity } from './portfolio.orm-entity';

@Entity('user')
export class UserOrmEntity extends BaseTypeormEntity {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @ApiProperty({
    example: 'dev@weebut.com',
    description: 'email',
  })
  @MaxLength(320)
  @IsEmail()
  @Column({ type: 'varchar', nullable: false, length: 320, unique: true })
  email: string;

  @ApiProperty({
    example: 'weeeee',
    description: 'nickname',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  @Column({ type: 'varchar', nullable: false, length: 32 })
  nickname: string;

  @ApiProperty({
    example: 'wee',
    description: 'familyName',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(1)
  @Column({ type: 'varchar', nullable: false, length: 32 })
  familyName: string;

  @ApiProperty({
    example: 'butt',
    description: 'givenName',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(1)
  @Column({ type: 'varchar', nullable: false, length: 32 })
  givenName: string;

  @ApiProperty({
    example: 'captain',
    description: 'role',
  })
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.GUEST })
  role: UserRoles;

  @OneToMany(() => PortfolioOrmEntity, (portfolio) => portfolio.user, {
    cascade: true,
  })
  portfolios: PortfolioOrmEntity[];
}
