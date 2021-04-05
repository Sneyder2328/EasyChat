import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    fullname: string;
}

export class UpdateUserDTO {

}