import { GetUserNameByIdPipe } from './get-user-name-by-id.pipe';

describe('GetUserNameByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new GetUserNameByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
