import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	email: string

	// @IsNotEmpty()
	// phone: string;

	@MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
	password: string

	@IsNotEmpty()
	name: string
}
