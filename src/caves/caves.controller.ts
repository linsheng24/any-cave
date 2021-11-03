import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateCaveDto } from "../dtos";
import { CavesService } from "./caves.service";

@Controller('caves')
export class CavesController {
  constructor(readonly cavesService: CavesService) {}

  @ApiTags('caves')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Request() req, @Body() caveData: CreateCaveDto) {
    const ownerId = req.user.userId;
    const createCave = await this.cavesService.create({ ...caveData, ownerId });
    if (createCave) {
      const caveId = createCave._id;
      await this.cavesService.join(caveId, ownerId);
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
