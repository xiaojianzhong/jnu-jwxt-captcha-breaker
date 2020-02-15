import { CaptchaRecognitionModel } from './model';
import { CaptchaData } from './data';
import { join } from 'path';
import logger from './logger';
import { CaptchaImage } from './image';
import { index2Label } from './label';

interface InitializationOption {
  loadModel?: boolean;
  trainModel?: boolean;
  saveModel?: boolean;
  dataDir?: string;
  modelDir?: string;
}

/**
 * Captcha breaker.
 *
 * @class
 */
export class CaptchaBreaker {
  private readonly model: CaptchaRecognitionModel;
  private readonly data: CaptchaData;

  /**
   * @constructor
   */
  constructor() {
    this.model = new CaptchaRecognitionModel();
    this.data = new CaptchaData();
  }

  /**
   * Initialize both the data and the model.
   *
   * @param {InitializationOption} option
   * @param {boolean} option.loadModel Whether to load the model from the file system.
   * @param {boolean} option.trainModel Whether to train the model with the data.
   * @param {boolean} option.saveModel Whether to save the model to the file system.
   * @param {string} option.dataDir
   * @param {string} option.modelDir
   */
  async init(
    {
      loadModel = true,
      trainModel = false,
      saveModel = false,
      dataDir = join(__dirname, '..', 'data'),
      modelDir = join(__dirname, '..', 'model'),
    }: InitializationOption = {
      loadModel: true,
    },
  ): Promise<void> {
    if (loadModel) {
      logger.debug('begin loading model');
      await this.model.load(modelDir);
      logger.debug('finish loading model');
    }

    if (trainModel) {
      logger.debug('begin loading data');
      await this.data.load(dataDir);
      logger.debug('finish loading data');

      logger.debug('begin training model');
      await this.model.train(this.data);
      logger.debug('finish training model');
    }

    if (saveModel) {
      logger.debug('begin saving model');
      await this.model.save(modelDir);
      logger.debug('finish saving model');
    }
  }

  /**
   * Parse a 4-character string from a captcha image's buffer.
   *
   * @param {Buffer} buffer
   *
   * @return {Promise<string>}
   */
  async parse(buffer: Buffer): Promise<string> {
    const image = new CaptchaImage();
    await image.load(buffer);

    const images = await image.split(4);
    const labels: string[] = [];
    for (const image of images) {
      image.deinterfere();
      image.binarize();
      await image.pad({
        leftPadding: 3,
        rightPadding: 3,
        topPadding: 2,
        bottomPadding: 2,
      });
      await image.normalize();

      const x = image.vectorize();
      const y = this.model.predict(x);
      const label = index2Label(y);
      labels.push(label);
    }

    return labels.join('');
  }
}
