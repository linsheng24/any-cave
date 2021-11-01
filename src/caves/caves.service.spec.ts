import { Test, TestingModule } from '@nestjs/testing';
import { CavesService } from './caves.service';

describe('CavesService', () => {
  let service: CavesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CavesService],
    }).compile();

    service = module.get<CavesService>(CavesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
