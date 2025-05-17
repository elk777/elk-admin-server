import { Test, TestingModule } from '@nestjs/testing';
import { DicController } from './dic.controller';
import { DicService } from './dic.service';

describe('DicController', () => {
  let controller: DicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DicController],
      providers: [DicService],
    }).compile();

    controller = module.get<DicController>(DicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
