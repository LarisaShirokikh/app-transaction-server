import { NestMiddleware } from '@nestjs/common'

export class CorsMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		res.header('Access-Control-Allow-Origin', 'http://31.129.56.94:3000') // Замените на ваш адрес фронтенда
		res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		)
		next()
	}
}
