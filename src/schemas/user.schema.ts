import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: [] })
  caveIds: string[];

  @Prop({ required: true, default: false })
  checked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
