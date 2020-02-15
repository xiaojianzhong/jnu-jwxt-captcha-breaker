import { CaptchaImage } from '../src/image';
import { PNG } from 'pngjs';

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
    let getColor: jest.SpyInstance;
    let isColor: jest.SpyInstance;
    let isCharacter: jest.SpyInstance;
    let isInterferenceLine: jest.SpyInstance;
    let setColor: jest.SpyInstance;
    let existsCharacterOnColumn: jest.SpyInstance;
    let existsCharacterOnRow: jest.SpyInstance;
    let getLeftBorder: jest.SpyInstance;
    let getRightBorder: jest.SpyInstance;
    let getTopBorder: jest.SpyInstance;
    let getBottomBorder: jest.SpyInstance;
    let atLeftEdge: jest.SpyInstance;
    let atRightEdge: jest.SpyInstance;
    let atTopEdge: jest.SpyInstance;
    let atBottomEdge: jest.SpyInstance;
    let nCharacterSurrounded: jest.SpyInstance;

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
      getColor = jest.spyOn(image as any, 'getColor');
      isColor = jest.spyOn(image as any, 'isColor');
      isCharacter = jest.spyOn(image as any, 'isCharacter');
      isInterferenceLine = jest.spyOn(image as any, 'isInterferenceLine');
      setColor = jest.spyOn(image as any, 'setColor');
      existsCharacterOnColumn = jest.spyOn(
        image as any,
        'existsCharacterOnColumn',
      );
      existsCharacterOnRow = jest.spyOn(image as any, 'existsCharacterOnRow');
      getLeftBorder = jest.spyOn(image as any, 'getLeftBorder');
      getRightBorder = jest.spyOn(image as any, 'getRightBorder');
      getTopBorder = jest.spyOn(image as any, 'getTopBorder');
      getBottomBorder = jest.spyOn(image as any, 'getBottomBorder');
      atLeftEdge = jest.spyOn(image as any, 'atLeftEdge');
      atRightEdge = jest.spyOn(image as any, 'atRightEdge');
      atTopEdge = jest.spyOn(image as any, 'atTopEdge');
      atBottomEdge = jest.spyOn(image as any, 'atBottomEdge');
      nCharacterSurrounded = jest.spyOn(image as any, 'nCharacterSurrounded');
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
      getColor.mockClear();
      isColor.mockClear();
      isCharacter.mockClear();
      isInterferenceLine.mockClear();
      setColor.mockClear();
      existsCharacterOnColumn.mockClear();
      existsCharacterOnRow.mockClear();
      getLeftBorder.mockClear();
      getRightBorder.mockClear();
      getTopBorder.mockClear();
      getBottomBorder.mockClear();
      atLeftEdge.mockClear();
      atRightEdge.mockClear();
      atTopEdge.mockClear();
      atBottomEdge.mockClear();
      nCharacterSurrounded.mockClear();
    });

    afterAll(() => {
      load.mockRestore();
      deinterfere.mockRestore();
      binarize.mockRestore();
      pad.mockRestore();
      normalize.mockRestore();
      vectorize.mockRestore();
      split.mockRestore();
      locate.mockRestore();
      fillAlpha.mockRestore();
      getColor.mockRestore();
      isColor.mockRestore();
      isCharacter.mockRestore();
      isInterferenceLine.mockRestore();
      setColor.mockRestore();
      existsCharacterOnColumn.mockRestore();
      existsCharacterOnRow.mockRestore();
      getLeftBorder.mockRestore();
      getRightBorder.mockRestore();
      getTopBorder.mockRestore();
      getBottomBorder.mockRestore();
      atLeftEdge.mockRestore();
      atRightEdge.mockRestore();
      atTopEdge.mockRestore();
      atBottomEdge.mockRestore();
      nCharacterSurrounded.mockRestore();
    });

    describe('.constructor', () => {
      it('should construct a CaptchaImage object', () => {
        expect(image.constructor).toBe(CaptchaImage);
      });
    });

    describe('.load()', () => {
      it('should load from a PNG object', async () => {
        const png = new PNG({ width: 1, height: 2 });

        await image.load(png);

        expect(image['width']).toBe(1);
        expect(image['height']).toBe(2);
        expect(image['png']).toBe(png);
      });
    });

    describe('.deinterfere()', () => {
      it('should set the pixel to red when it is the interference line and the number of red pixels surrounded by it is 2', () => {
        isInterferenceLine.mockReturnValue(true);
        nCharacterSurrounded.mockReturnValue(2);
        setColor.mockImplementation();
        image['width'] = 2;
        image['height'] = 2;

        image.deinterfere();

        expect(isInterferenceLine).toBeCalledTimes(4);
        expect(isInterferenceLine.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
        ]);
        expect(nCharacterSurrounded).toBeCalledTimes(4);
        expect(nCharacterSurrounded.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
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
      it('should NOT set the pixel to red when it is NOT the interference line', () => {
        isInterferenceLine.mockReturnValue(false);
        setColor.mockImplementation();
        image['width'] = 2;
        image['height'] = 2;

        image.deinterfere();

        expect(isInterferenceLine).toBeCalledTimes(4);
        expect(isInterferenceLine.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
        ]);
        expect(nCharacterSurrounded).toBeCalledTimes(0);
        expect(setColor).toBeCalledTimes(0);
      });
      it('should NOT set the pixel to red when it is the interference line but the number of red pixels surrounded by it is 0', () => {
        isInterferenceLine.mockReturnValue(true);
        nCharacterSurrounded.mockReturnValue(0);
        setColor.mockImplementation();
        image['width'] = 2;
        image['height'] = 2;

        image.deinterfere();

        expect(isInterferenceLine).toBeCalledTimes(4);
        expect(isInterferenceLine.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
        ]);
        expect(nCharacterSurrounded).toBeCalledTimes(4);
        expect(nCharacterSurrounded.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
        ]);
        expect(setColor).toBeCalledTimes(0);
      });
    });

    describe('.binarize()', () => {
      it('should set the pixel to black when its color is red', () => {
        isCharacter.mockReturnValue(true);
        setColor.mockImplementation();
        image['width'] = 2;
        image['height'] = 2;

        image.binarize();

        expect(isCharacter).toBeCalledTimes(4);
        expect(isCharacter.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
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
        isCharacter.mockReturnValue(false);
        setColor.mockImplementation();
        image['width'] = 2;
        image['height'] = 2;

        image.binarize();

        expect(isCharacter).toBeCalledTimes(4);
        expect(isCharacter.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 1 }],
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
      it('should pad the image to the correct size', async () => {
        const png = new PNG({ width: 2, height: 2 });
        image['width'] = 1;
        image['height'] = 1;
        image['png'] = png;

        await image.pad({
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

      afterAll(() => {
        bitblt.mockRestore();
      });

      it('should do nothing when both the width and height are standard', async () => {
        image['width'] = 16;
        image['height'] = 16;
        image['png'] = png;

        await image.normalize();

        expect(load).not.toBeCalled();
        expect(bitblt).not.toBeCalled();
      });
      it("should modify the image's size when the width is NOT standard", async () => {
        image['width'] = 12;
        image['height'] = 16;
        image['png'] = png;

        await image.normalize();

        expect(load).toBeCalledTimes(1);
        expect(bitblt).toBeCalledTimes(256);
        expect(image['width']).toBe(16);
        expect(image['height']).toBe(16);
      });
      it("should modify the image's size when the height is NOT standard", async () => {
        image['width'] = 16;
        image['height'] = 12;
        image['png'] = png;

        await image.normalize();

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

    describe('.getColor()', () => {
      it("should get the pixel's color", () => {
        locate.mockReturnValueOnce(0);
        const png = new PNG();
        const pixels = [1, 2, 3, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const color = image['getColor']({ x: 1, y: 1 });

        expect(locate).toBeCalledTimes(1);
        expect(locate.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(color).toEqual({ r: 1, g: 2, b: 3 });
      });
    });

    describe('.isColor()', () => {
      it('should return true when the color is correct', () => {
        getColor.mockReturnValue({ r: 1, g: 1, b: 1 });
        const png = new PNG();
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 1, g: 1, b: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return false when the red channel is NOT correct', () => {
        getColor.mockReturnValue({ r: 1, g: 1, b: 1 });
        const png = new PNG();
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 2, g: 1, b: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
      it('should return false when the blue channel is NOT correct', () => {
        getColor.mockReturnValue({ r: 1, g: 1, b: 1 });
        const png = new PNG();
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 1, g: 2, b: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
      it('should return false when the green channel is NOT correct', () => {
        getColor.mockReturnValue({ r: 1, g: 1, b: 1 });
        const png = new PNG();
        const pixels = [1, 1, 1, 0];
        png.data = Buffer.from(pixels);
        image['png'] = png;

        const result = image['isColor']({ x: 1, y: 1 }, { r: 1, g: 1, b: 2 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
    });

    describe('.isCharacter()', () => {
      it('should return true when the red channel is larger than 240', () => {
        getColor.mockReturnValue({ r: 250, g: 0, b: 0 });

        const result = image['isCharacter']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return true when the red channel is equals to 240', () => {
        getColor.mockReturnValue({ r: 240, g: 0, b: 0 });

        const result = image['isCharacter']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return false when the red channel is less than 240', () => {
        getColor.mockReturnValue({ r: 230, g: 0, b: 0 });

        const result = image['isCharacter']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
    });

    describe('.isInterferenceLine()', () => {
      it('should return false when the red channel is less than 96', () => {
        getColor.mockReturnValue({ r: 90, g: 0, b: 0 });

        const result = image['isInterferenceLine']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(false);
      });
      it('should return true when the red channel is equals to 96', () => {
        getColor.mockReturnValue({ r: 96, g: 0, b: 0 });

        const result = image['isInterferenceLine']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return true when the red channel is between 96 and 144', () => {
        getColor.mockReturnValue({ r: 120, g: 0, b: 0 });

        const result = image['isInterferenceLine']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return true when the red channel is equals to 144', () => {
        getColor.mockReturnValue({ r: 144, g: 0, b: 0 });

        const result = image['isInterferenceLine']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
        expect(result).toBe(true);
      });
      it('should return false when the red channel is larger than 144', () => {
        getColor.mockReturnValue({ r: 160, g: 0, b: 0 });

        const result = image['isInterferenceLine']({ x: 1, y: 1 });

        expect(getColor).toBeCalledTimes(1);
        expect(getColor.mock.calls).toEqual([[{ x: 1, y: 1 }]]);
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

    describe('.existsCharacterOnColumn()', () => {
      it('should return true when there exists a character pixel on the column', () => {
        isCharacter.mockReturnValue(true);

        const result = image['existsCharacterOnColumn'](0, 0, 3);

        expect(isCharacter).toBeCalledTimes(1);
        expect(isCharacter.mock.calls).toEqual([[{ x: 0, y: 0 }]]);
        expect(result).toBe(true);
      });
      it('should return false when there does NOT exists a character pixel on the column', () => {
        isCharacter.mockReturnValue(false);

        const result = image['existsCharacterOnColumn'](0, 0, 3);

        expect(isCharacter).toBeCalledTimes(4);
        expect(isCharacter.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 1 }],
          [{ x: 0, y: 2 }],
          [{ x: 0, y: 3 }],
        ]);
        expect(result).toBe(false);
      });
    });

    describe('.existsCharacterOnRow()', () => {
      it('should return true when there exists a character pixel on the row', () => {
        isCharacter.mockReturnValue(true);

        const result = image['existsCharacterOnRow'](0, 0, 3);

        expect(isCharacter).toBeCalledTimes(1);
        expect(isCharacter.mock.calls).toEqual([[{ x: 0, y: 0 }]]);
        expect(result).toBe(true);
      });
      it('should return false when there does NOT exists a character pixel on the row', () => {
        isCharacter.mockReturnValue(false);

        const result = image['existsCharacterOnRow'](0, 0, 3);

        expect(isCharacter).toBeCalledTimes(4);
        expect(isCharacter.mock.calls).toEqual([
          [{ x: 0, y: 0 }],
          [{ x: 1, y: 0 }],
          [{ x: 2, y: 0 }],
          [{ x: 3, y: 0 }],
        ]);
        expect(result).toBe(false);
      });
    });

    describe('.getLeftBorder()', () => {
      it('should return the first checked column', () => {
        existsCharacterOnColumn.mockReturnValue(true);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getLeftBorder'](3);

        expect(existsCharacterOnColumn).toBeCalledTimes(1);
        expect(existsCharacterOnColumn.mock.calls).toEqual([[3, 0, 9]]);
        expect(result).toBe(3);
      });
      it('should return -1', () => {
        existsCharacterOnColumn.mockReturnValue(false);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getLeftBorder'](3);

        expect(existsCharacterOnColumn).toBeCalledTimes(2);
        expect(existsCharacterOnColumn.mock.calls).toEqual([
          [3, 0, 9],
          [4, 0, 9],
        ]);
        expect(result).toBe(-1);
      });
    });
    describe('.getRightBorder()', () => {
      it('should return the last checked column', () => {
        existsCharacterOnColumn.mockReturnValue(true);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getRightBorder'](2);

        expect(existsCharacterOnColumn).toBeCalledTimes(2);
        expect(existsCharacterOnColumn.mock.calls).toEqual([
          [3, 0, 9],
          [4, 0, 9],
        ]);
        expect(result).toBe(4);
      });
      it('should return the first checked column', () => {
        existsCharacterOnColumn.mockReturnValue(false);
        image['width'] = 5;
        image['height'] = 10;

        const result = image['getRightBorder'](3);

        expect(existsCharacterOnColumn).toBeCalledTimes(1);
        expect(existsCharacterOnColumn.mock.calls).toEqual([[4, 0, 9]]);
        expect(result).toBe(3);
      });
    });
    describe('.getTopBorder()', () => {
      it('should return the first checked column', () => {
        existsCharacterOnRow.mockReturnValue(true);
        image['height'] = 3;

        const result = image['getTopBorder'](1, 3);

        expect(existsCharacterOnRow).toBeCalledTimes(1);
        expect(existsCharacterOnRow.mock.calls).toEqual([[0, 1, 3]]);
        expect(result).toBe(0);
      });
      it('should return -1', () => {
        existsCharacterOnRow.mockReturnValue(false);
        image['height'] = 3;

        const result = image['getTopBorder'](1, 3);

        expect(existsCharacterOnRow).toBeCalledTimes(3);
        expect(existsCharacterOnRow.mock.calls).toEqual([
          [0, 1, 3],
          [1, 1, 3],
          [2, 1, 3],
        ]);
        expect(result).toBe(-1);
      });
    });
    describe('.getBottomBorder()', () => {
      it('should return the first checked column', () => {
        existsCharacterOnRow.mockReturnValue(true);
        image['height'] = 3;

        const result = image['getBottomBorder'](1, 3);

        expect(existsCharacterOnRow).toBeCalledTimes(1);
        expect(existsCharacterOnRow.mock.calls).toEqual([[2, 1, 3]]);
        expect(result).toBe(2);
      });
      it('should return -1', () => {
        existsCharacterOnRow.mockReturnValue(false);
        image['height'] = 3;

        const result = image['getBottomBorder'](1, 3);

        expect(existsCharacterOnRow).toBeCalledTimes(3);
        expect(existsCharacterOnRow.mock.calls).toEqual([
          [2, 1, 3],
          [1, 1, 3],
          [0, 1, 3],
        ]);
        expect(result).toBe(-1);
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

    describe('.nCharacterSurrounded()', () => {
      it('should return the maximum when all pixels surrounded by the pixel are characters', () => {
        atLeftEdge.mockReturnValue(false);
        atRightEdge.mockReturnValue(false);
        atTopEdge.mockReturnValue(false);
        atBottomEdge.mockReturnValue(false);
        isCharacter.mockReturnValue(true);
        const coordinate = { x: 1, y: 1 };

        const n = image['nCharacterSurrounded'](coordinate);

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
        expect(isCharacter).toBeCalledTimes(8);
        expect(isCharacter.mock.calls).toEqual([
          [{ x: 0, y: 1 }],
          [{ x: 2, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 2 }],
          [{ x: 0, y: 0 }],
          [{ x: 0, y: 2 }],
          [{ x: 2, y: 0 }],
          [{ x: 2, y: 2 }],
        ]);
        expect(n).toBe(6);
      });
      it('should return the minimum when all pixels surrounded by the pixel are NOT characters', () => {
        atLeftEdge.mockReturnValue(false);
        atRightEdge.mockReturnValue(false);
        atTopEdge.mockReturnValue(false);
        atBottomEdge.mockReturnValue(false);
        isCharacter.mockReturnValue(false);
        const coordinate = { x: 1, y: 1 };

        const n = image['nCharacterSurrounded'](coordinate);

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
        expect(isCharacter).toBeCalledTimes(6);
        expect(isCharacter.mock.calls).toEqual([
          [{ x: 0, y: 1 }],
          [{ x: 2, y: 1 }],
          [{ x: 1, y: 0 }],
          [{ x: 1, y: 2 }],
          [{ x: 0, y: 0 }],
          [{ x: 2, y: 0 }],
        ]);
        expect(n).toBe(0);
      });
      it('should return the minimum when the pixel is always at the edge', () => {
        atLeftEdge.mockReturnValue(true);
        atRightEdge.mockReturnValue(true);
        atTopEdge.mockReturnValue(true);
        atBottomEdge.mockReturnValue(true);
        const coordinate = { x: 1, y: 1 };

        const n = image['nCharacterSurrounded'](coordinate);

        expect(atLeftEdge).toBeCalledTimes(2);
        expect(atLeftEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atRightEdge).toBeCalledTimes(2);
        expect(atRightEdge.mock.calls).toEqual([[coordinate], [coordinate]]);
        expect(atTopEdge).toBeCalledTimes(1);
        expect(atTopEdge.mock.calls).toEqual([[coordinate]]);
        expect(atBottomEdge).toBeCalledTimes(1);
        expect(atBottomEdge.mock.calls).toEqual([[coordinate]]);
        expect(isCharacter).toBeCalledTimes(0);
        expect(n).toBe(0);
      });
    });
  });
});
