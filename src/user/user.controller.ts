import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('create')
    createUser(@Body() userDTO: UserDTO) {
        return this.userService.createUser(userDTO)
    }

    @Put('update/:id')
    updateUser(@Body() userDTO: UserDTO, @Param('id') userId: string) {
        return this.userService.updateUser(userId, userDTO)
    }


}
