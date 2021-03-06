import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    createUser(@Body() data: UserDTO){
        return this.userService.createUser(data);
    }

    @Post('login')
    loginUser(@Body() data: LoginDTO){
        return this.userService.login(data);
    }
}
