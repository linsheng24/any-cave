import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegistDto } from "../dtos";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { ForbiddenException } from "../exceptions/forbidden.exception";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async createUser(registDto: RegistDto) {
    try {
      const createUser = new this.userModel(registDto);
      await createUser.save();
      return createUser;
    } catch (e) {
      if (e.code === 11000) {
        throw new ForbiddenException('Invalid Account ID');
      } else {
        throw new ForbiddenException('Service Error');
      }
    }
  }
}
