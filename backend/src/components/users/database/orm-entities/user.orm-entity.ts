import { BaseTypeormEntity } from '@libs/structure/infrastructure/database/base-classes/base-typeorm-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoles } from '../../domain/entities/user.type';
import { PortfolioOrmEntity } from './portfolio.orm-entity';

@Entity('user')
export class UserOrmEntity extends BaseTypeormEntity {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Column({ type: 'varchar', nullable: false, length: 320, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  nickname: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  familyName: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  givenName: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.GUEST })
  role: UserRoles;

  @OneToMany(() => PortfolioOrmEntity, (portfolio) => portfolio.user, {
    cascade: true,
  })
  portfolios: PortfolioOrmEntity[];
}
