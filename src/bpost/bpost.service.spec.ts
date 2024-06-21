import { Test, TestingModule } from '@nestjs/testing';
import { BpostService } from './bpost.service';

describe('BpostService', () => {
  let service: BpostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpostService],
    }).compile();

    service = module.get<BpostService>(BpostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
