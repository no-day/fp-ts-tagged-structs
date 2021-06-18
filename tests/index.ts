import * as $ from '../src'
import { pipe } from 'fp-ts/lib/function'

describe('index', () => {
  describe('tagWithConfig_', () => {
    it('works', () => {
      expect(
        $.tagWithConfig_('foo', { bar: 1, baz: true }, { tag: 'tag' as const })
      ).toStrictEqual({
        tag: 'foo',
        bar: 1,
        baz: true,
      })
    })
  })

  describe('tag_', () => {
    it('works', () => {
      expect($.tag_('foo', { bar: 1, baz: true })).toStrictEqual({
        _tag: 'foo',
        bar: 1,
        baz: true,
      })
    })
  })

  describe('tagWithConfig', () => {
    it('works', () => {
      expect(
        pipe(
          { bar: 1, baz: true },
          $.tagWithConfig({ tag: 'tag' as const })('foo')
        )
      ).toStrictEqual({
        tag: 'foo',
        bar: 1,
        baz: true,
      })
    })
  })

  describe('tag', () => {
    it('works', () => {
      expect(pipe({ bar: 1, baz: true }, $.tag('foo'))).toStrictEqual({
        _tag: 'foo',
        bar: 1,
        baz: true,
      })
    })
  })
})
