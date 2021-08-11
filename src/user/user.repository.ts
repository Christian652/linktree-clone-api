import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private slugify = require('slugify');

  public async saveUser(
    userDto: UserDTO,
  ) {
    const { id, name, email, password, role } = userDto;

    const user = new User();
    user.id = id ? id : null;
    user.name = name;
    user.email = email;
    user.role = role;
    user.slug = this.slugify(name);

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    return (await user.save());
  }

  public async insertMany(values) {
    await this.createQueryBuilder('user')
      .insert()
      .values(values)
      .execute();
  }

  public async truncate() {
    await this.query('SET FOREIGN_KEY_CHECKS = 0;');
    await this.query('TRUNCATE TABLE user');
    await this.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}