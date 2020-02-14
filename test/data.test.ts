import { CaptchaData } from '../src/data';
import { Tensor } from '@tensorflow/tfjs-node';

describe('data', () => {
  describe('.CaptchaData', () => {
    let data: CaptchaData;

    beforeEach(() => {
      data = new CaptchaData();
    });

    describe('.constructor', () => {
      it('should construct a CaptchaData object', () => {
        expect(data.constructor).toBe(CaptchaData);
      });
    });

    describe('.tensorize()', () => {
      it("should throw an error when the features' length is NOT equal to the labels' length", () => {
        const features = [
          new Array(256).fill(1),
          new Array(256).fill(2),
          new Array(256).fill(3),
        ];
        const labels = [
          new Array(61).fill(0).concat([1]),
          new Array(61).fill(0).concat([1]),
        ];
        const featureData = { features, labels };

        expect(() => {
          data['tensorize'](featureData);
        }).toThrow("The features and labels aren't in the same length.");
      });
      it('should convert vectors into tensors', () => {
        const features = [
          new Array(256).fill(1),
          new Array(256).fill(2),
          new Array(256).fill(3),
        ];
        const labels = [
          new Array(61).fill(0).concat([1]),
          new Array(61).fill(0).concat([1]),
          new Array(61).fill(0).concat([1]),
        ];
        const featureData = { features, labels };

        const tensorData = data['tensorize'](featureData);

        expect(tensorData).toHaveProperty('xs');
        expect(tensorData.xs.constructor).toBe(Tensor);
        expect(tensorData.xs.shape).toEqual([3, 256]);
        expect(tensorData).toHaveProperty('labels');
        expect(tensorData.labels.constructor).toBe(Tensor);
        expect(tensorData.labels.shape).toEqual([3, 62]);
      });
    });
  });
});
