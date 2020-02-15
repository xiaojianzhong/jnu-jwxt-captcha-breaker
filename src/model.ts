process.env['TF_CPP_MIN_LOG_LEVEL'] = '2';

import * as tf from '@tensorflow/tfjs-node';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './image';
import { NUM_CLASSES } from './label';
import { CaptchaData, TRAINING_DATA_SIZE, TEST_DATA_SIZE } from './data';
import { Vector1D } from './vector';

tf.setBackend('tensorflow');

/**
 * Captcha image recognition model based on deep learning.
 *
 * @class
 */
export class CaptchaRecognitionModel {
  private model: tf.Sequential;

  /**
   * @constructor
   */
  constructor() {
    this.model = tf.sequential();
    this.model.add(
      tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, 1],
        filters: 128,
        strides: 1,
        kernelSize: [3, 3],
        kernelInitializer: 'randomNormal',
        activation: 'relu',
      }),
    );
    this.model.add(
      tf.layers.maxPool2d({
        poolSize: [2, 2],
        strides: [2, 2],
      }),
    );
    this.model.add(
      tf.layers.conv2d({
        filters: 64,
        strides: 1,
        kernelSize: [3, 3],
        kernelInitializer: 'randomNormal',
        activation: 'relu',
      }),
    );
    this.model.add(
      tf.layers.maxPool2d({
        poolSize: [2, 2],
        strides: [2, 2],
      }),
    );
    this.model.add(tf.layers.flatten());
    this.model.add(
      tf.layers.dense({
        units: 256,
        activation: 'relu',
        kernelInitializer: 'randomNormal',
        biasInitializer: 'randomNormal',
      }),
    );
    this.model.add(
      tf.layers.dense({
        units: NUM_CLASSES,
        activation: 'softmax',
        kernelInitializer: 'randomNormal',
        biasInitializer: 'randomNormal',
      }),
    );

    this.model.compile({
      optimizer: tf.train.adam(),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  }

  /**
   * Train the model with the training data.
   * After training, evaluate the model with the test data.
   *
   * @param {CaptchaData} data
   */
  async train(data: CaptchaData): Promise<void> {
    const { xs: trainingXs, labels: trainingYs } = tf.tidy(() => {
      const trainingData = data.getTrainingData();
      return {
        xs: trainingData.xs.reshape([
          TRAINING_DATA_SIZE,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          1,
        ]),
        labels: trainingData.labels,
      };
    });
    const { xs: testXs, labels: testYs } = tf.tidy(() => {
      const testData = data.getTestData();
      return {
        xs: testData.xs.reshape([TEST_DATA_SIZE, IMAGE_WIDTH, IMAGE_HEIGHT, 1]),
        labels: testData.labels,
      };
    });

    const batchSize = NUM_CLASSES;
    const epochs = 30;

    await this.model.fit(trainingXs, trainingYs, {
      batchSize,
      validationData: [testXs, testYs],
      epochs,
    });
  }

  /**
   * Load the model from a directory.
   *
   * @param {string} dir
   */
  async load(dir: string): Promise<void> {
    this.model = (await tf.loadLayersModel(
      `file://${dir}/model.json`,
    )) as tf.Sequential;
  }

  /**
   * Save the model to a directory.
   *
   * @param {string} dir
   */
  async save(dir: string): Promise<void> {
    await this.model.save(`file://${dir}`);
  }

  /**
   * Predict a index by a vector.
   *
   * @param {Vector1D} x
   *
   * @return {number}
   */
  predict(x: Vector1D): number {
    const tensor = this.model.predict(
      tf.tensor4d(x, [1, IMAGE_WIDTH, IMAGE_HEIGHT, 1]),
    ) as tf.Tensor2D;
    return tensor.argMax(-1).dataSync()[0];
  }
}
