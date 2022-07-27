import { PhoneMaskedPipe } from './phone-masked.pipe';

describe('PhoneMaskedPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneMaskedPipe();
    expect(pipe).toBeTruthy();
  });
});
