---
title: index.ts
nav_order: 2
parent: Modules
---

## index overview

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [mkCtors](#mkctors)
  - [mkUnionCtors](#mkunionctors)
  - [tag](#tag)
- [Destructors](#destructors)
  - [match](#match)
  - [matchSome](#matchsome)
- [Types](#types)
  - [Tag (type alias)](#tag-type-alias)
  - [UnTag (type alias)](#untag-type-alias)
- [Utils](#utils)
  - [ofType](#oftype)

---

# Constructors

## mkCtors

**Signature**

```ts
export declare const mkCtors: <S>(
  witness: S
) => { [key in keyof S]: (data: S[key]) => C.Tag<key & string, S[key], { tag: '_tag' }> }
```

## mkUnionCtors

**Signature**

```ts
export declare const mkUnionCtors: <S>(
  witness: S
) => { [key in keyof S]: (data: S[key]) => { [key in keyof S]: C.Tag<key & string, S[key], { tag: '_tag' }> }[keyof S] }
```

## tag

**Signature**

```ts
export declare const tag: <T>(tag: T) => <D>(data: D) => C.Tag<T, D, { tag: '_tag' }>
```

# Destructors

## match

**Signature**

```ts
export declare const match: <S, Z>(
  branches: { [key in keyof S]: (data: S[key]) => Z }
) => (x: { [key in keyof S]: C.Tag<key & string, S[key], { tag: '_tag' }> }[keyof S]) => Z
```

## matchSome

**Signature**

```ts
export declare const matchSome: <S, Z>(
  branches: Partial<{ [key in keyof S]: (data: S[key]) => Z }>,
  otherwise: () => Z
) => (x: { [key in keyof S]: C.Tag<key & string, S[key], { tag: '_tag' }> }[keyof S]) => Z
```

# Types

## Tag (type alias)

**Signature**

```ts
export type Tag<T extends C.IsTag, D extends C.IsData> = C.Tag<T, D, DefaultConfig>
```

## UnTag (type alias)

**Signature**

```ts
export type UnTag<D extends C.IsData> = C.UnTag<D, DefaultConfig>
```

# Utils

## ofType

**Signature**

```ts
export declare const ofType: <A>() => A
```
