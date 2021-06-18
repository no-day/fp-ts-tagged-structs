/** @since 1.0.0 */

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const defaultConfig = {
  tag: '_tag' as const,
}

type IsData = Record<string, unknown>

type IsTag = string

type DefaultConfig = { tag: '_tag' }

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Types
 */
export type IsConfig = {
  tag: string
}

/**
 * @since 1.0.0
 * @category Types
 */
export type Tag<
  T extends IsTag,
  D extends IsData,
  Cfg extends IsConfig = DefaultConfig
> = {
  [key in Cfg['tag']]: T
} &
  D

/**
 * @since 1.0.0
 * @category Types
 */
export type UnTag<
  D extends IsData,
  Cfg extends IsConfig = DefaultConfig
> = Omit<D, Cfg['tag']>

// -----------------------------------------------------------------------------
// Non Pipeables
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Non Pipeables
 */
export const tagWithConfig_: <
  T extends IsTag,
  D extends IsData,
  Cfg extends IsConfig
>(
  tag: T,
  data: D,
  config: Cfg
) => Tag<T, D, Cfg> = (tag, data, cfg) => ({
  [cfg.tag]: tag,
  ...data,
})

/**
 * @since 1.0.0
 * @category Non Pipeables
 */
export const tag_: <T extends IsTag, D extends IsData>(
  tag: T,
  data: D
) => Tag<T, D> = (t, d) => tagWithConfig_(t, d, defaultConfig)

// -----------------------------------------------------------------------------
// Pipeables
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Pipeables
 */
export const tagWithConfig: <Cfg extends IsConfig>(
  cfg: Cfg
) => <T extends IsTag>(
  tag: T
) => <D extends IsData>(data: D) => Tag<T, D, Cfg> = (cfg) => (t) => (d) =>
  tagWithConfig_(t, d, cfg)

/**
 * @since 1.0.0
 * @category Pipeables
 */
export const tag: <T extends IsTag>(
  tag: T
) => <D extends IsData>(data: D) => Tag<T, D> = (t) => (d) => tag_(t, d)
