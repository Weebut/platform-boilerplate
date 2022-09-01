import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTypeormEntity {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ type: 'uuid', update: false })
  id: string;

  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;
}
