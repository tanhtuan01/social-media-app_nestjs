import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { BpostService } from './bpost.service';
import { BPostDTO } from './bpost.dto';
import { BPost } from './bpost.schema';
import { Request } from 'express';

@Controller('post')
export class BpostController {

    constructor(private readonly bpostService: BpostService) { }

    @Post('create')
    createPost(@Body() postDTO: BPostDTO, @Req() req: Request): Promise<BPost> {
        const userId = req.userId;
        return this.bpostService.createPost(userId, postDTO);
    }

    @Get('list')
    async getAllPost(@Req() req: Request): Promise<BPost[]> {
        const userId = req.userId;
        return await this.bpostService.getAllPost(userId);
    }

    @Put('update/:post_id')
    async updatePost(@Param('post_id') postId: string, @Body() postDTO: BPostDTO): Promise<BPost> {
        return await this.bpostService.updatePost(postId, postDTO);
    }

    @Delete('delete/:post_id')
    async deletePost(@Param('post_id') postId: string): Promise<BPost> {
        return await this.bpostService.deletePost(postId);
    }

    @Get('list/other/:user_id')
    async findAllPostNotherUser(@Param('user_id') userId: string): Promise<BPost[]> {
        return await this.bpostService.findAllPostNotherUser(userId);
    }

    @Get('list/user/:user_id')
    async findAllPostOfUser(@Param('user_id') userId: string): Promise<BPost[]> {
        return await this.bpostService.findAllPostOfUser(userId);
    }
}
