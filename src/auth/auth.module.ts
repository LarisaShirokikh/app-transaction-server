import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfirmationCodeService } from './auth.code.servise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationCode } from 'src/user/entities/confirmation-code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfirmationCode]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfirmationCodeService],
})
export class AuthModule {}
