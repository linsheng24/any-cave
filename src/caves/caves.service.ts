import { Injectable, Request } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cave, CaveDocument } from "../schemas/cave.schema";
import { UserDocument } from "../schemas/user.schema";

@Injectable()
export class CavesService {
  constructor(
    @InjectModel('Cave') private caveModel: Model<CaveDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>
  ) {}

  async create(createCaveDate): Promise<Cave | undefined> {
    try {
      const createCave = new this.caveModel(createCaveDate);
      await createCave.save();
      return createCave;
    } catch (e) {
      return null;
    }
  }

  async findCavesDetail(caveIds: string[]) {
    const caves = await this.caveModel.find({ _id: { $in: caveIds }, enable: true });
    const caveList = caves.map(cave => ({
      caveId: cave._id,
      name:cave.name,
      rooms: cave.rooms.map(room => ({
        roomId: room.roomId,
        name: room.name
      }))
    }));
    return caveList;
  }

  async join(caveId: string, userId: string) {
    await this.userModel.update({ _id: userId }, { $push: { caveIds: caveId.toString() } });
  }
}
