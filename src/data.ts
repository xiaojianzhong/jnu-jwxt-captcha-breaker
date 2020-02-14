import { NUM_CLASSES } from './label';
import { Vector2D } from './vector';
import { Tensor2D, tensor2d } from '@tensorflow/tfjs-node';
import { join } from 'path';
import { readFileSync } from 'fs';
import { CaptchaImage, IMAGE_SIZE } from './image';
import { index2Vector } from './label';

const NUM_IMAGES_PER_CLASS = 100;
const DATA_SIZE = NUM_CLASSES * NUM_IMAGES_PER_CLASS;
const TRAINING_TEST_RATIO = 9 / 10;
export const TRAINING_DATA_SIZE = Math.floor(DATA_SIZE * TRAINING_TEST_RATIO);
export const TEST_DATA_SIZE = DATA_SIZE - TRAINING_DATA_SIZE;

interface VectorData {
  features: Vector2D;
  labels: Vector2D;
}

interface TensorData {
  xs: Tensor2D;
  labels: Tensor2D;
}

/**
 * Captcha data loader.
 * The data includes images and corresponding labels.
 *
 * @class
 */
export class CaptchaData {
  private features: Vector2D = [];
  private labels: Vector2D = [];

  /**
   * Load data from a directory.
   *
   * @param {string} dir
   */
  async load(dir: string): Promise<void> {
    for (let i = 1; i <= NUM_IMAGES_PER_CLASS; i++) {
      for (let j = 1; j <= NUM_CLASSES; j++) {
        const image = new CaptchaImage();

        const path = join(dir, `${j}`, `${i}.png`);
        const buffer = readFileSync(path);
        await image.load(buffer);

        await image.normalize();
        const feature = image.vectorize();
        this.features.push(feature);

        const label = index2Vector(j - 1);
        this.labels.push(label);
      }
    }
  }

  /**
   * Get the training data.
   *
   * @return {TensorData}
   */
  getTrainingData(): TensorData {
    return this.tensorize({
      features: this.features.slice(0, TRAINING_DATA_SIZE),
      labels: this.labels.slice(0, TRAINING_DATA_SIZE),
    });
  }

  /**
   * Get the test data.
   *
   * @return {TensorData}
   */
  getTestData(): TensorData {
    return this.tensorize({
      features: this.features.slice(TRAINING_DATA_SIZE),
      labels: this.labels.slice(TRAINING_DATA_SIZE),
    });
  }

  /**
   * Convert the data from vectors to tensors.
   *
   * @param {VectorData} vectorData
   * @param {Vector2D} vectorData.features
   * @param {Vector2D} vectorData.labels
   *
   * @return {TensorData}
   */
  private tensorize({ features, labels }: VectorData): TensorData {
    if (features.length !== labels.length) {
      throw new Error("The features and labels aren't in the same length.");
    }

    return {
      xs: tensor2d(features, [features.length, IMAGE_SIZE]),
      labels: tensor2d(labels, [labels.length, NUM_CLASSES]),
    };
  }
}
