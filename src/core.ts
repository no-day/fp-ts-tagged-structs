/** @since 1.0.0 */

import { pipe } from 'fp-ts/lib/function'
import * as R from 'fp-ts/Record'

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type Ctor<
  T extends IsTag = IsTag,
  D extends IsData = IsData,
  Cfg extends IsConfig = IsConfig
> = (data: D) => Tag<T, D, Cfg>

type MapCtors<S extends IsSpec, Cfg extends IsConfig> = {
  [key in keyof S]: Ctor<key & string, S[key], Cfg>
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Types
 */
export type IsData = Record<string, unknown>

/**
 * @since 1.0.0
 * @category Types
 */
export type IsTag = string

/**
 * @since 1.0.0
 * @category Types
 */
export type IsConfig = {
  tag: IsTag
}

/**
 * @since 1.0.0
 * @category Types
 */
export type IsSpec = Record<IsTag, IsData>

/**
 * @since 1.0.0
 * @category Types
 */
export type Tag<T extends IsTag, D extends IsData, Cfg extends IsConfig> = {
  [key in Cfg['tag']]: T
} &
  D

/**
 * @since 1.0.0
 * @category Types
 */
export type UnTag<D extends IsData, Cfg extends IsConfig> = Omit<D, Cfg['tag']>

// -----------------------------------------------------------------------------
// Pipeables
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Pipeables
 */
export const tag: <Cfg extends IsConfig>(
  cfg: Cfg
) => <T extends IsTag>(
  tag: T
) => <D extends IsData>(data: D) => Tag<T, D, Cfg> =
  (cfg) => (tag) => (data) => ({
    [cfg.tag]: tag,
    ...data,
  })

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Utils
 */
export const ofType = <A>(): A => ({} as A)

/**
 * @since 1.0.0
 * @category Utils
 */
export const mkCtors =
  <Cfg extends IsConfig>(cfg: Cfg) =>
  <W extends IsSpec>(witness: W): MapCtors<W, Cfg> =>
    pipe(witness as IsSpec, R.mapWithIndex(tag(cfg))) as MapCtors<W, Cfg>

// export const mkUnionCtors: <Cfg extends IsConfig>(
//   cfg: Cfg
// ) => <W extends IsSpec>(witness: W) => MapCtors<W, Cfg> = 1 as any

// export const match: <Cfg extends IsConfig>(
//   cfg: Cfg
// ) => <W extends IsSpec>(witness: W) => MapCtors<W> = 1 as any
