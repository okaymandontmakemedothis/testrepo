import { ColorError } from './color-error';

describe('ColorError', () => {
  it('should create an instance', () => {
    expect(new ColorError('test')).toBeTruthy();
  });
});
