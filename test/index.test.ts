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
        modelLoad = jest.spyOn(breaker['model'], 'load');
        dataLoad = jest.spyOn(breaker['data'], 'load');
        modelTrain = jest.spyOn(breaker['model'], 'train');
        modelSave = jest.spyOn(breaker['model'], 'save');
      });

      afterEach(() => {
        modelLoad.mockClear();
        dataLoad.mockClear();
        modelTrain.mockClear();
        modelSave.mockClear();
      });

      it('should load the model from the file system', async () => {
        modelLoad.mockImplementation(async () => undefined);
        dataLoad.mockImplementation(async () => undefined);
        modelTrain.mockImplementation(async () => undefined);
        modelSave.mockImplementation(async () => undefined);

        await breaker.init({ loadModel: true });

        expect(modelLoad).toBeCalled();
      });
      it('should train the model', async () => {
        modelLoad.mockImplementation(() => undefined);
        dataLoad.mockImplementation(() => undefined);
        modelTrain.mockImplementation(() => undefined);
        modelSave.mockImplementation(() => undefined);

        await breaker.init({ trainModel: true });

        expect(modelTrain).toBeCalled();
      });
      it('should save the model', async () => {
        modelLoad.mockImplementation(() => undefined);
        dataLoad.mockImplementation(() => undefined);
        modelTrain.mockImplementation(() => undefined);
        modelSave.mockImplementation(() => undefined);

        await breaker.init({ saveModel: true });

        expect(modelSave).toBeCalled();
      });
      it('should load the model from the specific directory', async () => {
        modelLoad.mockImplementation(() => undefined);
        dataLoad.mockImplementation(() => undefined);
        modelTrain.mockImplementation(() => undefined);
        modelSave.mockImplementation(() => undefined);

        await breaker.init({ loadModel: true, modelDir: '/path/to/the/model' });

        expect(modelLoad).toBeCalledWith('/path/to/the/model');
      });
      it('should save the model to the specific directory', async () => {
        modelLoad.mockImplementation(() => undefined);
        dataLoad.mockImplementation(() => undefined);
        modelTrain.mockImplementation(() => undefined);
        modelSave.mockImplementation(() => undefined);

        await breaker.init({ saveModel: true, modelDir: '/path/to/the/model' });

        expect(modelSave).toBeCalledWith('/path/to/the/model');
      });
    });
  });
});
