import { BaseTypeormEntity } from '@libs/structure/infrastructure/database/base-classes/base-typeorm-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('user-portfolio')
export class PortfolioOrmEntity extends BaseTypeormEntity {
  constructor(props?: PortfolioOrmEntity) {
    super(props);
  }

  @Column({ type: 'varchar', nullable: true, length: 256 })
  link: string;

  @Column({ type: 'tinyint', default: false })
  isPublic: boolean;

  @ManyToOne(() => UserOrmEntity, (user) => user.portfolios, {
    onDelete: 'CASCADE',
  })
  user: UserOrmEntity;
}
