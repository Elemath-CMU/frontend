import React, { useCallback, useEffect, useState } from "react";
import Pencil from "../components/Pencil";
import StoryLine from "../components/StoryLine";
import useGameController from "./GameController";
import BorderedButton from "../components/button/BorderedButton";

export interface DialogueData {
  text: string | React.ReactNode;
  canClickNext: boolean;
}

export interface PencilData {
  id: number;
  type: "pencil";
  length: number;
  x: number;
  y: number;
  fixed?: boolean;
}

export type ObjectData = PencilData;

export interface CheckAnswerDropOnObject {
  type: "dropOnObject";
  objectId: number | string;
  targetObjectId: number | string;
}

export type CheckAnswerRule = CheckAnswerDropOnObject;

export interface PlayGroundData {
  interaction: number;
  type: "playground";
  dialogues: DialogueData[];
  objects: ObjectData[];
  rules: CheckAnswerRule[];
}

export type InteractiveGameData = PlayGroundData;

function Game() {
  useGameController();
  const [interactions, setInteractions] = useState<InteractiveGameData[]>([]);
  const [interactionIndex, setInteractionIndex] = useState<number>(0);

  const [dialogues, setDialogues] = useState<DialogueData[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  const [objects, setObjects] = useState<ObjectData[]>([]);

  const [rules, setRules] = useState<CheckAnswerRule[]>([{
    type: "dropOnObject",
    objectId: 1,
    targetObjectId: "spirit",
  }]);

  const [dragging, setDragging] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);

  const onMouseDown = (id: number) => (e: React.MouseEvent<SVGGElement>) => {
    const obj = objects.find(o => o.id === id)!;

    setDragging({
      id,
      offsetX: e.clientX - obj.x,
      offsetY: e.clientY - obj.y
    });
  };
  const onTouchStart = (id: number) => (e: React.TouchEvent<SVGGElement>) => {
    const touch = e.touches[0];
    const obj = objects.find(o => o.id === id)!;
    setDragging({
      id,
      offsetX: touch.clientX - obj.x,
      offsetY: touch.clientY - obj.y
    });
  };

  const onMouseMove = (e: React.MouseEvent<SVGGElement>) => {
    if (!dragging) return;

    const { id, offsetX, offsetY } = dragging;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    setObjects((objs) =>
      [...(objs.filter(o => o.id !== id)),
      { ...objs.find(o => o.id === id)!, x, y }
      ]
    );
  };
  const onTouchMove = (e: React.TouchEvent<SVGGElement>) => {
    if (!dragging) return;
    const touch = e.touches[0];

    const { id, offsetX, offsetY } = dragging;
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;

    setObjects((objs) =>
      [...(objs.filter(o => o.id !== id)),
      { ...objs.find(o => o.id === id)!, x, y }
      ]
    );
  };

  const onMouseUp = () => setDragging(null);
  const onTouchCancel = () => setDragging(null);

  useEffect(() => {
    const gameInteractions: InteractiveGameData[] = [
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
          { id: 1, type: "pencil", length: 200, x: 700, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 1,
            targetObjectId: "spirit",
          }
        ]
      },
      {
        interaction: 2,
        type: "playground",
        dialogues: [
          {
            text: <span>เก่งมาก ทีนี้เธอลองลากดินสอแท่งที่<u><strong>ยาวกว่า</strong></u>มาที่ฉันสิ</span>,
            canClickNext: false
          }
        ],
        objects: [
          { id: 1, type: "pencil", length: 200, x: 700, y: 300 },
          { id: 2, type: "pencil", length: 50, x: 800, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 1,
            targetObjectId: "spirit",
          }
        ]
      },
      {
        interaction: 3,
        type: "playground",
        dialogues: [
          {
            text: "เยี่ยมเลย! ทีนี้เรามาลุยของจริงกันดีกว่า!",
            canClickNext: true
          },
          {
            text: <span>เธอลากดินสอแท่งที่<u><strong>ยาวกว่า</strong></u>มาที่ฉันสิ</span>,
            canClickNext: false
          }
        ],
        objects: [
          { id: 1, type: "pencil", length: 50, x: 700, y: 300 },
          { id: 2, type: "pencil", length: 200, x: 800, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 2,
            targetObjectId: "spirit",
          }
        ]
      },
      {
        interaction: 4,
        type: "playground",
        dialogues: [
          {
            text: <span>เก่งมาก ทีนี้เธอลองลากดินสอแท่งที่<u><strong>ยาวกว่า</strong></u>มาที่ฉันสิ</span>,
            canClickNext: false
          }
        ],
        objects: [
          { id: 1, type: "pencil", length: 200, x: 700, y: 300 },
          { id: 2, type: "pencil", length: 75, x: 800, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 1,
            targetObjectId: "spirit",
          }
        ]
      },
      {
        interaction: 5,
        type: "playground",
        dialogues: [
          {
            text: <span>เก่งมาก ทีนี้เธอลองลากดินสอแท่งที่<u><strong>ยาวกว่า</strong></u>มาที่ฉันสิ</span>,
            canClickNext: false
          }
        ],
        objects: [
          { id: 1, type: "pencil", length: 75, x: 700, y: 300 },
          { id: 2, type: "pencil", length: 150, x: 800, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 2,
            targetObjectId: "spirit",
          }
        ]
      },
      {
        interaction: 6,
        type: "playground",
        dialogues: [
          {
            text: <span>เก่งมาก ทีนี้เธอลองลากดินสอแท่งที่<u><strong>ยาวกว่า</strong></u>มาที่ฉันสิ</span>,
            canClickNext: false
          }
        ],
        objects: [
          { id: 1, type: "pencil", length: 100, x: 700, y: 300 },
          { id: 2, type: "pencil", length: 75, x: 800, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 1,
            targetObjectId: "spirit",
          }
        ]
      },
      {
        interaction: 7,
        type: "playground",
        dialogues: [
          {
            text: <span>เก่งมาก ทีนี้เธอลองลากดินสอแท่งที่<u><strong>ยาวกว่า</strong></u>มาที่ฉันสิ</span>,
            canClickNext: false
          }
        ],
        objects: [
          { id: 1, type: "pencil", length: 110, x: 700, y: 300 },
          { id: 2, type: "pencil", length: 100, x: 800, y: 300 },
        ],
        rules: [
          {
            type: "dropOnObject",
            objectId: 1,
            targetObjectId: "spirit",
          }
        ]
      },
    ];
    fetch("/", {
      method: "GET",
    }).then(() => {
      setInteractions(gameInteractions);
      setDialogues(gameInteractions[interactionIndex].dialogues);
      setObjects(gameInteractions[interactionIndex].objects);
      setRules(gameInteractions[interactionIndex].rules);
    });
  }, [interactionIndex]);

  // Check if an object is within bounds of a target
  const isWithinBounds = (objX: number, objY: number, objLength: number, targetX: number, targetY: number, targetWidth: number, targetHeight: number) => {
    const objRight = objX + objLength;
    const targetRight = targetX + targetWidth;
    const targetBottom = targetY + targetHeight;

    return (
      objX < targetRight &&
      objRight > targetX &&
      objY < targetBottom &&
      objY + objLength > targetY
    );
  };

  // Main check answer function
  const checkAnswer = useCallback(() => {
    const usedObjectIds: (number | string)[] = [];
    const completedRules: CheckAnswerRule[] = [];
    for (const rule of rules) {
      if (rule.type === "dropOnObject") {
        const draggedObj = objects.find(o => o.id === rule.objectId);
        if (!draggedObj) continue;

        // Define target bounds (spirit position and size)
        const targetX = window.innerWidth - 200;
        const targetY = (window.innerHeight - 116) / 2;
        const targetWidth = 143;
        const targetHeight = 116;

        const isCorrect = isWithinBounds(
          draggedObj.x,
          draggedObj.y,
          draggedObj.length,
          targetX,
          targetY,
          targetWidth,
          targetHeight
        );

        if (isCorrect) {
          usedObjectIds.push(draggedObj.id);
          completedRules.push(rule);
        }
      }
    }
    if (completedRules.length > 0) {
      setRules((prevRules) => prevRules.filter(r => !completedRules.includes(r)));
    }
    if (usedObjectIds.length > 0) {
      setObjects((prevObjects) => prevObjects.filter(o => !usedObjectIds.includes(o.id)));
    }
  }, [objects, rules]);

  useEffect(() => {
    if (dragging == null) {
      const timer = setTimeout(() => {
        checkAnswer();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [dragging, checkAnswer]);

  useEffect(() => {
    if (rules.length === 0) {
      const timer = setTimeout(() => {
        setInteractionIndex((prev) => prev + 1);
        setDialogueIndex(0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [rules]);

  return (
    <div className="font-mali h-dvh w-screen relative">
      <div className="flex h-1/3 w-full bg-linear-to-b from-[#FFF1F6] to-[#CFE1F9]" />
      <div key="board" className="flex h-2/3 w-full bg-[#DFC1A4]" />
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={onMouseUp}
        onTouchCancel={onTouchCancel}
      >
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div className="w-full h-full flex p-10 justify-end items-center">
            <svg key="spirit" width="143" height="116" viewBox="0 0 143 116" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M125.166 49.2065C125.166 77.7284 102.39 106.527 71.4384 106.527C40.4864 106.527 17.7107 81.3207 17.7107 52.7988C17.7107 24.2769 37.2442 1.5 68.1962 1.5C99.1482 1.5 125.166 20.6846 125.166 49.2065Z" fill="white" />
              <path d="M32.5603 62.9727C29.8486 71.1738 22.1527 76.525 13.7737 73.7545C5.39472 70.984 -0.494451 61.141 2.21721 52.9399C4.92887 44.7388 13.9196 40.3363 22.2987 43.1068C30.6777 45.8773 35.272 54.7715 32.5603 62.9727Z" fill="white" />
              <path d="M128.332 73.7545C136.533 71.0428 143.662 61.1778 140.891 52.7988C138.121 44.4198 129.227 39.8255 121.026 42.5372C112.824 45.2488 108.422 54.2396 111.193 62.6186C113.963 70.9976 120.131 76.4662 128.332 73.7545Z" fill="white" />
              <path d="M50.522 87.7824C51.1239 99.3668 41.1929 109.299 28.3405 109.967C15.4881 110.635 4.58114 101.785 3.97919 90.2009C3.37723 78.6165 13.3082 68.684 26.1606 68.0162C39.0131 67.3484 49.92 76.198 50.522 87.7824Z" fill="white" />
              <path d="M89.2024 87.7824C88.6005 99.3668 98.5315 109.299 111.384 109.967C124.236 110.635 135.143 101.785 135.745 90.2009C136.347 78.6165 126.416 68.684 113.564 68.0162C100.711 67.3484 89.8044 76.198 89.2024 87.7824Z" fill="white" />
              <path d="M68.1962 105.482C68.1962 109.702 61.042 113.124 52.2168 113.124C43.3917 113.124 36.2375 109.702 36.2375 105.482C36.2375 101.261 43.3917 97.8393 52.2168 97.8393C61.042 97.8393 68.1962 101.261 68.1962 105.482Z" fill="white" />
              <path d="M103.397 105.018C103.397 109.239 96.2429 112.661 87.4177 112.661C78.5926 112.661 71.4384 109.239 71.4384 105.018C71.4384 100.798 78.5926 97.3762 87.4177 97.3762C96.2429 97.3762 103.397 100.798 103.397 105.018Z" fill="white" />
              <path d="M20.1289 42.9136C5.77058 38.9767 -3.26123 53.5665 4.14949 66.0721M130.03 75.144C144.62 95.0603 129.303 115.411 102.471 108.029C94.8711 118.193 72.5966 113.124 71.2071 106.64M9.45656 75.144C-5.1333 95.0603 10.1831 115.411 37.0152 108.029C44.6151 118.193 66.8896 113.124 68.2791 106.64M122.851 42.9136C137.209 38.9767 146.241 53.5665 138.83 66.0721M20.0268 33.8912C30.6637 -8.71177 105.945 -9.87839 122.851 33.8912" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="53.9712" cy="40.947" rx="5.55804" ry="8.33706" transform="rotate(66.5725 53.9712 40.947)" fill="#B5CDFF" />
              <ellipse cx="5.55804" cy="8.33706" rx="5.55804" ry="8.33706" transform="matrix(-0.397589 0.917564 0.917564 0.397589 83.0723 32.5324)" fill="#B5CDFF" />
              <path d="M72.5963 57.9128C73.2138 58.2693 73.2138 59.1607 72.5963 59.5172L64.954 63.9295C64.3364 64.2861 63.5645 63.8404 63.5645 63.1273V54.3027C63.5645 53.5896 64.3364 53.1439 64.954 53.5005L72.5963 57.9128Z" fill="#FCD9DF" />
              <path d="M70.0488 57.9128C69.4313 58.2693 69.4313 59.1607 70.0488 59.5172L77.6911 63.9295C78.3087 64.2861 79.0806 63.8404 79.0806 63.1273V54.3027C79.0806 53.5896 78.3087 53.1439 77.6911 53.5005L70.0488 57.9128Z" fill="#FCD9DF" />
            </svg>
          </div>
        </foreignObject>
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div className="w-full flex justify-end items-start p-5">
            <BorderedButton onClick={() => window.location.reload()}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.4064 9.37502V14.2043L20.4107 16.6067C20.5726 16.6998 20.7143 16.8243 20.8276 16.9728C20.9409 17.1214 21.0234 17.291 21.0704 17.4718C21.1174 17.6526 21.1279 17.841 21.1013 18.0259C21.0747 18.2108 21.0115 18.3885 20.9155 18.5487C20.8194 18.709 20.6924 18.8484 20.5418 18.959C20.3912 19.0696 20.2201 19.1491 20.0385 19.1928C19.8569 19.2365 19.6684 19.2436 19.484 19.2137C19.2996 19.1837 19.123 19.1173 18.9646 19.0184L14.2771 16.2059C14.0687 16.081 13.8963 15.9043 13.7766 15.693C13.6569 15.4816 13.5939 15.2429 13.5939 15V9.37502C13.5939 9.00206 13.742 8.64437 14.0057 8.38065C14.2695 8.11693 14.6272 7.96877 15.0001 7.96877C15.3731 7.96877 15.7308 8.11693 15.9945 8.38065C16.2582 8.64437 16.4064 9.00206 16.4064 9.37502ZM26.2501 6.09377C25.8772 6.09377 25.5195 6.24193 25.2557 6.50565C24.992 6.76937 24.8439 7.12706 24.8439 7.50002V8.36369C24.3505 7.81643 23.8384 7.27268 23.2864 6.71369C21.6577 5.08511 19.5851 3.97261 17.3277 3.5152C15.0703 3.0578 12.7281 3.27577 10.5939 4.14189C8.4596 5.008 6.62791 6.48385 5.32764 8.38503C4.02738 10.2862 3.31619 12.5284 3.28296 14.8315C3.24972 17.1345 3.89591 19.3963 5.14077 21.3342C6.38564 23.2721 8.17398 24.8002 10.2823 25.7275C12.3907 26.6549 14.7256 26.9403 16.9953 26.5483C19.265 26.1562 21.3688 25.104 23.0439 23.5231C23.3152 23.267 23.4737 22.9136 23.4844 22.5406C23.4952 22.1677 23.3574 21.8057 23.1013 21.5344C22.8452 21.2631 22.4918 21.1046 22.1188 21.0938C21.7459 21.083 21.3839 21.2209 21.1126 21.477C19.8398 22.6782 18.2412 23.4778 16.5166 23.7759C14.792 24.0739 13.0177 23.8573 11.4156 23.1529C9.81336 22.4486 8.4542 21.2878 7.50784 19.8155C6.56148 18.3433 6.06987 16.6248 6.09442 14.8748C6.11897 13.1248 6.65859 11.4208 7.64588 9.97566C8.63317 8.53053 10.0244 7.40832 11.6457 6.7492C13.267 6.09007 15.0466 5.92326 16.7622 6.26959C18.4777 6.61591 20.0533 7.46003 21.2919 8.6965C21.9857 9.39846 22.6173 10.0781 23.2302 10.7813H21.5626C21.1897 10.7813 20.832 10.9294 20.5682 11.1932C20.3045 11.4569 20.1564 11.8146 20.1564 12.1875C20.1564 12.5605 20.3045 12.9182 20.5682 13.1819C20.832 13.4456 21.1897 13.5938 21.5626 13.5938H26.2501C26.6231 13.5938 26.9808 13.4456 27.2445 13.1819C27.5082 12.9182 27.6564 12.5605 27.6564 12.1875V7.50002C27.6564 7.12706 27.5082 6.76937 27.2445 6.50565C26.9808 6.24193 26.6231 6.09377 26.2501 6.09377Z" fill="#6A7AC8" />
              </svg>
            </BorderedButton>
          </div>
          <div className="flex justify-center -m-20">
            {dialogues[dialogueIndex] && <StoryLine story={dialogues[dialogueIndex].text} onNext={() => {
              if (dialogueIndex < dialogues.length - 1) {
                setDialogueIndex(dialogueIndex + 1);
              }
            }} canClickNext={dialogues[dialogueIndex].canClickNext} />}
          </div>
        </foreignObject>
        {objects.map(obj => {
          if (obj.type === "pencil") {
            return <Pencil key={obj.id} id={obj.id} length={obj.length} x={obj.x} y={obj.y} onMouseDown={onMouseDown(obj.id)} onTouchStart={onTouchStart(obj.id)} fixed={obj.fixed} />;
          }
          return null;
        })}
      </svg>
    </div>
  );
}

export default Game;
