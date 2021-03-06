import { IsString } from "class-validator";

export class UserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: TRole;
} 

export class LoginDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export interface IUser {
    username: string;
    role: TRole;
}

export type TRole = 'admin' | 'staff';