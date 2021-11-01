import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { LoginDto, RegistDto } from "./dtos";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiTags('auth')
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiTags('auth')
  @Post('auth/regist')
  async regist(@Body() registDto: RegistDto) {
    await this.authService.regist(registDto);
  }

  @ApiTags('auth')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('auth/profile')
  async profile(@Request() req) {
    const { userId } = req.user;
    return await this.usersService.getProfile(userId);
  }
}
