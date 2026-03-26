# Game Configuration Documentation

This document explains the game configuration model used by the frontend, centered on `src/pages/GameData.tsx` and the episode files `src/pages/GameDataEP*.tsx`.

## Overview

The game is configured as episode data:

- Each episode is an ordered list of interactions.
- Each interaction is one of:
  - `playground`: object manipulation and answer checking.
  - `choiceAnswer`: branching by player choice.
  - `checkpoint`: non-interactive milestone text.
- All episodes are assembled into a top-level `gameData` array.

```ts
export const gameData: InteractiveGameData[][] = [
  ep1,
  ep2,
  ep3,
  ep4,
  ep5,
  ep6,
  ep7,
  ep8,
  ep9,
]
```

## Source Files

- Core schema/types: `src/pages/GameData.tsx`
- Episode content:
  - `src/pages/GameDataEP1.tsx`
  - `src/pages/GameDataEP2.tsx`
  - `src/pages/GameDataEP3.tsx`
  - `src/pages/GameDataEP4.tsx`
  - `src/pages/GameDataEP5.tsx`
  - `src/pages/GameDataEP6.tsx`
  - `src/pages/GameDataEP7.tsx`
  - `src/pages/GameDataEP8.tsx`
  - `src/pages/GameDataEP9.tsx`

## Core Types

### DialogueData

```ts
export interface DialogueData {
  text: string | React.ReactNode;
  canClickNext: boolean;
}
```

- `text`: display content (plain text or JSX).
- `canClickNext`: if `true`, player can advance dialogue immediately.

### Interaction Base

```ts
export type InteractionType = "playground" | "choiceAnswer" | "checkpoint";

export interface Interaction {
  interaction: number;
  type: InteractionType;
}
```

- `interaction`: numeric interaction id inside an episode.
- `type`: discriminant used to select the shape of interaction data.

## Object Model

`playground` and `choiceAnswer` interactions may render objects in the scene.

### Object Base

```ts
export type ObjectType = "pencil" | "stick" | "other" | "spawner" | "fractionInput" | "message";

export interface ObjectBaseData {
  id: number | string;
  type: ObjectType;
  x: number;
  y: number;
  fixed?: boolean;
}
```

- `id`: identifier used by rules and runtime updates.
- `x`, `y`: position in scene coordinates.
- `fixed`: non-draggable/non-movable when `true`.

### Object Variants

#### PencilData

```ts
export interface PencilData extends ObjectBaseData {
  type: "pencil";
  length: number;
  width: number;
  color: string;
  orientation?: "horizontal" | "vertical";
}
```

#### StickData

```ts
export interface StickData extends ObjectBaseData {
  type: "stick";
  length: number;
  width: number;
  cutLeft?: boolean;
  cutRight?: boolean;
}
```

#### OtherObjectData

```ts
export interface OtherObjectData extends ObjectBaseData {
  type: "other";
  svg: React.ReactNode;
}
```

#### ObjectSpawner

```ts
export interface ObjectSpawner extends ObjectBaseData {
  type: "spawner";
  fixed?: true;
  spawnObject:
    | Omit<PencilData, "id" | "x" | "y" | "fixed">
    | Omit<StickData, "id" | "x" | "y" | "fixed">
    | Omit<OtherObjectData, "id" | "x" | "y" | "fixed">;
  spawnIcon?: React.ReactNode;
}
```

- Static object that creates new draggable objects.
- `spawnObject` defines the generated object template.

#### FractionInput

```ts
export interface FractionInput extends ObjectBaseData {
  type: "fractionInput";
  fixed?: true;
  numerator: number | null;
  numeratorPlaceholder?: string;
  denominator: number | null;
  denominatorPlaceholder?: string;
  fixedDenominator?: boolean;
}
```

- Interactive fraction entry control used with `enterFraction` rules.

#### Message

```ts
export interface Message extends ObjectBaseData {
  type: "message";
  fixed?: true;
  message: string;
}
```

