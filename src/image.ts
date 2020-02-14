import { PNG } from 'pngjs';
import { Vector1D } from './vector';

export const IMAGE_WIDTH = 16;
export const IMAGE_HEIGHT = 16;
export const IMAGE_SIZE = IMAGE_WIDTH * IMAGE_HEIGHT;

interface Coordinate {
  x: number;
  y: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}
const WHITE = {
  r: 255,
  g: 255,
  b: 255,
};
const BLACK = {
  r: 0,
  g: 0,
  b: 0,
};
const RED = {
  r: 255,
  g: 0,
  b: 0,
};

interface Padding {
  leftPadding: number;
  rightPadding: number;
  topPadding: number;
  bottomPadding: number;
}

/**
 * Captcha image wrapper.
 * The image is in PNG format.
 *
 * @class
 */
export class CaptchaImage {
  private png: PNG;
  private width: number;
  private height: number;

  /**
   * Load a new image from a buffer.
   *
   * @param {Buffer} buffer
   */
  async load(buffer: Buffer): Promise<void>;

  /**
   * Load a new image from a `PNG` object.
   *
   * @param {PNG} png
   */
  async load(png: PNG): Promise<void>;

  /**
   * Load a new image.
   *
   * @param {Buffer|PNG} d
   */
  async load(d: Buffer | PNG): Promise<void> {
    if (d.constructor === Buffer) {
      this.png = await new Promise((resolve, reject) => {
        new PNG().parse(d as Buffer, (error, data) => {
          if (error) return reject(error);

          resolve(data);
        });
      });
    } else if (d.constructor === PNG) {
      this.png = d as PNG;
    }

    this.width = this.png.width;
    this.height = this.png.height;
  }

