import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    description: string;

}