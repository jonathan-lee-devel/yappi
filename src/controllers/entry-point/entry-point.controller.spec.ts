import { Test, TestingModule } from '@nestjs/testing';
import { EntryPointController } from './entry-point.controller';

describe('EntryPointController', () => {
  let controller: EntryPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryPointController],
    }).compile();

    controller = module.get<EntryPointController>(EntryPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
