import { Injectable } from '@nestjs/common';
import { RegistDto } from "../dtos";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "../schemas/user.schema";
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(registDto: RegistDto) {
    const createUser = new this.userModel(registDto);
    return createUser.save();
  }
}
