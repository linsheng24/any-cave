import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from './events/events.module';
import { CavesController } from './caves/caves.controller';
import { CavesModule } from './caves/caves.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo'),
    AuthModule,
    UsersModule,
    EventsModule,
    CavesModule
  ],
  controllers: [AppController, CavesController],
  providers: [AppService],
})
export class AppModule {}
