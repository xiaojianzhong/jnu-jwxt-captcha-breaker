import { CaptchaRecognitionModel } from '../src/model';
import * as tf from '@tensorflow/tfjs-node';

describe('model', () => {
  describe('.CaptchaRecognitionModel', () => {
    let model: CaptchaRecognitionModel;

    beforeEach(() => {
      model = new CaptchaRecognitionModel();
    });

    describe('.constructor', () => {
      it('should construct a CaptchaRecognitionModel object', () => {
        expect(model.constructor).toBe(CaptchaRecognitionModel);
      });
      it('should define a model for training', () => {
        expect(model['model'].constructor).toBe(tf.Sequential);
      });
    });
  });
});
