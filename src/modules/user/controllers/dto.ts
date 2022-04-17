import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
	@ApiProperty()
	name: string;
	@ApiProperty({
		required: false,
		default: false
	})
	hasSubscription: boolean;
}

export class UpdateDto {
	@ApiProperty()
	name: string;
	@ApiProperty({
		required: false,
		default: false
	})
	hasSubscription: boolean;
}

export class BookIdDto {
	@ApiProperty()
	bookId: string
}