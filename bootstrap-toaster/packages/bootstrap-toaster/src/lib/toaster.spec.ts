import { bootstrapToaster } from './toaster';

describe('bootstrapToaster', () => {
  it('should work', () => {
    expect(bootstrapToaster()).toEqual('bootstrap-toaster');
  });
});
