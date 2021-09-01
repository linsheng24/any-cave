import { Injectable } from "@nestjs/common";
import { RegistDto } from "../dtos";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async createUser(registDto: RegistDto) {
    const createUser = new this.userModel(registDto);
    return createUser.save();
  }
}
