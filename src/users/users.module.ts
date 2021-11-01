import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { CavesModule } from "../caves/caves.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    CavesModule
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
