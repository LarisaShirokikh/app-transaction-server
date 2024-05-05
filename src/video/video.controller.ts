import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  async create(@UploadedFile() video, @Body() body, @Request() req) {
    console.log('Received video:', video);
    console.log('Received body:', body);
    try {
      const userId = req.user.id;

      console.log('User email:', userId);
      const filename = video.filename;
      const savedVideo = await this.videoService.create(
        userId,
        filename,
        video,
      );

      return {
        success: true,
        data: savedVideo,
        message: 'Video created successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при создании видео: ${error.message}`,
      );
    }
  }

  @Get()
  findAll(@Req() req) {
    return this.videoService.findAll();
  }
}
