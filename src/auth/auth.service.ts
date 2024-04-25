import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn({ username, password }: UserDto) {
    const existingUser = await this.usersService.findOne(username);

    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      access_token: await this.jwtService.signAsync({
        userId: existingUser.id,
      }),

      refresh_token: await this.jwtService.signAsync(
        {
          userId: existingUser.id,
        },
        {
          expiresIn: this.configService.getOrThrow(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    };
  }
  refreshToken({ refresh_token }) {
    const decodedPayload = this.jwtService.verify(refresh_token);
    if (!decodedPayload)
      throw new HttpException('Invalid refresh token', HttpStatus.FORBIDDEN);

    const userId = decodedPayload.userId;

    return {
      access_token: this.jwtService.sign({ userId }),
    };
  }
}
