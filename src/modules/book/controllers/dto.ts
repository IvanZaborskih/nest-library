import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
	@ApiProperty()
	name: string;
	@ApiProperty({
		required: false,
		default: true
	})
	isFree: boolean;
}

export class UpdateBookDto {
	@ApiProperty()
	name: string;
	@ApiProperty({
		required: false,
		default: true
	})
	isFree: boolean;
}