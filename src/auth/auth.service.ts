import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './types/types';
import { ConfirmationCodeService } from './auth.code.servise';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly сonfirmationCodeService: ConfirmationCodeService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passIsMatch = await argon2.verify(user.password, password);
    if (!passIsMatch) throw new UnauthorizedException('Пароль некорректный');
    if (user && passIsMatch) return user;
    return null;
  }

  async login(user: IUser) {
    const { id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
