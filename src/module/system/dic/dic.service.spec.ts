import { Test, TestingModule } from '@nestjs/testing';
import { DicService } from './dic.service';

describe('DicService', () => {
  let service: DicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DicService],
    }).compile();

    service = module.get<DicService>(DicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
