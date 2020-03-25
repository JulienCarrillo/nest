import { Medicine } from './medicine.entity';

describe('Medicine.Entity', () => {
  it('should be defined', () => {
    expect(new Medicine()).toBeDefined();
  });
});
