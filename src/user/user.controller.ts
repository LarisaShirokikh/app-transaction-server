import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	Query
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get('email')
	async getUserByEmail(@Query('email') email: string) {
		const user = await this.userService.findOne(email)
		if (user) {
			// Возвращаем только роль пользователя
			const { isAdmin, isSuperAdmin } = user
			return { isAdmin, isSuperAdmin }
		} else {
			return { error: 'Пользователь не найден' }
		}
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
