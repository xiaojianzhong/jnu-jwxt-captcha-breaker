import { CaptchaBreaker } from '../src';
import { CaptchaRecognitionModel } from '../src/model';
import { CaptchaData } from '../src/data';

describe('index', () => {
  describe('.CaptchaBreaker', () => {
    let breaker: CaptchaBreaker;

    beforeEach(() => {
      breaker = new CaptchaBreaker();
    });

    describe('.constructor', () => {
      it('should construct a CaptchaBreaker object', () => {
        expect(breaker.constructor).toBe(CaptchaBreaker);
      });
      it('should initialize a CaptchaRecognitionModel object and a CaptchaData object', () => {
        expect(breaker['model'].constructor).toBe(CaptchaRecognitionModel);
        expect(breaker['data'].constructor).toBe(CaptchaData);
      });
    });

    describe('.init()', () => {
      let modelLoad: jest.SpyInstance;
      let dataLoad: jest.SpyInstance;
      let modelTrain: jest.SpyInstance;
      let modelSave: jest.SpyInstance;

      beforeEach(() => {
        modelLoad = jest.spyOn(breaker['model'], 'load').mockImplementation();
        dataLoad = jest.spyOn(breaker['data'], 'load').mockImplementation();
        modelTrain = jest.spyOn(breaker['model'], 'train').mockImplementation();
        modelSave = jest.spyOn(breaker['model'], 'save').mockImplementation();
      });

      afterEach(() => {
        modelLoad.mockClear();
        dataLoad.mockClear();
        modelTrain.mockClear();
        modelSave.mockClear();
      });

      it('should only load the model from the file system by default', async () => {
        await breaker.init();

        expect(modelLoad).toBeCalled();
        expect(modelTrain).not.toBeCalled();
        expect(modelSave).not.toBeCalled();
      });
      it('should load the model from the file system', async () => {
        await breaker.init({ loadModel: true });

        expect(modelLoad).toBeCalled();
      });
      it('should train the model', async () => {
        await breaker.init({ trainModel: true });

        expect(modelTrain).toBeCalled();
      });
      it('should save the model', async () => {
        await breaker.init({ saveModel: true });

        expect(modelSave).toBeCalled();
      });
      it('should load the model from the specific directory', async () => {
        await breaker.init({ loadModel: true, modelDir: '/path/to/the/model' });

        expect(modelLoad).toBeCalledWith('/path/to/the/model');
      });
      it('should save the model to the specific directory', async () => {
        await breaker.init({ saveModel: true, modelDir: '/path/to/the/model' });

        expect(modelSave).toBeCalledWith('/path/to/the/model');
      });
    });
  });
});
