import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto{

    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    description: string;

}