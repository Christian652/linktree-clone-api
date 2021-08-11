import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  private slugify = require('slugify');

  async seed(): Promise<any> {
    try {

      const rawUserpassword = 'usuario';

      const usersalt = await bcrypt.genSalt(10);
      const userpassword = await bcrypt.hash(rawUserpassword, usersalt);

      const rawadminpassword = 'admin';

      const adminsalt = await bcrypt.genSalt(10);
      const adminpassword = await bcrypt.hash(rawadminpassword, adminsalt);

      return await this.userRepository.insertMany([
        {
          name: 'admin user',
          email: 'admin@gmail.com',
          role: Role.Admin,
          password: adminpassword,
          slug: this.slugify('admin user')
        },
        {
          name: 'user user',
          email: 'usuario@gmail.com',
          role: Role.User,
          password: userpassword,
          slug: this.slugify('user user')
        },
      ]);
    } catch (error) { }
  }

  async drop(): Promise<any> {
    try {
      const user = await this.userRepository.find();
      await this.userRepository.remove(user);
    } catch (error) { }
  }
}