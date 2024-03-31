import { Body, Controller, Post, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: UserDto) {
    await this.usersService.create(userDto);
    return { success: true };
  }
}
