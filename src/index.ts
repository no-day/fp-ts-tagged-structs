import * as C from './core'
export {
  /** @category Utils */
  ofType,
} from './core'

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const defaultConfig = {
  tag: '_tag' as const,
}

type DefaultConfig = typeof defaultConfig

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/** @category Types */
export type Tag<T extends C.IsTag, D extends C.IsData> = C.Tag<
  T,
  D,
  DefaultConfig
>

/** @category Types */
export type UnTag<D extends C.IsData> = C.UnTag<D, DefaultConfig>

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/** @category Constructors */
export const tag = C.tag(defaultConfig)

/** @category Constructors */
export const mkCtors = C.mkCtors(defaultConfig)

/** @category Constructors */
export const mkUnionCtors = C.mkUnionCtors(defaultConfig)

// -----------------------------------------------------------------------------
// Destructors
// -----------------------------------------------------------------------------

/** @category Destructors */
export const match = C.match(defaultConfig)

/** @category Destructors */
export const matchSome = C.matchSome(defaultConfig)
