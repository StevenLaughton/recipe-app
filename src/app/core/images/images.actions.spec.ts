import * as fromImages from './images.actions';

describe('loadImagess', () => {
  it('should return an action', () => {
    expect(fromImages.put({ base64String: '' }).type).toBe(
      '[Images] Load Imagess',
    );
  });
});
