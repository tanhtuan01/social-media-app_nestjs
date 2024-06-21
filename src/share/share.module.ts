import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { Share, ShareSchema } from './share.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BpostModule } from 'src/bpost/bpost.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Share.name, schema: ShareSchema }]), BpostModule],
  controllers: [ShareController],
  providers: [ShareService]
})
export class ShareModule { }
