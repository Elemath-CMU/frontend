import { useState } from "react";
import Pencil from "../components/Pencil";
import StoryLine from "../components/StoryLine";
import useGameController from "./GameController";

export interface ObjectData {
  id: number;
  type: "pencil";
  length: number;
  x: number;
  y: number;
  fixed?: boolean;
}

export interface DialogueData {
  text: string;
  canClickNext: boolean;
}

const data = {
  episode: 1,
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
    { id: 1, type: "pencil", length: 150, x: 100, y: 100 },
  ]
}

function Game() {
  useGameController();
  const [objects, setObjects] = useState<ObjectData[]>([
    { id: 1, type: "pencil", length: 150, x: (window.innerWidth - 62) / 2, y: window.innerHeight / 3 + (window.innerHeight * 2/3 - 150) / 2 },
  ]);
  const [dialogues, setDialogues] = useState<DialogueData[]>(data.dialogues);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

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

    console.log(`Moving object ${id} to (${x}, ${y})`);

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

  // useEffect(() => {
  //   setObjects(data.objects);
  //   setDialogues(data.dialogues);
  // }, []);

  return (
    <div className="font-mali h-dvh w-screen relative">
      <div className="flex h-1/3 w-full bg-linear-to-b from-[#FFF1F6] to-[#CFE1F9]"></div>
      <div className="flex h-2/3 w-full bg-[#DFC1A4]"></div>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={onMouseUp}
        onTouchCancel={onTouchCancel}
      >
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div className="w-full flex justify-end items-start p-5">
            <button
              type="button"
              title="Replay"
              className="flex p-1.5 bg-linear-to-b from-[#D1AADB] to-[#5263D2] text-primary rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)] border-white border-2"
            >
              <div className="px-8 py-4 w-full h-full rounded-full bg-white text-primary text-base font-semibold">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4064 9.37502V14.2043L20.4107 16.6067C20.5726 16.6998 20.7143 16.8243 20.8276 16.9728C20.9409 17.1214 21.0234 17.291 21.0704 17.4718C21.1174 17.6526 21.1279 17.841 21.1013 18.0259C21.0747 18.2108 21.0115 18.3885 20.9155 18.5487C20.8194 18.709 20.6924 18.8484 20.5418 18.959C20.3912 19.0696 20.2201 19.1491 20.0385 19.1928C19.8569 19.2365 19.6684 19.2436 19.484 19.2137C19.2996 19.1837 19.123 19.1173 18.9646 19.0184L14.2771 16.2059C14.0687 16.081 13.8963 15.9043 13.7766 15.693C13.6569 15.4816 13.5939 15.2429 13.5939 15V9.37502C13.5939 9.00206 13.742 8.64437 14.0057 8.38065C14.2695 8.11693 14.6272 7.96877 15.0001 7.96877C15.3731 7.96877 15.7308 8.11693 15.9945 8.38065C16.2582 8.64437 16.4064 9.00206 16.4064 9.37502ZM26.2501 6.09377C25.8772 6.09377 25.5195 6.24193 25.2557 6.50565C24.992 6.76937 24.8439 7.12706 24.8439 7.50002V8.36369C24.3505 7.81643 23.8384 7.27268 23.2864 6.71369C21.6577 5.08511 19.5851 3.97261 17.3277 3.5152C15.0703 3.0578 12.7281 3.27577 10.5939 4.14189C8.4596 5.008 6.62791 6.48385 5.32764 8.38503C4.02738 10.2862 3.31619 12.5284 3.28296 14.8315C3.24972 17.1345 3.89591 19.3963 5.14077 21.3342C6.38564 23.2721 8.17398 24.8002 10.2823 25.7275C12.3907 26.6549 14.7256 26.9403 16.9953 26.5483C19.265 26.1562 21.3688 25.104 23.0439 23.5231C23.3152 23.267 23.4737 22.9136 23.4844 22.5406C23.4952 22.1677 23.3574 21.8057 23.1013 21.5344C22.8452 21.2631 22.4918 21.1046 22.1188 21.0938C21.7459 21.083 21.3839 21.2209 21.1126 21.477C19.8398 22.6782 18.2412 23.4778 16.5166 23.7759C14.792 24.0739 13.0177 23.8573 11.4156 23.1529C9.81336 22.4486 8.4542 21.2878 7.50784 19.8155C6.56148 18.3433 6.06987 16.6248 6.09442 14.8748C6.11897 13.1248 6.65859 11.4208 7.64588 9.97566C8.63317 8.53053 10.0244 7.40832 11.6457 6.7492C13.267 6.09007 15.0466 5.92326 16.7622 6.26959C18.4777 6.61591 20.0533 7.46003 21.2919 8.6965C21.9857 9.39846 22.6173 10.0781 23.2302 10.7813H21.5626C21.1897 10.7813 20.832 10.9294 20.5682 11.1932C20.3045 11.4569 20.1564 11.8146 20.1564 12.1875C20.1564 12.5605 20.3045 12.9182 20.5682 13.1819C20.832 13.4456 21.1897 13.5938 21.5626 13.5938H26.2501C26.6231 13.5938 26.9808 13.4456 27.2445 13.1819C27.5082 12.9182 27.6564 12.5605 27.6564 12.1875V7.50002C27.6564 7.12706 27.5082 6.76937 27.2445 6.50565C26.9808 6.24193 26.6231 6.09377 26.2501 6.09377Z" fill="#6A7AC8" />
                </svg>
              </div>
            </button>
          </div>
          <div className="flex justify-center -m-20">
            <StoryLine story={dialogues[dialogueIndex].text} onNext={() => {
              if (dialogueIndex < dialogues.length - 1) {
                setDialogueIndex(dialogueIndex + 1);
              }
            }} canClickNext={dialogues[dialogueIndex].canClickNext} />
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
