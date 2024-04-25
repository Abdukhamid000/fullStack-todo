import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return await this.authService.signIn(userDto);
  }

  @Post('refresh')
  refreshAccessToken(@Body() payload: any) {
    return this.authService.refreshToken(payload);
  }
}
