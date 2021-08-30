import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { LoginDto } from "./dtos";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiTags('auth')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('auth/profile')
  async profile(@Request() req) {
    return req.user;
  }
}
