import { IsArray, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateGroupsDTO {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    photoURL: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    bio: string;

    @IsArray()
    @IsUUID("all", { each: true })
    members: string[];
}
