import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validateUser(phone: string): Promise<any> {
    const user = await this.userService.findOne(phone);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    // await this.smsService.sendSms(
    //   phone,
    //   `Your verification code is: ${verificationCode}`,
    // );

    await this.сonfirmationCodeService.createConfirmationCode(
      user,
      verificationCode,
    );
  }

  async login(user: IUser) {
    const { id, phone } = user;
    return {
      id,
      phone,
      token: this.jwtService.sign({ id: user.id, phone: user.phone }),
    };
  }
}
