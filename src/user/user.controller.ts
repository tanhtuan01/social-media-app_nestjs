import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('create')
    createUser(@Body() userDTO: UserDTO) {
        return this.userService.createUser(userDTO)
    }


    @Get('info')
    getUserInfo(@Req() req: Request) {
        const userId = req.userId;
        return this.userService.getUserInfo(userId)
    }

    @Put('update')
    updateUserInfo(@Body() userDTO: UserDTO, @Req() req: Request) {
        const userId = req.userId;
        return this.userService.updateUser(userId, userDTO)
    }

    @Post('updatepassword')
    async changePassword(@Body() password: { password: string }, @Req() req: Request) {
        const userId = req.userId;
        console.log(password)
        return this.userService.updateUserPassword(userId, password.password)
    }

    @Post('checkpassword')
    async checkPassword(@Body() password: { password: string }, @Req() req: Request) {
        const userId = req.userId;
        console.log(password)

        return await this.userService.checkPassword(userId, password.password);
    }

    // @Put('update/:id')
    // updateUser(@Body() userDTO: UserDTO, @Param('id') userId: string) {
    //     return this.userService.updateUser(userId, userDTO)
    // }

    @Get('list')
    listUers() {
        return this.userService.listUsers()

    }

    @Get('get/:emailOrPhone/:password')
    getUser(@Param('emailOrPhone') emailOrPhone: string, @Param('password') password: string) {
        return this.userService.getUser(emailOrPhone, password)
    }

}
