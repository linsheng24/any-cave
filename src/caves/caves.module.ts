import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { Cave, CaveSchema } from "../schemas/cave.schema";
import { CavesService } from './caves.service';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Cave.name, schema: CaveSchema }
    ])
  ],
  providers: [CavesService],
  exports: [CavesService],
})
export class CavesModule {}
