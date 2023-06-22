import { createWithMinTime, withMinTime } from '../src';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('index', () => {
  describe('withMinTime', () => {
    it('should wait for ms milliseconds before returning', async () => {
      const fn = jest.fn(() => 'def');
      const done = jest.fn();

      const prom = withMinTime(fn, 10000).then(done);

      expect(fn).toHaveBeenCalled();
      expect(done).not.toHaveBeenCalled();

      jest.runAllTimers();

      await prom;

      expect(done).toHaveBeenCalledWith('def');
    });
  });

  describe('createWithMinTime', () => {
    it('should wait for ms milliseconds before returning', async () => {
      const fn = jest.fn((str: string) => str + 'def');
      const done = jest.fn();

      const created = createWithMinTime(fn, 10000);

      const prom = created('abc').then(done);

      expect(fn).toHaveBeenCalledWith('abc');
      expect(done).not.toHaveBeenCalled();

      jest.runAllTimers();

      await prom;

      expect(done).toHaveBeenCalledWith('abcdef');
    });
  });
});
