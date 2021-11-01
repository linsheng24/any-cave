import { Test, TestingModule } from '@nestjs/testing';
import { CavesController } from './caves.controller';

describe('CavesController', () => {
  let controller: CavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CavesController],
    }).compile();

    controller = module.get<CavesController>(CavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
