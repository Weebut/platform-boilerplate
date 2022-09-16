import { BaseTypeormEntity } from '@libs/structure/infrastructure/database/base-classes/base-typeorm-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('user-portfolio')
export class PortfolioOrmEntity extends BaseTypeormEntity {
  constructor(props?: PortfolioOrmEntity) {
    super(props);
  }

  @ApiProperty({
    example: 'https://notion.so/Weebut-portfolio',
    description: 'link',
  })
  @Column({ type: 'varchar', nullable: true, length: 256 })
  link: string;

  @ApiProperty({
    example: false,
    description: 'isPublic',
  })
  @Column({ type: 'tinyint', default: false })
  isPublic: boolean;

  @ManyToOne(() => UserOrmEntity, (user) => user.portfolios, {
    onDelete: 'CASCADE',
  })
  user: UserOrmEntity;
}
