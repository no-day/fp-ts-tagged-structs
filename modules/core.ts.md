---
title: core.ts
nav_order: 1
parent: Modules
---

## core overview

---

<h2 class="text-delta">Table of contents</h2>

- [Pipeables](#pipeables)
  - [tag](#tag)
- [Types](#types)
  - [IsConfig (type alias)](#isconfig-type-alias)
  - [IsData (type alias)](#isdata-type-alias)
  - [IsSpec (type alias)](#isspec-type-alias)
  - [IsTag (type alias)](#istag-type-alias)
  - [Tag (type alias)](#tag-type-alias)
  - [UnTag (type alias)](#untag-type-alias)
- [Utils](#utils)
  - [match](#match)
  - [matchSome](#matchsome)
  - [mkCtors](#mkctors)
  - [mkUnionCtors](#mkunionctors)
  - [ofType](#oftype)

---

# Pipeables

## tag

**Signature**

```ts
export declare const tag: <Cfg extends IsConfig>(
  cfg: Cfg
) => <T extends string>(tag: T) => <D extends Record<string, unknown>>(data: D) => Tag<T, D, Cfg>
```

# Types

## IsConfig (type alias)

**Signature**

```ts
export type IsConfig = {
  tag: IsTag
}
```

## IsData (type alias)

**Signature**

```ts
export type IsData = Record<string, unknown>
```

## IsSpec (type alias)

**Signature**

```ts
export type IsSpec = Record<IsTag, IsData>
```

## IsTag (type alias)

**Signature**

```ts
export type IsTag = string
```

## Tag (type alias)

**Signature**

```ts
export type Tag<T extends IsTag, D extends IsData, Cfg extends IsConfig> = {
  [key in Cfg['tag']]: T
} &
  D
```

## UnTag (type alias)

**Signature**

```ts
export type UnTag<D extends IsData, Cfg extends IsConfig> = Omit<D, Cfg['tag']>
```

# Utils

## match

**Signature**

```ts
export declare const match: <Cfg extends IsConfig>(
  cfg: Cfg
) => <S extends Record<string, Record<string, unknown>>, Z>(
  branches: MapBranches<S, Z>
) => (x: Union<MapTag<S, Cfg>>) => Z
```

## matchSome

**Signature**

```ts
export declare const matchSome: <Cfg extends IsConfig>(
  cfg: Cfg
) => <S extends Record<string, Record<string, unknown>>, Z>(
  branches: Partial<MapBranches<S, Z>>,
  otherwise: () => Z
) => (x: Union<MapTag<S, Cfg>>) => Z
```

## mkCtors

**Signature**

```ts
export declare const mkCtors: <Cfg extends IsConfig>(
  cfg: Cfg
) => <S extends Record<string, Record<string, unknown>>>(witness: S) => MapCtors<S, Cfg>
```

## mkUnionCtors

**Signature**

```ts
export declare const mkUnionCtors: <Cfg extends IsConfig>(
  cfg: Cfg
) => <S extends Record<string, Record<string, unknown>>>(witness: S) => MapUnionCtors<S, Cfg>
```

## ofType

**Signature**

```ts
export declare const ofType: <A>() => A
```
