import { Module } from '@nestjs/common';
import { ServicesController } from './service.controller';
import { ServicesService } from './service.service';
import { Service } from './service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServiceModule {}
