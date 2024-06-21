import { Test, TestingModule } from '@nestjs/testing';
import { BpostController } from './bpost.controller';

describe('BpostController', () => {
  let controller: BpostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpostController],
    }).compile();

    controller = module.get<BpostController>(BpostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
