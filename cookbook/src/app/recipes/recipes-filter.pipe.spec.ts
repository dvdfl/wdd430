import { RecipesFilterPipe } from './recipes-filter.pipe';

describe('RecipesFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new RecipesFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
