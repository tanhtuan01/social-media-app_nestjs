import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { PasswordModule } from 'src/middleware/password.module';
import { PasswordService } from 'src/middleware/password.service';
import { AuthModule } from 'src/middleware/auth.module';
import { AuthService } from 'src/middleware/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PasswordModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule { }
