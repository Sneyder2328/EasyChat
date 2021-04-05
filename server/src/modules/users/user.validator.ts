import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    fullname: string;
}

export class UpdateUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    fullname: string;

    @IsNotEmpty()
    profilePhoto: string;

    @IsNotEmpty()
    bio: string;
}

export class GetUsersDTO {
    @IsNotEmpty()
    query: string;

    @IsNotEmpty()
    isGlobal: boolean;
}