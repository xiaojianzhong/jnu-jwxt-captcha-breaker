import { CaptchaImage } from '../src/image';
import { PNG, PNGWithMetadata } from 'pngjs';

describe('image', () => {
  describe('.CaptchaImage', () => {
    let image: CaptchaImage;

    let load: jest.SpyInstance;
    let deinterfere: jest.SpyInstance;
    let binarize: jest.SpyInstance;
    let pad: jest.SpyInstance;
    let normalize: jest.SpyInstance;
    let vectorize: jest.SpyInstance;
    let split: jest.SpyInstance;
    let locate: jest.SpyInstance;
    let fillAlpha: jest.SpyInstance;
    let isColor: jest.SpyInstance;
    let setColor: jest.SpyInstance;
    let existsColorOnColumn: jest.SpyInstance;
    let existsColorOnRow: jest.SpyInstance;
    let getLeftBorder: jest.SpyInstance;
    let getRightBorder: jest.SpyInstance;
    let getTopBorder: jest.SpyInstance;
    let getBottomBorder: jest.SpyInstance;
    let atLeftEdge: jest.SpyInstance;
    let atRightEdge: jest.SpyInstance;
    let atTopEdge: jest.SpyInstance;
    let atBottomEdge: jest.SpyInstance;
    let nColorSurrounded: jest.SpyInstance;

    beforeEach(() => {
      image = new CaptchaImage();

      load = jest.spyOn(image, 'load');
      deinterfere = jest.spyOn(image, 'deinterfere');
      binarize = jest.spyOn(image, 'binarize');
      pad = jest.spyOn(image, 'pad');
      normalize = jest.spyOn(image, 'normalize');
      vectorize = jest.spyOn(image, 'vectorize');
      split = jest.spyOn(image, 'split');
      locate = jest.spyOn(image as any, 'locate');
      fillAlpha = jest.spyOn(image as any, 'fillAlpha');
      isColor = jest.spyOn(image as any, 'isColor');
      setColor = jest.spyOn(image as any, 'setColor');
      existsColorOnColumn = jest.spyOn(image as any, 'existsColorOnColumn');
      existsColorOnRow = jest.spyOn(image as any, 'existsColorOnRow');
      getLeftBorder = jest.spyOn(image as any, 'getLeftBorder');
      getRightBorder = jest.spyOn(image as any, 'getRightBorder');
      getTopBorder = jest.spyOn(image as any, 'getTopBorder');
      getBottomBorder = jest.spyOn(image as any, 'getBottomBorder');
      atLeftEdge = jest.spyOn(image as any, 'atLeftEdge');
      atRightEdge = jest.spyOn(image as any, 'atRightEdge');
      atTopEdge = jest.spyOn(image as any, 'atTopEdge');
      atBottomEdge = jest.spyOn(image as any, 'atBottomEdge');
      nColorSurrounded = jest.spyOn(image as any, 'nColorSurrounded');
    });

    afterEach(() => {
      load.mockClear();
      deinterfere.mockClear();
      binarize.mockClear();
      pad.mockClear();
      normalize.mockClear();
      vectorize.mockClear();
      split.mockClear();
      locate.mockClear();
      fillAlpha.mockClear();
      isColor.mockClear();
      setColor.mockClear();
      existsColorOnColumn.mockClear();
      existsColorOnRow.mockClear();
      getLeftBorder.mockClear();
      getRightBorder.mockClear();
      getTopBorder.mockClear();
      getBottomBorder.mockClear();
      atLeftEdge.mockClear();
      atRightEdge.mockClear();
      atTopEdge.mockClear();
      atBottomEdge.mockClear();
      nColorSurrounded.mockClear();
    });

    describe('.constructor', () => {
      it('should construct a CaptchaImage object', () => {
        expect(image.constructor).toBe(CaptchaImage);
      });
    });

    describe('.load()', () => {
      it('should load from a buffer', () => {
        const png = { width: 1, height: 2 } as PNGWithMetadata;
        const read = jest.spyOn(PNG.sync, 'read').mockReturnValue(png);
        const pixels = [1, 2];
        const buffer = Buffer.from(pixels);

        image.load(buffer);

        expect(read).toBeCalledTimes(1);
        expect(image['width']).toBe(1);
        expect(image['height']).toBe(2);
        expect(image['png']).toBe(png);

        read.mockClear();
      });
      it('should load from a PNG object', () => {
        const png = new PNG({ width: 1, height: 2 });

        image.load(png);

        expect(image['width']).toBe(1);
        expect(image['height']).toBe(2);
        expect(image['png']).toBe(png);
      });
    });

    describe('.deinterfere()', () => {
      it('should set the pixel to red when its color is black and the number of red pixels surrounded by it is 2', () => {
        isColor.mockReturnValue(true);
        nColorSurrounded.mockReturnValue(2);
        setColor.mockImplementation(() => undefined);
        image['width'] = 2;
        image['height'] = 2;

        image.deinterfere();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
        ]);
        expect(nColorSurrounded).toBeCalledTimes(4);
        expect(nColorSurrounded.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(setColor).toBeCalledTimes(4);
        expect(setColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
      });
      it('should NOT set the pixel to red when its color is NOT black', () => {
        isColor.mockReturnValue(false);
        setColor.mockImplementation(() => undefined);
        image['width'] = 2;
        image['height'] = 2;

        image.deinterfere();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
        ]);
        expect(nColorSurrounded).toBeCalledTimes(0);
        expect(setColor).toBeCalledTimes(0);
      });
      it('should NOT set the pixel to red when its color is black but the number of red pixels surrounded by it is 0', () => {
        isColor.mockReturnValue(true);
        nColorSurrounded.mockReturnValue(0);
        setColor.mockImplementation(() => undefined);
        image['width'] = 2;
        image['height'] = 2;

        image.deinterfere();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
        ]);
        expect(nColorSurrounded).toBeCalledTimes(4);
        expect(nColorSurrounded.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(setColor).toBeCalledTimes(0);
      });
    });

    describe('.binarize()', () => {
      it('should set the pixel to black when its color is red', () => {
        isColor.mockReturnValue(true);
        setColor.mockImplementation(() => undefined);
        image['width'] = 2;
        image['height'] = 2;

        image.binarize();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(setColor).toBeCalledTimes(4);
        expect(setColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
        ]);
      });
      it('should set the pixel to white when its color is NOT red', () => {
        isColor.mockReturnValue(false);
        setColor.mockImplementation(() => undefined);
        image['width'] = 2;
        image['height'] = 2;

        image.binarize();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(setColor).toBeCalledTimes(4);
        expect(setColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 255, b: 255 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 255, b: 255 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 255, b: 255 },
          ],
          [
            { x: 1, y: 1 },
            { r: 255, g: 255, b: 255 },
          ],
        ]);
      });
    });

    describe('.pad()', () => {
      it('should pad the image to the correct size', () => {
        const png = new PNG({ width: 2, height: 2 });
        image['width'] = 1;
        image['height'] = 1;
        image['png'] = png;

        image.pad({
          leftPadding: 1,
          rightPadding: 1,
          topPadding: 1,
          bottomPadding: 1,
        });

        expect(load).toBeCalledTimes(1);
        expect(image['width']).toBe(3);
        expect(image['height']).toBe(3);
      });
    });

    describe('.normalize()', () => {
      let png: PNG;
      let bitblt: jest.SpyInstance;

      beforeEach(() => {
        png = new PNG();
        bitblt = jest.spyOn(png, 'bitblt').mockImplementation(() => new PNG());
      });

      afterEach(() => {
        bitblt.mockClear();
      });

      it('should do nothing when both the width and height are standard', () => {
        image['width'] = 16;
        image['height'] = 16;
        image['png'] = png;

        image.normalize();

        expect(load).not.toBeCalled();
        expect(bitblt).not.toBeCalled();
      });
      it("should modify the image's size when the width is NOT standard", () => {
        image['width'] = 12;
        image['height'] = 16;
        image['png'] = png;

        image.normalize();

        expect(load).toBeCalledTimes(1);
        expect(bitblt).toBeCalledTimes(256);
        expect(image['width']).toBe(16);
        expect(image['height']).toBe(16);
      });
      it("should modify the image's size when the height is NOT standard", () => {
        image['width'] = 16;
        image['height'] = 12;
        image['png'] = png;

        image.normalize();

        expect(load).toBeCalledTimes(1);
        expect(bitblt).toBeCalledTimes(256);
        expect(image['width']).toBe(16);
        expect(image['height']).toBe(16);
      });
    });

    describe('.vectorize()', () => {
      it('should convert the pixel into `1` when its color is black', () => {
        isColor.mockReturnValue(true);
        const png = new PNG();
        image['width'] = 2;
        image['height'] = 2;
        image['png'] = png;

        const vector = image.vectorize();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
        ]);
        expect(vector).toEqual([1, 1, 1, 1]);
      });
      it('should convert the pixel into `0` when its color is NOT black', () => {
        isColor.mockReturnValue(false);
        const png = new PNG();
        image['width'] = 2;
        image['height'] = 2;
        image['png'] = png;

        const vector = image.vectorize();

        expect(isColor).toBeCalledTimes(4);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 0, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 1 },
            { r: 0, g: 0, b: 0 },
          ],
        ]);
        expect(vector).toEqual([0, 0, 0, 0]);
      });
    });

    describe('.split()', () => {
      it('should split the image into images', async () => {
        const png = new PNG({ width: 4, height: 1 });
        const pixels = [0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0];
        png.data = Buffer.from(pixels);
        image['width'] = 4;
        image['height'] = 1;
        image['png'] = png;

        const images = await image.split(2);

        expect(images).toHaveLength(2);
        expect(images[0]['png'].width).toBe(1);
        expect(images[0]['png'].height).toBe(1);
        expect(Array.from(images[0]['png'].data)).toEqual([255, 0, 0, 0]);
        expect(images[1]['png'].width).toBe(1);
        expect(images[1]['png'].height).toBe(1);
        expect(Array.from(images[1]['png'].data)).toEqual([255, 0, 0, 0]);
      });
      it('should throw an error when the number of images is NOT correct', () => {
        const png = new PNG({ width: 4, height: 1 });
        const pixels = [0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0];
        png.data = Buffer.from(pixels);
        image['width'] = 4;
        image['height'] = 1;
        image['png'] = png;

        expect(image.split(4)).rejects.toThrow('Unable to split characters.');
      });
    });

    describe('.locate()', () => {
      it('should throw an error when the x coordinate is less than 0', () => {
        image['width'] = 2;
        image['height'] = 2;

        expect(() => {
          image['locate']({ x: -1, y: 1 });
        }).toThrow('The coordinate is less than 0.');
      });
      it('should throw an error when the y coordinate is less than 0', () => {
        image['width'] = 2;
        image['height'] = 2;

        expect(() => {
          image['locate']({ x: 1, y: -1 });
        }).toThrow('The coordinate is less than 0.');
      });
      it('should locate the pixel', () => {
        image['width'] = 2;
        image['height'] = 2;

        const location = image['locate']({ x: 1, y: 1 });

        expect(location).toBe(12);
      });
    });

    describe('.fillAlpha()', () => {
      it("should fill the pixel's alpha", () => {
        locate.mockReturnValue(0);
        const png = new PNG({ width: 1, height: 1 });
        const pixels = [0, 0, 0, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        image['fillAlpha']({ x: 0, y: 0 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 0, y: 0 }]]);
        expect(Array.from(png.data)).toEqual([0, 0, 0, 255]);
      });
    });

    describe('.isColor()', () => {
      it('should return true when the color is correct', () => {
        locate.mockReturnValue(0);
        const png = new PNG({ width: 1, height: 1 });
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 1, g: 1, b: 1 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return false when the red channel is NOT correct', () => {
        locate.mockReturnValue(0);
        const png = new PNG({ width: 1, height: 1 });
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 2, g: 1, b: 1 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
      it('should return false when the blue channel is NOT correct', () => {
        locate.mockReturnValue(0);
        const png = new PNG({ width: 1, height: 1 });
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 1, g: 2, b: 1 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
      it('should return false when the green channel is NOT correct', () => {
        locate.mockReturnValue(0);
        const png = new PNG({ width: 1, height: 1 });
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 1, g: 1, b: 2 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
    });

    describe('.setColor()', () => {
      it("should set the pixel's color", () => {
        locate.mockReturnValue(0);
        const png = new PNG({ width: 1, height: 1 });
        const pixels = [0, 0, 0, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        image['setColor']({ x: 1, y: 1 }, { r: 1, g: 1, b: 1 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(Array.from(png.data)).toEqual([1, 1, 1, 0]);
      });
    });

    describe('.existsColorOnColumn()', () => {
      it('should return true when there exists a red pixel on the column', () => {
        isColor.mockReturnValue(true);

        const result = image['existsColorOnColumn'](
          0,
          { r: 255, g: 0, b: 0 },
          0,
          3,
        );

        expect(isColor).toBeCalledTimes(1);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(result).toBe(true);
      });
      it('should return false when there does NOT exists a red pixel on the column', () => {
        isColor.mockReturnValue(false);

        const result = image['existsColorOnColumn'](
          0,
          { r: 255, g: 0, b: 0 },
          0,
          3,
        );

        expect(isColor).toBeCalledTimes(3);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 1 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 0, y: 2 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(result).toBe(false);
      });
    });

    describe('.existsColorOnRow()', () => {
      it('should return true when there exists a red pixel on the row', () => {
        isColor.mockReturnValue(true);

        const result = image['existsColorOnRow'](
          0,
          { r: 255, g: 0, b: 0 },
          0,
          3,
        );

        expect(isColor).toBeCalledTimes(1);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(result).toBe(true);
      });
      it('should return false when there does NOT exists a red pixel on the row', () => {
        isColor.mockReturnValue(false);

        const result = image['existsColorOnRow'](
          0,
          { r: 255, g: 0, b: 0 },
          0,
          3,
        );

        expect(isColor).toBeCalledTimes(3);
        expect(isColor.mock.calls).toEqual([
          [
            { x: 0, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 1, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
          [
            { x: 2, y: 0 },
            { r: 255, g: 0, b: 0 },
          ],
        ]);
        expect(result).toBe(false);
      });
    });

    describe('.getLeftBorder()', () => {
      it('should return the first checked column', () => {
        existsColorOnColumn.mockReturnValue(true);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getLeftBorder'](3);

        expect(existsColorOnColumn).toBeCalledTimes(1);
        expect(existsColorOnColumn.mock.calls).toEqual([
          [3, { r: 255, g: 0, b: 0 }, 0, 10],
        ]);
        expect(result).toBe(3);
      });
      it('should return the last checked column', () => {
        existsColorOnColumn.mockReturnValue(false);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getLeftBorder'](3);

        expect(existsColorOnColumn).toBeCalledTimes(2);
        expect(existsColorOnColumn.mock.calls).toEqual([
          [3, { r: 255, g: 0, b: 0 }, 0, 10],
          [4, { r: 255, g: 0, b: 0 }, 0, 10],
        ]);
        expect(result).toBe(4);
      });
    });
    describe('.getRightBorder()', () => {
      it('should return the last checked column', () => {
        existsColorOnColumn.mockReturnValue(true);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getRightBorder'](2);

        expect(existsColorOnColumn).toBeCalledTimes(2);
        expect(existsColorOnColumn.mock.calls).toEqual([
          [3, { r: 255, g: 0, b: 0 }, 0, 10],
          [4, { r: 255, g: 0, b: 0 }, 0, 10],
        ]);
        expect(result).toBe(4);
      });
      it('should return the first checked column', () => {
        existsColorOnColumn.mockReturnValue(false);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getRightBorder'](3);

        expect(existsColorOnColumn).toBeCalledTimes(1);
        expect(existsColorOnColumn.mock.calls).toEqual([
          [4, { r: 255, g: 0, b: 0 }, 0, 10],
        ]);
        expect(result).toBe(3);
      });
    });
    describe('.getTopBorder()', () => {
      it('should return the first checked column', () => {
        existsColorOnRow.mockReturnValue(true);
        image['height'] = 3;

        const result = image['getTopBorder'](1, 3);

        expect(existsColorOnRow).toBeCalledTimes(1);
        expect(existsColorOnRow.mock.calls).toEqual([
          [0, { r: 255, g: 0, b: 0 }, 1, 3],
        ]);
        expect(result).toBe(0);
      });
      it('should return the last checked column', () => {
        existsColorOnRow.mockReturnValue(false);
        image['height'] = 3;

        const result = image['getTopBorder'](1, 3);

        expect(existsColorOnRow).toBeCalledTimes(3);
        expect(existsColorOnRow.mock.calls).toEqual([
          [0, { r: 255, g: 0, b: 0 }, 1, 3],
          [1, { r: 255, g: 0, b: 0 }, 1, 3],
          [2, { r: 255, g: 0, b: 0 }, 1, 3],
        ]);
        expect(result).toBe(2);
      });
    });
    describe('.getBottomBorder()', () => {
      it('should return the first checked column', () => {
        existsColorOnRow.mockReturnValue(true);
        image['height'] = 3;

        const result = image['getBottomBorder'](1, 3);

        expect(existsColorOnRow).toBeCalledTimes(1);
        expect(existsColorOnRow.mock.calls).toEqual([
          [2, { r: 255, g: 0, b: 0 }, 1, 3],
        ]);
        expect(result).toBe(2);
      });
      it('should return the last checked column', () => {
        existsColorOnRow.mockReturnValue(false);
        image['height'] = 3;

        const result = image['getBottomBorder'](1, 3);

        expect(existsColorOnRow).toBeCalledTimes(3);
        expect(existsColorOnRow.mock.calls).toEqual([
          [2, { r: 255, g: 0, b: 0 }, 1, 3],
          [1, { r: 255, g: 0, b: 0 }, 1, 3],
          [0, { r: 255, g: 0, b: 0 }, 1, 3],
        ]);
        expect(result).toBe(0);
      });
    });

    describe('.atLeftEdge()', () => {
      it('should return true when the x coordinate is 0', () => {
        const result = image['atLeftEdge']({ x: 0, y: 1 });

        expect(result).toBe(true);
      });
      it('should return false when the x coordinate is NOT 0', () => {
        const result = image['atLeftEdge']({ x: 1, y: 1 });

        expect(result).toBe(false);
      });
    });

    describe('.atRightEdge()', () => {
      it("should return true when the x coordinate is equals to the image's width minus 1", () => {
        image['width'] = 2;

        const result = image['atRightEdge']({ x: 1, y: 1 });

        expect(result).toBe(true);
      });
      it("should return false when the x coordinate is NOT equals to the image's width minus 1", () => {
        image['width'] = 2;

        const result = image['atRightEdge']({ x: 0, y: 1 });

        expect(result).toBe(false);
      });
    });

    describe('.atTopEdge()', () => {
      it('should return true when the y coordinate is 0', () => {
        const result = image['atTopEdge']({ x: 0, y: 0 });

        expect(result).toBe(true);
      });
      it('should return false when the y coordinate is NOT 0', () => {
        const result = image['atTopEdge']({ x: 0, y: 1 });

        expect(result).toBe(false);
      });
    });

    describe('.atBottomEdge()', () => {
      it("should return true when the y coordinate is equals to the image's height minus 1", () => {
        image['height'] = 2;

        const result = image['atBottomEdge']({ x: 0, y: 1 });

        expect(result).toBe(true);
      });
      it("should return false when the y coordinate is NOT equals to the image's height minus 1", () => {
        image['height'] = 2;

        const result = image['atBottomEdge']({ x: 0, y: 0 });

        expect(result).toBe(false);
      });
    });

    describe('.nColorSurrounded()', () => {
      it('should return the maximum when all pixels surrounded by the pixel are red', () => {
        atLeftEdge.mockReturnValue(false);
        atRightEdge.mockReturnValue(false);
        atTopEdge.mockReturnValue(false);
        atBottomEdge.mockReturnValue(false);
        isColor.mockReturnValue(true);
        const coordinate = { x: 1, y: 1 };
        const color = { r: 1, g: 1, b: 1 };

        const n = image['nColorSurrounded'](coordinate, color);

        expect(atLeftEdge).toBeCalledTimes(2);
        expect(atLeftEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atRightEdge).toBeCalledTimes(2);
        expect(atRightEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atTopEdge).toBeCalledTimes(3);
        expect(atTopEdge.mock.calls).toEqual([
          [coordinate],
          [coordinate],
          [coordinate],
        ]);
        expect(atBottomEdge).toBeCalledTimes(3);
        expect(atBottomEdge.mock.calls).toEqual([
          [coordinate],
          [coordinate],
          [coordinate],
        ]);
        expect(isColor).toBeCalledTimes(8);
        expect(isColor.mock.calls).toEqual([
          [{ x: 0, y: 1 }, color],
          [{ x: 2, y: 1 }, color],
          [{ x: 1, y: 0 }, color],
          [{ x: 1, y: 2 }, color],
          [{ x: 0, y: 0 }, color],
          [{ x: 0, y: 2 }, color],
          [{ x: 2, y: 0 }, color],
          [{ x: 2, y: 2 }, color],
        ]);
        expect(n).toBe(6);
      });
      it('should return the minimum when all pixels surrounded by the pixel are NOT red', () => {
        atLeftEdge.mockReturnValue(false);
        atRightEdge.mockReturnValue(false);
        atTopEdge.mockReturnValue(false);
        atBottomEdge.mockReturnValue(false);
        isColor.mockReturnValue(false);
        const coordinate = { x: 1, y: 1 };
        const color = { r: 1, g: 1, b: 1 };

        const n = image['nColorSurrounded'](coordinate, color);

        expect(atLeftEdge).toBeCalledTimes(2);
        expect(atLeftEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atRightEdge).toBeCalledTimes(2);
        expect(atRightEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atTopEdge).toBeCalledTimes(3);
        expect(atTopEdge.mock.calls).toEqual([
          [coordinate],
          [coordinate],
          [coordinate],
        ]);
        expect(atBottomEdge).toBeCalledTimes(3);
        expect(atBottomEdge.mock.calls).toEqual([
          [coordinate],
          [coordinate],
          [coordinate],
        ]);
        expect(isColor).toBeCalledTimes(6);
        expect(isColor.mock.calls).toEqual([
          [{ x: 0, y: 1 }, color],
          [{ x: 2, y: 1 }, color],
          [{ x: 1, y: 0 }, color],
          [{ x: 1, y: 2 }, color],
          [{ x: 0, y: 0 }, color],
          [{ x: 2, y: 0 }, color],
        ]);
        expect(n).toBe(0);
      });
      it('should return the minimum when the pixel is always at the edge', () => {
        atLeftEdge.mockReturnValue(true);
        atRightEdge.mockReturnValue(true);
        atTopEdge.mockReturnValue(true);
        atBottomEdge.mockReturnValue(true);
        const coordinate = { x: 1, y: 1 };
        const color = { r: 1, g: 1, b: 1 };

        const n = image['nColorSurrounded'](coordinate, color);

        expect(atLeftEdge).toBeCalledTimes(2);
        expect(atLeftEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atRightEdge).toBeCalledTimes(2);
        expect(atRightEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atTopEdge).toBeCalledTimes(1);
        expect(atTopEdge.mock.calls).toEqual([[coordinate]]);
        expect(atBottomEdge).toBeCalledTimes(1);
        expect(atBottomEdge.mock.calls).toEqual([[coordinate]]);
        expect(isColor).toBeCalledTimes(0);
        expect(n).toBe(0);
      });
    });
  });
});
