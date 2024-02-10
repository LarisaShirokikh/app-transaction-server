import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(userId: number, filename: string, video: File): Promise<Video> {
    console.log('Creating video:', { userId, filename });
    const newVideo = this.videoRepository.create({
      //@ts-ignore
      userId,
      filename,
      video: [`/video/${filename}`],
    });

    console.log('New video entity:', newVideo);
    try {
      const savedVideo = await this.videoRepository.save(newVideo);
      console.log('Saved video entity:', savedVideo);
      //@ts-ignore
      return savedVideo;
    } catch (error) {
      console.error('Error saving video entity:', error);
    }
  }

  async findAll() {
    const videos = await this.videoRepository.find();
    return videos;
  }
}
