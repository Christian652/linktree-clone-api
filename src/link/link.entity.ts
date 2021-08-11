import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: "links" })
export class Link extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  url: string;

  @Column({ length: 255 })
  color: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, user => user.links)
  user: User;  
}