import { run } from '../src/cli';
import fs from 'fs';
import { CaptchaBreaker } from '../src';

describe('cli', () => {
  describe('.run()', () => {
    let exit: jest.SpyInstance;
    let table: jest.SpyInstance;
    let init: jest.SpyInstance;
    let readdirSync: jest.SpyInstance;
    let readFileSync: jest.SpyInstance;
    let parse: jest.SpyInstance;
    const baseArguments = ['node', '/path/to/the/executable'];

    beforeAll(() => {
      exit = jest
        .spyOn(process, 'exit')
        .mockImplementation(() => undefined as never);
      table = jest.spyOn(console, 'table').mockImplementation();
      readdirSync = jest.spyOn(fs, 'readdirSync').mockImplementation();
      readFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation();
      init = jest.spyOn(CaptchaBreaker.prototype, 'init').mockImplementation();
      parse = jest
        .spyOn(CaptchaBreaker.prototype, 'parse')
        .mockImplementation();
    });

    afterEach(() => {
      exit.mockClear();
      table.mockClear();
      readdirSync.mockClear();
      readFileSync.mockClear();
      init.mockClear();
      parse.mockClear();
    });

    it('should load the model by default', async () => {
      const args = baseArguments;

      await run(args);

      expect(init).toBeCalled();
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should NOT load the model', async () => {
      const args = baseArguments.concat(['--no-load-model']);

      await run(args);

      expect(init).toBeCalled();
      expect(init.mock.calls[0][0].loadModel).toBe(false);
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should train the model', async () => {
      const args = baseArguments.concat(['--train-model']);

      await run(args);

      expect(init).toBeCalled();
      expect(init.mock.calls[0][0].trainModel).toBe(true);
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should save the model', async () => {
      const args = baseArguments.concat(['--save-model']);

      await run(args);

      expect(init).toBeCalled();
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should load the model from the file system', async () => {
      const args = baseArguments.concat(['--model-dir', '/path/to/the/model']);

      await run(args);

      expect(init).toBeCalled();
      expect(init.mock.calls[0][0].loadModel).toBe(true);
      expect(init.mock.calls[0][0].modelDir).toBe('/path/to/the/model');
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should save the model to the file system', async () => {
      const args = baseArguments.concat([
        '--save-model',
        '--model-dir',
        '/path/to/the/model',
      ]);

      await run(args);

      expect(init).toBeCalled();
      expect(init.mock.calls[0][0].saveModel).toBe(true);
      expect(init.mock.calls[0][0].modelDir).toBe('/path/to/the/model');
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should parse nothing when no files are provided', async () => {
      const args = baseArguments;

      await run(args);

      expect(readFileSync).not.toBeCalled();
      expect(parse).not.toBeCalled();
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    }, 3000);
    it('should read png files from file paths and parse them', async () => {
      const buffers = [Buffer.from([1]), Buffer.from([2]), Buffer.from([3])];
      readFileSync
        .mockReturnValueOnce(buffers[0])
        .mockReturnValueOnce(buffers[1])
        .mockReturnValueOnce(buffers[2]);
      const args = baseArguments.concat([
        '--paths',
        '/path1.png',
        '--paths',
        '/path2.png',
        '--paths',
        '/path3.jpg',
        '--paths',
        '/path4.png',
      ]);

      await run(args);

      expect(readFileSync).toBeCalledTimes(3);
      expect(readFileSync.mock.calls).toEqual([
        ['/path1.png'],
        ['/path2.png'],
        ['/path4.png'],
      ]);
      expect(parse).toBeCalledTimes(3);
      expect(parse.mock.calls).toEqual([
        [buffers[0]],
        [buffers[1]],
        [buffers[2]],
      ]);
      expect(exit).toBeCalledWith(0);
    });
    it('should parse nothing when no dirs are provided', async () => {
      const args = baseArguments;

      await run(args);

      expect(readdirSync).not.toBeCalled();
      expect(readFileSync).not.toBeCalled();
      expect(parse).not.toBeCalled();
      expect(exit).toBeCalledWith(0);
      expect(table).toBeCalledWith([]);
    });
    it('should read png files from file directories and parse them', async () => {
      readdirSync.mockReturnValue(['path1.png', 'path2.png', 'path3.png']);
      const buffers = [Buffer.from([1]), Buffer.from([2]), Buffer.from([3])];
      readFileSync
        .mockReturnValueOnce(buffers[0])
        .mockReturnValueOnce(buffers[1])
        .mockReturnValueOnce(buffers[2]);
      const args = baseArguments.concat(['--dirs', '/path/to/the/directory']);

      await run(args);

      expect(readdirSync).toBeCalledTimes(1);
      expect(readdirSync.mock.calls).toEqual([['/path/to/the/directory']]);
      expect(readFileSync).toBeCalledTimes(3);
      expect(readFileSync.mock.calls).toEqual([
        ['/path/to/the/directory/path1.png'],
        ['/path/to/the/directory/path2.png'],
        ['/path/to/the/directory/path3.png'],
      ]);
      expect(parse).toBeCalledTimes(3);
      expect(parse.mock.calls).toEqual([
        [buffers[0]],
        [buffers[1]],
        [buffers[2]],
      ]);
      expect(exit).toBeCalledWith(0);
    });
  });
});
