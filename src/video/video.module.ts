import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Video } from './entities/video.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, User]),
    MulterModule.register({
      dest: './video',
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService, UserService, JwtService],
})
export class VideoModule {}
