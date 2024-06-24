import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get('list')
    listUers() {
        return this.userService.listUsers()

    }

    @Get('get/:emailOrPhone/:password')
    getUser(@Param('emailOrPhone') emailOrPhone: string, @Param('password') password: string) {
        return this.userService.getUser(emailOrPhone, password)
    }

}
