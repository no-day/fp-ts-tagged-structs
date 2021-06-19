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

type UnionCtor<
  D extends IsData = IsData,
  S extends IsSpec = IsSpec,
  Cfg extends IsConfig = IsConfig
> = (data: D) => TaggedUnion<S, Cfg>

type MapCtors<S extends IsSpec, Cfg extends IsConfig> = {
  [key in keyof S]: Ctor<key & string, S[key], Cfg>
}

type MapUnionCtors<S extends IsSpec, Cfg extends IsConfig> = {
  [key in keyof S]: UnionCtor<S[key], S, Cfg>
}

type MapTag<S extends IsSpec, Cfg extends IsConfig> = {
  [key in keyof S]: Tag<key & string, S[key], Cfg>
}

type MapBranches<S extends IsSpec, Z> = {
  [key in keyof S]: Branch<S[key], Z>
}

type PartialMapBranches<S extends IsSpec, Z> = Partial<MapBranches<S, Z>>

type Branch<D, Z> = (data: D) => Z

type Union<R> = R[keyof R]

type TaggedUnion<R extends IsSpec, Cfg extends IsConfig> = Union<MapTag<R, Cfg>>

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/** @category Types */
export type IsData = Record<string, unknown>

/** @category Types */
export type IsTag = string

/** @category Types */
export type IsConfig = {
  tag: IsTag
}

/** @category Types */
export type IsSpec = Record<IsTag, IsData>

/** @category Types */
export type Tag<T extends IsTag, D extends IsData, Cfg extends IsConfig> = {
  [key in Cfg['tag']]: T
} &
  D

/** @category Types */
export type UnTag<D extends IsData, Cfg extends IsConfig> = Omit<D, Cfg['tag']>

// -----------------------------------------------------------------------------
// Pipeables
// -----------------------------------------------------------------------------

/** @category Pipeables */
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

/** @category Utils */
export const ofType = <A>(): A => ({} as A)

/** @category Utils */
export const mkCtors =
  <Cfg extends IsConfig>(cfg: Cfg) =>
  <S extends IsSpec>(witness: S): MapCtors<S, Cfg> =>
    pipe(witness as IsSpec, R.mapWithIndex(tag(cfg))) as MapCtors<S, Cfg>

/** @category Utils */
export const mkUnionCtors: <Cfg extends IsConfig>(
  cfg: Cfg
) => <S extends IsSpec>(witness: S) => MapUnionCtors<S, Cfg> = mkCtors

/** @category Utils */
export const match =
  <Cfg extends IsConfig>(cfg: Cfg) =>
  <S extends IsSpec, Z>(branches: MapBranches<S, Z>) =>
  (x: TaggedUnion<S, Cfg>): Z =>
    branches[x[cfg.tag] as keyof typeof branches](x)

/** @category Utils */
export const matchSome =
  <Cfg extends IsConfig>(cfg: Cfg) =>
  <S extends IsSpec, Z>(
    branches: PartialMapBranches<S, Z>,
    otherwise: () => Z
  ) =>
  (x: TaggedUnion<S, Cfg>): Z => {
    const tag_ = x[cfg.tag] as keyof MapBranches<S, Z>
    const branch = branches[tag_]

    return branch ? branch(x) : otherwise()
  }
