import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateVideoDto {
	@IsNotEmpty()
	name: string

	@IsString({ message: 'Неверный формат значения фото' })
	@IsOptional()
	video?: File
}