- Static text object.

### ObjectData Union

```ts
export type ObjectData = PencilData | StickData | OtherObjectData | ObjectSpawner | FractionInput;
```

Note: `Message` is defined but currently not included in `ObjectData`.

## Rule System

Rules validate player actions in `playground` interactions and determine progression.

### Rule Types

```ts
export type CheckAnswerType =
  | "dropOnObject"
  | "dropOnArea"
  | "dropInsideArea"
  | "snapToPosition"
  | "snapObjectWithThisPropertiesToPosition"
  | "lastDialogue"
  | "enterFraction";
```

All rules include:

```ts
export interface CheckAnswer {
  type: CheckAnswerType;
  nextInteraction: number;
}
```

### Rule Variants

- `dropOnObject`: object must be dropped onto another object.
- `dropOnArea`: object must be dropped within a target area.
- `dropInsideArea`: object bounds must be fully inside a target area.
- `snapToPosition`: object must reach exact coordinates.
- `snapObjectWithThisPropertiesToPosition`: object matching a property signature must reach exact coordinates.
- `enterFraction`: fraction input value must match expected value.
- `lastDialogue`: progression occurs when dialogue sequence ends.

### Rule Composition Types

```ts
export type RuleWithAnswer =
  | CheckAnswerDropOnObject
  | CheckAnswerDropOnArea
  | CheckAnswerDropInsideArea
  | CheckAnswerSnapToPosition
  | CheckAnswerSnapObjectWithThisPropertiesToPosition
  | CheckAnswerEnterFraction;

export type CheckAnswerRule = RuleWithAnswer | CheckAnswerLastDialogue;
```

In `PlayGroundData`, `rule` may be a single rule or an array of rules.

## Interaction Schemas

### PlayGroundData

```ts
export interface PlayGroundData extends Interaction {
  type: "playground";
  dialogues: DialogueData[];
  objects: ObjectData[];
  rule: CheckAnswerRule | CheckAnswerRule[];
}
```

- Dialogue-driven interactive scene.
- Uses rules to decide when to transition.

### ChoiceAnswerData

```ts
export interface ChoiceAnswerData extends Interaction {
  type: "choiceAnswer";
  text: string | React.ReactNode;
  objects: ObjectData[];
  choices: { text: string; nextInteraction: number }[];
}
```

- Presents prompt text and selectable choices.
- Each choice maps to a `nextInteraction`.

### CheckPointData

```ts
export interface CheckPointData extends Interaction {
  type: "checkpoint";
  text: string | React.ReactNode;
}
```

- Non-interactive content step.

## Runtime Check Result

```ts
export interface CheckAnswerResult<T extends PlayGroundData["rule"] = PlayGroundData["rule"]> {
  isChange: boolean;
  remainingRule: T;
  objectsToRemove: (number | string)[];
  objectsToSnap: { objectId: number | string; position: { x: number; y: number } }[];
  nextInteraction: number | null;
}
```

- `isChange`: whether a player action altered gameplay state.
- `remainingRule`: unresolved rule(s) after processing.
- `objectsToRemove`: object ids to remove from scene.
- `objectsToSnap`: object ids and positions to enforce.
- `nextInteraction`: target interaction id when progression should occur.

## Authoring Guidelines

When adding or editing episode data:

1. Keep `interaction` ids unique inside the episode.
2. Ensure every `nextInteraction` points to an existing interaction.
3. Keep object `id` values stable for rule matching.
4. Use `fixed: true` for helper/label/spawner objects that should not move.
5. For fraction tasks, align `FractionInput` object ids with `enterFraction` rule targets.
6. Prefer small, explicit interaction steps over overloaded scenes to simplify debugging.

## Known Type Detail

`ObjectType` includes `"message"`, and `Message` is defined, but `ObjectData` does not include `Message` yet. If message objects are intended to be part of scene data, include `Message` in the `ObjectData` union.
