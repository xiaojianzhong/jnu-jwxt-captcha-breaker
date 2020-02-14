import { CaptchaRecognitionModel } from '../src/model';

describe('model', () => {
  describe('.CaptchaRecognitionModel', () => {
    let model: CaptchaRecognitionModel;

    beforeEach(() => {
      model = new CaptchaRecognitionModel();
    });

    describe('.constructor', () => {
      it('should construct a CaptchaRecognitionModel', () => {
        expect(model.constructor).toBe(CaptchaRecognitionModel);
      });
    });
  });
});
