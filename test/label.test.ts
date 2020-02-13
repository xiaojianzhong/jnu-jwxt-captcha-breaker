import { NUM_CLASSES, index2Label, index2Vector } from '../src/label';

describe('label', () => {
  const outOfBoundErrorMessage = 'The index is out of the valid range.';

  describe('.NUM_CLASSES', () => {
    it('should be 62', () => {
      expect(NUM_CLASSES).toBe(62);
    });
  });

  describe('.index2Label()', () => {
    it('should throw an error when converting -1', () => {
      const index = -1;

      expect(() => {
        index2Label(index);
      }).toThrow(outOfBoundErrorMessage);
    });
    it("should convert 0 into '0'", () => {
      const index = 0;

      const label = index2Label(index);

      expect(label).toBe('0');
    });
    it("should convert 5 into '5'", () => {
      const index = 5;

      const label = index2Label(index);

      expect(label).toBe('5');
    });
    it("should convert 9 into '9'", () => {
      const index = 9;

      const label = index2Label(index);

      expect(label).toBe('9');
    });
    it("should convert 10 into 'A'", () => {
      const index = 10;

      const label = index2Label(index);

      expect(label).toBe('A');
    });
    it("should convert 16 into 'G'", () => {
      const index = 16;

      const label = index2Label(index);

      expect(label).toBe('G');
    });
    it("should convert 35 into 'Z'", () => {
      const index = 35;

      const label = index2Label(index);

      expect(label).toBe('Z');
    });
    it("should convert 36 into 'a'", () => {
      const index = 36;

      const label = index2Label(index);

      expect(label).toBe('a');
    });
    it("should convert 42 into 'g'", () => {
      const index = 42;

      const label = index2Label(index);

      expect(label).toBe('g');
    });
    it("should convert 61 into 'z'", () => {
      const index = 61;

      const label = index2Label(index);

      expect(label).toBe('z');
    });
    it('should throw an error when converting 62', () => {
      const index = 62;

      expect(() => {
        index2Label(index);
      }).toThrow(outOfBoundErrorMessage);
    });
  });

  describe('.index2Vector()', () => {
    it('should throw an error when converting -1', () => {
      const index = -1;

      expect(() => {
        index2Vector(index);
      }).toThrow(outOfBoundErrorMessage);
    });
    it('should convert 0 into a vector', () => {
      const index = 0;

      const vector = index2Vector(index);

      expect(vector).toHaveLength(62);
      expect(vector[0]).toBe(1);
      expect(vector.slice(1)).toEqual(new Array(61).fill(0));
    });
    it('should convert 10 into a vector', () => {
      const index = 10;

      const vector = index2Vector(index);

      expect(vector).toHaveLength(62);
      expect(vector.slice(0, 10)).toEqual(new Array(10).fill(0));
      expect(vector[10]).toBe(1);
      expect(vector.slice(11)).toEqual(new Array(51).fill(0));
    });
    it('should convert 61 into a vector', () => {
      const index = 61;

      const vector = index2Vector(index);

      expect(vector).toHaveLength(62);
      expect(vector.slice(0, 61)).toEqual(new Array(61).fill(0));
      expect(vector[61]).toBe(1);
    });
    it('should throw an error when converting 62', () => {
      const index = 62;

      expect(() => {
        index2Vector(index);
      }).toThrow(outOfBoundErrorMessage);
    });
  });
});
