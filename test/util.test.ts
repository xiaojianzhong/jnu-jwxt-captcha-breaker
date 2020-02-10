import { fill } from '../src/util';

describe('util', () => {
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
