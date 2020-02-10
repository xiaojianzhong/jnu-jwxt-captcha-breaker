import { collect } from '../src/util';
import { parseFilename } from '../src/util';
import { fill } from '../src/util';

describe('util', () => {
  describe('.collect()', () => {
    it('should collect from an empty array', () => {
      const result = collect('abc', []);

      expect(result).toEqual(['abc']);
    });
    it('should collect from a filled array', () => {
      const result = collect('abc', ['def']);

      expect(result).toEqual(['def', 'abc']);
    });
    it('should collect elements in the right order', () => {
      const result = collect('2', ['1']);

      expect(result).toEqual(['1', '2']);
    });
    it('should support chained call', () => {
      const result = collect('4', collect('3', collect('2', ['1'])));

      expect(result).toEqual(['1', '2', '3', '4']);
    });
  });

  describe('.parseFilename()', () => {
    it("should throw an error when the file's path is ''", () => {
      expect(() => {
        parseFilename('');
      }).toThrow("The file's path is an empty string.");
    });
    it('should parse an absolute path', () => {
      const { prefix, suffix } = parseFilename('/abc.png');

      expect(prefix).toBe('abc');
      expect(suffix).toBe('png');
    });
    it('should parse a relative path', () => {
      const { prefix, suffix } = parseFilename('./abc.png');

      expect(prefix).toBe('abc');
      expect(suffix).toBe('png');
    });
    it("should directly parse a file's name", () => {
      const { prefix, suffix } = parseFilename('abc.png');

      expect(prefix).toBe('abc');
      expect(suffix).toBe('png');
    });
    it('should parse without suffix', () => {
      const { prefix, suffix } = parseFilename('.gitignore');

      expect(prefix).toBe('');
      expect(suffix).toBe('gitignore');
    });
    it('should parse without prefix', () => {
      const { prefix, suffix } = parseFilename('abc');

      expect(prefix).toBe('abc');
      expect(suffix).toBe('');
    });
  });

  describe('.fill()', () => {
    it('should fill 1', () => {
      const result = fill(1, 3);

      expect(result).toBe('001');
    });
    it('should throw an error when the number is less than 0', () => {
      expect(() => {
        fill(-1, 3);
      }).toThrow('The number is less than 0.');
    });
    it('should fill 0', () => {
      const result = fill(0, 3);

      expect(result).toBe('000');
    });
    it('should throw an error when the number of digits is equals to 0', () => {
      expect(() => {
        fill(1, 0);
      }).toThrow("The number of digits is less than the number's length.");
    });
    it('should throw an error when the number of digits is less than 0', () => {
      expect(() => {
        fill(1, -1);
      }).toThrow("The number of digits is less than the number's length.");
    });
    it("should fill when the number of digits is equals to the number's length", () => {
      const result = fill(123, 3);

      expect(result).toBe('123');
    });
    it("should throw an error when the number of digits is less than the number's length", () => {
      expect(() => {
        fill(123, 1);
      }).toThrow("The number of digits is less than the number's length.");
    });
  });
});
