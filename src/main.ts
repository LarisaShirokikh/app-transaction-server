import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 4200

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	//app.enableCors()

	app.enableCors({
		origin: [
			'https://dverietalon.ru',
			'https://dverietalon.online',
			'http://двериеталон.рф'
		],
		allowedHeaders:
			'Authorization ,X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true //access-control-allow-credentials:true
	})
	await app.listen(PORT)
	console.log(`Сервер запущен и работает на порту ${PORT}`)
}
bootstrap()
