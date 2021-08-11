
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
@Entity()
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation_type: string;

  @Column()
  object_type: string;

  @Column({ type: 'simple-json' })
  data: JSON;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}