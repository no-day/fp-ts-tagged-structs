---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Non Pipeables](#non-pipeables)
  - [tagWithConfig\_](#tagwithconfig_)
  - [tag\_](#tag_)
- [Pipeables](#pipeables)
  - [tag](#tag)
  - [tagWithConfig](#tagwithconfig)
- [Types](#types)
  - [IsConfig (type alias)](#isconfig-type-alias)
  - [Tag (type alias)](#tag-type-alias)
  - [UnTag (type alias)](#untag-type-alias)

---

# Non Pipeables

## tagWithConfig\_

**Signature**

```ts
export declare const tagWithConfig_: <T extends string, D extends Record<string, unknown>, Cfg extends IsConfig>(
  tag: T,
  data: D,
  config: Cfg
) => Tag<T, D, Cfg>
```

Added in v1.0.0

## tag\_

**Signature**

```ts
export declare const tag_: <T extends string, D extends Record<string, unknown>>(
  tag: T,
  data: D
) => Tag<T, D, DefaultConfig>
```

Added in v1.0.0

# Pipeables

## tag

**Signature**

```ts
export declare const tag: <T extends string>(
  tag: T
) => <D extends Record<string, unknown>>(data: D) => Tag<T, D, DefaultConfig>
```

Added in v1.0.0

## tagWithConfig

**Signature**

```ts
export declare const tagWithConfig: <Cfg extends IsConfig>(
  cfg: Cfg
) => <T extends string>(tag: T) => <D extends Record<string, unknown>>(data: D) => Tag<T, D, Cfg>
```

Added in v1.0.0

# Types

## IsConfig (type alias)

**Signature**

```ts
export type IsConfig = {
  tag: string
}
```

Added in v1.0.0

## Tag (type alias)

**Signature**

```ts
export type Tag<T extends IsTag, D extends IsData, Cfg extends IsConfig = DefaultConfig> = {
  [key in Cfg['tag']]: T
} &
  D
```

Added in v1.0.0

## UnTag (type alias)

**Signature**

```ts
export type UnTag<D extends IsData, Cfg extends IsConfig = DefaultConfig> = Omit<D, Cfg['tag']>
```

Added in v1.0.0
