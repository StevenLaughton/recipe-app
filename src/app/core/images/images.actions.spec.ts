import * as fromImages from './images.actions';

describe('loadImages', () => {
  it('should return an action', () => {
    expect(fromImages.put({ base64String: '' }).type).toBe('[Images] Put');
  });
});
