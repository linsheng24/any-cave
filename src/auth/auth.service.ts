import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegistDto } from "../dtos";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await  this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { username, _id } = user;
      return { username, _id };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async regist(registDto: RegistDto) {
    const user = await this.usersService.createUser(registDto);
  }
}
