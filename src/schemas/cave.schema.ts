import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CaveDocument = Cave & Document;

@Schema()
export class Cave extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })

  @Prop({ required: true, default: [] })
  rooms: [{
    name: string,
    roomId: string,
    channelId: string,
    enable: boolean
  }];

  @Prop({ required: true, default: true })
  enable: boolean;
}

export const CaveSchema= SchemaFactory.createForClass(Cave);
