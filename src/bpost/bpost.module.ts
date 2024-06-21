import { Module } from '@nestjs/common';
import { BpostController } from './bpost.controller';
import { BpostService } from './bpost.service';
import { BPost, BPostSchema } from './bpost.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: BPost.name, schema: BPostSchema }])],
  controllers: [BpostController],
  providers: [BpostService],
  exports: [BpostService, MongooseModule.forFeature([{ name: BPost.name, schema: BPostSchema }])]
  // note: Xuất BpostService: Để các module khác có thể sử dụng BpostService khi cần.
  // note: Xuất MongooseModule.forFeature([{ name: BPost.name, schema: BPostSchema }]): Để các module khác có thể inject BPostModel khi cần sử dụng.   
})
export class BpostModule { }
