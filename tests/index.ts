import * as $ from '../src'
import { pipe } from 'fp-ts/lib/function'

describe('index', () => {
  describe('tagWithConfig', () => {
    it('works', () => {
      expect(pipe({ bar: 1, baz: true }, $.tag('foo'))).toStrictEqual({
        _tag: 'foo',
        bar: 1,
        baz: true,
      })
    })
  })
})
