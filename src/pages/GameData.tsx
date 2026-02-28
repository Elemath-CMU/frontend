import { ep1 } from "./GameDataEP1";
import { ep2 } from "./GameDataEP2";
import { ep3 } from "./GameDataEP3";
import { ep4 } from "./GameDataEP4";
import { ep5 } from "./GameDataEP5";

export interface DialogueData {
  text: string | React.ReactNode;
  canClickNext: boolean;
}

export type ObjectType = "pencil" | "stick" | "other" | "spawner" | "message";
export interface ObjectBaseData {
  id: number | string;
  type: ObjectType;
  x: number;
  y: number;
  fixed?: boolean;
}
export interface PencilData extends ObjectBaseData {
  type: "pencil";
  length: number;
  width: number;
  color: string;
  orientation?: "horizontal" | "vertical";
}
export interface StickData extends ObjectBaseData {
  type: "stick";
  length: number;
  width: number;
  cutLeft?: boolean;
  cutRight?: boolean;
}
export interface OtherObjectData extends ObjectBaseData {
  type: "other";
  svg: React.ReactNode;
}
export interface ObjectSpawner extends ObjectBaseData {
  type: "spawner";
  fixed?: true;
  spawnObject: Omit<PencilData, "id" | "x" | "y" | "fixed"> | Omit<StickData, "id" | "x" | "y" | "fixed"> | Omit<OtherObjectData, "id" | "x" | "y" | "fixed">;
  spawnIcon?: React.ReactNode;
}
export interface Message extends ObjectBaseData {
  type: "message";
  fixed: true;
  message: string;
}
export type ObjectData = PencilData | StickData | OtherObjectData | ObjectSpawner;

export type CheckAnswerType = "dropOnObject" | "dropOnArea" | "dropInsideArea" | "snapToPosition" | "snapObjectWithThisPropertiesToPosition" | "lastDialogue";
export interface CheckAnswer {
  type: CheckAnswerType;
  nextInteraction: number;
}
export interface CheckAnswerDropOnObject extends CheckAnswer {
  type: "dropOnObject";
  answers: {
    objectId: number | string;
    targetObjectId: number | string;
  }[]
}
export interface CheckAnswerDropOnArea extends CheckAnswer {
  type: "dropOnArea";
  answers: {
    objectId: number | string;
    area: { x: number; y: number; width: number; height: number };
  }[]
}
export interface CheckAnswerDropInsideArea extends CheckAnswer {
  type: "dropInsideArea";
  answers: {
    objectId: number | string;
    area: { x: number; y: number; width: number; height: number };
  }[]
}
export interface CheckAnswerSnapToPosition extends CheckAnswer {
  type: "snapToPosition";
  answers: {
    objectId: number | string;
    position: { x: number; y: number };
  }[]
}
export interface CheckAnswerSnapObjectWithThisPropertiesToPosition extends CheckAnswer {
  type: "snapObjectWithThisPropertiesToPosition";
  answers: {
    objectProperties: Omit<PencilData, "id" | "x" | "y" | "fixed"> | Omit<StickData, "id" | "x" | "y" | "fixed"> | Omit<OtherObjectData, "id" | "x" | "y" | "fixed">;
    position: { x: number; y: number };
  }[]
}
export interface CheckAnswerLastDialogue extends CheckAnswer {
  type: "lastDialogue";
}
export type RuleWithAnswer = CheckAnswerDropOnObject | CheckAnswerDropOnArea | CheckAnswerDropInsideArea | CheckAnswerSnapToPosition | CheckAnswerSnapObjectWithThisPropertiesToPosition;
export type CheckAnswerRule = RuleWithAnswer | CheckAnswerLastDialogue;

export type InteractionType = "playground" | "checkpoint";
export interface Interaction {
  interaction: number;
  type: InteractionType;
}
export interface PlayGroundData extends Interaction {
  type: "playground";
  dialogues: DialogueData[];
  objects: ObjectData[];
  rule: CheckAnswerRule | CheckAnswerRule[];
}
export interface CheckPointData extends Interaction {
  type: "checkpoint";
  text: string | React.ReactNode;
}

export type InteractiveGameData = PlayGroundData | CheckPointData;

// will migrate to use InteractiveGameDataAux structure in the future
export interface InteractiveGameDataAux {
  episode: number;
  interactions: Interaction[];
  epEndMessage: string | React.ReactNode;
}

export interface CheckAnswerResult<T extends PlayGroundData["rule"] = PlayGroundData["rule"]> {
  isChange: boolean;
  remainingRule: T;
  objectsToRemove: (number | string)[];
  objectsToSnap: { objectId: number | string; position: { x: number; y: number } }[];
  nextInteraction: number | null;
}

export const gameData: InteractiveGameData[][] = [
  ep1,
  ep2,
  ep3,
  ep4,
  ep5,
]