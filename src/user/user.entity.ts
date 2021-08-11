
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Link } from 'src/link/link.entity';


@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column({unique: true})
  slug: string;

  @Column()
  // @Exclude({ toPlainOnly: true })
  password: string;
  
  @OneToMany(() => Link, link => link.user)
  links: Link[];

  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}