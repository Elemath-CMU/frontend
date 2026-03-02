import type { InteractiveGameData } from "./GameData";

export const ep1: InteractiveGameData[] = [
  {
    interaction: 1,
    type: "playground",
    dialogues: [
      {
        text: 'เอาล่ะ เรามาเริ่มจากการเตรียมวัตถุดิบกันก่อนแล้วกัน!',
        canClickNext: true
      },
    ],
    objects: [
      { id: 1, type: "pencil", fixed: true, length: 175, width: 62, color: "#F9D17B", x: 458 - 62 / 2, y: 200 },
    ],
    rule: { type: "lastDialogue", nextInteraction: 2 },
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
      { id: 1, type: "pencil", length: 175, width: 62, color: "#F9D17B", x: 458 - 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 3, answers: [{ objectId: 1, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", length: 175, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 70, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 4, answers: [{ objectId: 1, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", length: 70, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 175, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 5, answers: [{ objectId: 2, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", length: 160, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 70, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 6, answers: [{ objectId: 1, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", length: 160, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 90, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 7, answers: [{ objectId: 1, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", orientation: "horizontal", length: 160, width: 62, color: "#F9D17B", x: 458 + 80, y: 200 },
      { id: 2, type: "pencil", orientation: "horizontal", length: 90, width: 62, color: "#F9D17B", x: 458 + 80, y: 300 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 8, answers: [{ objectId: 1, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", orientation: "horizontal", length: 90, width: 62, color: "#F9D17B", x: 458 + 80, y: 200 },
      { id: 2, type: "pencil", orientation: "horizontal", length: 160, width: 62, color: "#F9D17B", x: 458 + 80, y: 300 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 9, answers: [{ objectId: 2, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", orientation: "horizontal", length: 90, width: 62, color: "#F9D17B", x: 458 + 58, y: 200 },
      { id: 2, type: "pencil", orientation: "horizontal", length: 115, width: 62, color: "#F9D17B", x: 458 + 58, y: 300 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 10, answers: [{ objectId: 2, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", length: 90, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 115, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 11, answers: [{ objectId: 2, targetObjectId: "spirit" }] }
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
      { id: 1, type: "pencil", length: 105, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 90, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 12, answers: [{ objectId: 1, targetObjectId: "spirit" }] },
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
      { id: 1, type: "pencil", length: 90, width: 62, color: "#F9D17B", x: 458 - 62 / 2 - 62, y: 200 },
      { id: 2, type: "pencil", length: 85, width: 62, color: "#F9D17B", x: 458 + 62 / 2, y: 200 },
    ],
    rule: { type: "dropOnObject", nextInteraction: 13, answers: [{ objectId: 1, targetObjectId: "spirit" }] }
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
]