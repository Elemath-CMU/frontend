export interface DialogueData {
  text: string | React.ReactNode;
  canClickNext: boolean;
}

export interface ObjectBaseData {
  id: number | string;
  type: string;
  renderAtMiddleOfBoard?: boolean;
  forceCenterOnBoard?: boolean;
  x: number;
  y: number;
  fixed?: boolean;
}

export interface PencilData extends ObjectBaseData {
  type: "pencil";
  length: number;
  orientation?: "horizontal" | "vertical";
}

export interface OtherObjectData extends ObjectBaseData {
  type: "other";
  svg: React.ReactNode;
}

export type ObjectData = PencilData | OtherObjectData;

export interface CheckAnswerDropOnObject {
  type: "dropOnObject";
  objectId: number | string;
  targetObjectId: number | string;
}
export interface CheckAnswerLastDialogue {
  type: "lastDialogue";
}
export type CheckAnswerRule = CheckAnswerDropOnObject | CheckAnswerLastDialogue;

export interface PlayGroundData {
  interaction: number;
  type: "playground";
  dialogues: DialogueData[];
  objects: ObjectData[];
  rules: CheckAnswerRule[];
}

export interface StoryLineData {
  interaction: number;
  type: "storyline";
  dialogues: DialogueData[];
}

export interface CheckPointData {
  interaction: number;
  type: "checkpoint";
  text: string | React.ReactNode;
}

export type InteractiveGameData = PlayGroundData | StoryLineData | CheckPointData;

export const gameData: InteractiveGameData[][] = [
  [
    {
      interaction: 1,
      type: "playground",
      dialogues: [
        {
          text: 'เอาล่ะ เรามาเริ่มจากการเตรียมวัตถุดิบกันก่อนแล้วกัน!',
          canClickNext: true
        },
        {
          text: 'ไหนเธอลองลากดินสอมาที่ฉันสิ!',
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, fixed: true, length: 175, x: 400, y: 100 },
      ],
      rules: [
        { type: "lastDialogue" }
      ]
    },
    {
      interaction: 2,
      type: "playground",
      dialogues: [
        {
          text: 'ไหนเธอลองลากดินสอมาที่ฉันสิ!',
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 175, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 3,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 175, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 70, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 4,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 70, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 175, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 2, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 5,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 160, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 70, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 6,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 160, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 90, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 7,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, orientation: "horizontal", length: 160, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, orientation: "horizontal", length: 90, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 8,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, orientation: "horizontal", length: 90, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, orientation: "horizontal", length: 160, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 2, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 9,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, orientation: "horizontal", length: 90, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, orientation: "horizontal", length: 115, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 2, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 10,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 90, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 115, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 2, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 11,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 105, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 90, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 12,
      type: "playground",
      dialogues: [
        {
          text: <p>ไหนเธอลองลากดินสอแท่งที่<strong><u>ยาวกว่า</u></strong>มาที่ฉันสิ!</p>,
          canClickNext: false
        }
      ],
      objects: [
        { id: 1, type: "pencil", renderAtMiddleOfBoard: true, length: 90, x: 400, y: 100 },
        { id: 2, type: "pencil", renderAtMiddleOfBoard: true, length: 85, x: 400, y: 100 },
      ],
      rules: [
        { type: "dropOnObject", objectId: 1, targetObjectId: "spirit" },
      ]
    },
    {
      interaction: 13,
      type: "checkpoint",
      text: <div>
        <p>ว้าว! เธอเริ่มเตรียมวัตถุดิบคล่องแล้วสินะ</p>
        <br />
        <p>ตอนนี้เธออยากพักก่อนมั้ย?</p>
      </div>,
    },
  ],
]