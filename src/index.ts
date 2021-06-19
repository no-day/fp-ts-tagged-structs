/** @since 1.0.0 */

import * as C from './core'
export {
  /** @since 1.0.0 */
  ofType,
} from './core'

const defaultConfig = {
  tag: '_tag' as const,
}

type DefaultConfig = typeof defaultConfig

/** @since 1.0.0 */
export type Tag<T extends C.IsTag, D extends C.IsData> = C.Tag<
  T,
  D,
  DefaultConfig
>

/** @since 1.0.0 */
export type UnTag<D extends C.IsData> = C.UnTag<D, DefaultConfig>

/** @since 1.0.0 */
export const tag = C.tag(defaultConfig)

/** @since 1.0.0 */
export const mkCtors = C.mkCtors(defaultConfig)
