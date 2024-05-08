import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 4200

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())

	app.enableCors({
		origin: [
			'*',
			'https://dverietalon.ru',
			'https://dverietalon.online',
			'http://двериеталон.рф',
			'http://localhost:3000',
			'http://localhost:8080',
			'http://localhost:4200',
			'webpack://vue3-ts-doors-store'
		],
		allowedHeaders: ['Content-Type', 'Authorization'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
		exposedHeaders: ['set-cookie'],
		preflightContinue: false,
		optionsSuccessStatus: 204
	})
	await app.listen(PORT)
	console.log(`Сервер запущен и работает на порту ${PORT}`)
}
bootstrap()
