import { TestBed } from '@angular/core/testing';
import { Random } from './random';

describe('Random', () => {
  let service: Random;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Random);
  });

  describe('randomNumber', () => {
    it('should return between 1-100', () => {
      const max = 100;
      const source = spyOn(Math, 'random').and.returnValue(0);
      expect(service.randomNumber(max)).toBe(1);
      source.and.returnValue(0.9999);
      expect(service.randomNumber(max)).toBe(max);
      source.and.callThrough();

      for (let i = 0; i < 10; i++) {
        const drawn = service.randomNumber(max);
        expect(drawn).toBeGreaterThanOrEqual(1);
        expect(drawn).toBeLessThanOrEqual(max);
        expect(Number.isInteger(drawn)).withContext('Must be integer').toBeTrue();
      }
    });

    it('should return values [1,2,3] only', () => {
      const possibleValues = [1, 2, 3];
      for (let i = 0; i < 10; i++) {
        expect(possibleValues).toContain(service.randomNumber(3));
      }
    });
  });
});
