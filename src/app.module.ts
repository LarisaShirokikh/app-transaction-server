import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from '@nestjs/common'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from './product/product.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { VideoModule } from './video/video.module'
import { ServiceModule } from './service/service.module'
import { ReviewModule } from './review/review.module'
import { ChapterModule } from './chapter/chapter.module'
import { AppController } from './app.controller'
//import { CorsMiddleware } from './middleware/cors.middleware'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USER'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				synchronize: true,
				entities: [__dirname + '/**/*.entity{.js, .ts}']
			}),
			inject: [ConfigService]
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'), // Путь к директории с изображениями
			serveRoot: '/uploads' // URL-адрес, по которому будут доступны изображения
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'doorsPhoto'), // Путь к директории с изображениями дверей
			serveRoot: '/doorsPhoto' // URL-адрес, по которому будут доступны изображения дверей
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'video'), // Путь к директории с изображениями дверей
			serveRoot: '/video' // URL-адрес, по которому будут доступны изображения дверей
		}),
		UserModule,
		CategoryModule,
		AuthModule,
		ProductModule,
		VideoModule,
		ServiceModule,
		ReviewModule,
		ChapterModule
	],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
// export class AppModule implements NestModule {
// 	configure(consumer: MiddlewareConsumer) {
// 		consumer
// 			.apply(CorsMiddleware)
// 			.exclude({ path: 'uploads/*', method: RequestMethod.ALL })
// 			.exclude({ path: 'doorsPhoto/*', method: RequestMethod.ALL })
// 			.exclude({ path: 'video/*', method: RequestMethod.ALL })
// 			.forRoutes('*')
// 	}
// }
