import { Injectable, Request } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cave, CaveDocument } from "../schemas/cave.schema";
import { ForbiddenException } from "../exceptions/forbidden.exception";
import { CreateCaveDto } from "../dtos";

@Injectable()
export class CavesService {
  constructor(@InjectModel('Cave') private caveModel: Model<CaveDocument>) {}

  async create(createCaveDto: CreateCaveDto): Promise<Cave | undefined> {
    try {
      const createCave = new this.caveModel(createCaveDto);
      await createCave.save();
      return createCave;
    } catch (e) {
      throw new ForbiddenException("Create Error.");
    }
  }

  async findCavesDetail(caveIds: string[]) {
    return ['hahaha'];
  }
}