  /**
   * Set some of the black pixels to red.
   */
  deinterfere(): void {
    const locations: Coordinate[] = [];

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (
          this.isColor({ x, y }, BLACK) &&
          this.nColorSurrounded({ x, y }, RED) >= 2
        ) {
          locations.push({ x, y });
        }
      }
    }

    for (const location of locations) {
      this.setColor(location, RED);
    }
  }

  /**
   * Set all the pixels to white or black.
   */
  binarize(): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.isColor({ x, y }, RED)) {
          this.setColor({ x, y }, BLACK);
        } else {
          this.setColor({ x, y }, WHITE);
        }
      }
    }
  }

  /**
   * Pad the image with specific paddings.
   *
   * @param {Padding} padding
   * @param {number} padding.leftPadding
   * @param {number} padding.rightPadding
   * @param {number} padding.topPadding
   * @param {number} padding.bottomPadding
   */
  async pad({
    leftPadding,
    rightPadding,
    topPadding,
    bottomPadding,
  }: Padding): Promise<void> {
    const image = new CaptchaImage();
    const png = new PNG({
      width: this.width + leftPadding + rightPadding,
      height: this.height + topPadding + bottomPadding,
    });
    await image.load(png);

    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        image.fillAlpha({ x, y });
        image.setColor({ x, y }, WHITE);
      }
    }

    this.png.bitblt(
      png,
      0,
      0,
      this.width,
      this.height,
      leftPadding,
      topPadding,
    );

    await this.load(png);
  }

  /**
   * Standardize the image's width and height.
   */
  async normalize(): Promise<void> {
    if (this.width === IMAGE_WIDTH && this.height === IMAGE_HEIGHT) {
      return;
    }

    const normalized = new CaptchaImage();
    await normalized.load(
      new PNG({
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      }),
    );

    const widthInterval =
      this.width < IMAGE_WIDTH
        ? this.width / IMAGE_WIDTH
        : Math.floor(this.width / IMAGE_WIDTH);
    const heightInterval =
      this.height < IMAGE_HEIGHT
        ? this.height / IMAGE_HEIGHT
        : Math.floor(this.height / IMAGE_HEIGHT);

    for (let x = 0; x < normalized.width; x++) {
      for (let y = 0; y < normalized.height; y++) {
        this.png.bitblt(
          normalized.png,
          Math.floor(x * widthInterval),
          Math.floor(y * heightInterval),
          1,
          1,
          x,
          y,
        );
      }
    }

    await this.load(normalized.png);
  }

  /**
   * Convert the image into a 1-dimension vector.
   *
   * @return {Vector1D}
   */
  vectorize(): Vector1D {
    const vector = [];

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.isColor({ x, y }, BLACK)) {
          vector.push(1);
        } else {
          vector.push(0);
        }
      }
    }

    return vector;
  }

  /**
   * Split the image into images.
   *
   * @param {number} numImages The number of images wanted.
   *
   * @return {Promise<CaptchaImage[]>}
   * @throws {Error}
   */
  async split(numImages: number): Promise<CaptchaImage[]> {
    let border = 0;
    const images: CaptchaImage[] = [];

    for (;;) {
      const leftBorder = this.getLeftBorder(border);
      if (leftBorder === -1) break;
      const rightBorder = this.getRightBorder(leftBorder);
      const topBorder = this.getTopBorder(leftBorder, rightBorder);
      const bottomBorder = this.getBottomBorder(leftBorder, rightBorder);
      const width = rightBorder - leftBorder + 1;
      const height = bottomBorder - topBorder + 1;

      border = rightBorder + 1;

      const png = new PNG({
        width,
        height,
      });

      this.png.bitblt(png, leftBorder, topBorder, width, height, 0, 0);

      const image = new CaptchaImage();
      await image.load(png);

      images.push(image);

      if (border === this.width) break;
    }

    if (images.length !== numImages) {
      throw new Error('Unable to split characters.');
    }

    return images;
  }

  /**
   * Locate the pixel by its coordinate.
   *
   * @param {Coordinate} coordinate
   *
   * @return {number}
   */
  private locate(coordinate: Coordinate): number {
    if (coordinate.x < 0 || coordinate.y < 0) {
      throw new Error('The coordinate is less than 0.');
    }

    return (this.width * coordinate.y + coordinate.x) << 2;
  }

  /**
   * Fill the pixel's alpha into 255.
   *
   * @param {Coordinate} coordinate
   */
  private fillAlpha(coordinate: Coordinate): void {
    const index = this.locate(coordinate);

    this.png.data[index + 3] = 255;
  }

  /**
   * Decide whether the pixel's color is the specific color.
   *
   * @param {Coordinate} coordinate
   * @param {Color} color
   *
   * @return {boolean}
   */
  private isColor(coordinate: Coordinate, color: Color): boolean {
    const index = this.locate(coordinate);

    return (
      this.png.data[index] === color.r &&
      this.png.data[index + 1] === color.g &&
      this.png.data[index + 2] === color.b
    );
  }

  /**
   * Set the pixel's color.
   *
   * @param {Coordinate} coordinate
   * @param {Color} color
   */
  private setColor(coordinate: Coordinate, color: Color): void {
    const index = this.locate(coordinate);

    this.png.data[index] = color.r;
    this.png.data[index + 1] = color.g;
    this.png.data[index + 2] = color.b;
  }

  /**
   * Decide whether there exists a pixel in the specific color on the column.
   *
   * @param {number} column
   * @param {Color} color
   * @param {number} topBorder
   * @param {number} bottomBorder
   *
   * @return {boolean}
   */
  private existsColorOnColumn(
    column: number,
    color: Color,
    topBorder: number,
    bottomBorder: number,
  ): boolean {
    for (let y = topBorder; y <= bottomBorder; y++) {
      if (this.isColor({ x: column, y }, color)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Decide whether there exists a pixel in the specific color on the row.
   *
   * @param {number} row
   * @param {Color} color
   * @param {number} leftBorder
   * @param {number} rightBorder
   *
   * @return {boolean}
   */
  private existsColorOnRow(
    row: number,
    color: Color,
    leftBorder: number,
    rightBorder: number,
  ): boolean {
    for (let x = leftBorder; x <= rightBorder; x++) {
      if (this.isColor({ x, y: row }, color)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Calculate the left border of a character.
   *
   * @param {number} border The beginning border to be calculated.
   *
   * @return {number}
   */
  private getLeftBorder(border: number): number {
    for (let x = border; x < this.width; x++) {
      if (this.existsColorOnColumn(x, RED, 0, this.height - 1)) {
        return x;
      }
    }

    return -1;
  }

  /**
   * Calculate the right border of a character.
   *
   * @param {number} leftBorder
   *
   * @return {number}
   */
  private getRightBorder(leftBorder: number): number {
    for (let x = leftBorder + 1; x < this.width; x++) {
      if (this.existsColorOnColumn(x, RED, 0, this.height - 1)) continue;

      return x - 1;
    }

    return this.width - 1;
  }

  /**
   * Calculate the top border of a character.
   *
   * @param {number} leftBorder
   * @param {number} rightBorder
   *
   * @return {number}
   */
  private getTopBorder(leftBorder: number, rightBorder: number): number {
    for (let y = 0; y < this.height; y++) {
      if (this.existsColorOnRow(y, RED, leftBorder, rightBorder)) {
        return y;
      }
    }

    return -1;
  }

  /**
   * Calculate the bottom border of a character.
   *
   * @param {number} leftBorder
   * @param {number} rightBorder
   *
   * @return {number}
   */
  private getBottomBorder(leftBorder: number, rightBorder: number): number {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.existsColorOnRow(y, RED, leftBorder, rightBorder)) {
        return y;
      }
    }

    return -1;
  }

  /**
   *
   * @param {number} x
   *
   * @return {boolean}
   */
  private atLeftEdge({ x }: Coordinate): boolean {
    return x === 0;
  }
  /**
   *
   * @param {number} x
   *
   * @return {boolean}
   */
  private atRightEdge({ x }: Coordinate): boolean {
    return x === this.width - 1;
  }
  /**
   *
   * @param {number} y
   *
   * @return {boolean}
   */
  private atTopEdge({ y }: Coordinate): boolean {
    return y === 0;
  }
  /**
   *
   * @param {number} y
   *
   * @return {boolean}
   */
  private atBottomEdge({ y }: Coordinate): boolean {
    return y === this.height - 1;
  }

  /**
   * Calculate the number of pixels in the specific color surrounded by the pixel.
   *
   * @param {Coordinate} coordinate
   * @param {number} coordinate.x
   * @param {number} coordinate.y
   * @param {Color} color
   *
   * @return {number}
   */
  private nColorSurrounded({ x, y }: Coordinate, color: Color): number {
    let n = 0;

    if (!this.atLeftEdge({ x, y })) {
      n += this.isColor({ x: x - 1, y }, color) ? 1 : 0; // left
    }
    if (!this.atRightEdge({ x, y })) {
      n += this.isColor({ x: x + 1, y }, color) ? 1 : 0; // right
    }
    if (!this.atTopEdge({ x, y })) {
      n += this.isColor({ x, y: y - 1 }, color) ? 1 : 0; // top
    }
    if (!this.atBottomEdge({ x, y })) {
      n += this.isColor({ x, y: y + 1 }, color) ? 1 : 0; // bottom
    }
    if (
      !this.atLeftEdge({ x, y }) &&
      !this.atTopEdge({ x, y }) &&
      !this.atBottomEdge({ x, y })
    ) {
      n +=
        this.isColor({ x: x - 1, y: y - 1 }, color) &&
        this.isColor({ x: x - 1, y: y + 1 }, color)
          ? 1
          : 0; // left & top + left & bottom
    }
    if (
      !this.atRightEdge({ x, y }) &&
      !this.atTopEdge({ x, y }) &&
      !this.atBottomEdge({ x, y })
    ) {
      n +=
        this.isColor({ x: x + 1, y: y - 1 }, color) &&
        this.isColor({ x: x + 1, y: y + 1 }, color)
          ? 1
          : 0; // right & top + right & bottom
    }

    return n;
  }
}
