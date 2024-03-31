import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepo.findOneBy({ username });
  }

  async create({ username, password }: UserDto): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;

    try {
      return await this.userRepo.save(user);
    } catch (err) {
      throw new ConflictException('Username is already taken.');
    }
  }
}
