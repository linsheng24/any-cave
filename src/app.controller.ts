import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/profile')
  async profile(@Request() req) {
    return req.user;
  }
}
