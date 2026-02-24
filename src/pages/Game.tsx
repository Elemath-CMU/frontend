import React, { useCallback, useEffect, useRef, useState } from "react";
import Pencil from "../components/Pencil";
import StoryLine from "../components/StoryLine";
import useGameController from "./GameController";
import BorderedButton from "../components/button/BorderedButton";
import { gameData, type CheckAnswerRule, type DialogueData, type InteractiveGameData, type ObjectData, type PencilData } from "./GameData";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

function Game() {
  useGameController();
  const { state } = useLocation() as { state: { episodeIndex: number } };
  const { currentUser, nextInteractionIndex, nextEpisodeIndex, resetInteractionIndex } = useAuth();
  const navigate = useNavigate();
  const BOARD_WIDTH = 917;
  const BOARD_HEIGHT = 412;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [episodeIndex, setEpisodeIndex] = useState<number>(state?.episodeIndex || 0);
  const [interactions, setInteractions] = useState<InteractiveGameData[]>([]);
  const [interactionIndex, setInteractionIndex] = useState<number>(0);

  const [dialogues, setDialogues] = useState<DialogueData[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  const [objects, setObjects] = useState<ObjectData[]>([]);

  const [rule, setRule] = useState<null | CheckAnswerRule>(null);

  const [dragging, setDragging] = useState<{ id: number | string; offsetX: number; offsetY: number; } | null>(null);
  const [draggedObject, setDraggedObject] = useState<ObjectData | null>(null);

  const getBoardScale = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return { scaleX: 1, scaleY: 1 };
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return { scaleX: 1, scaleY: 1 };
    return {
      scaleX: BOARD_WIDTH / rect.width,
      scaleY: BOARD_HEIGHT / rect.height
    };
  }, [BOARD_WIDTH, BOARD_HEIGHT]);

  const toBoardPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: clientX, y: clientY };
    const rect = svg.getBoundingClientRect();
    const { scaleX, scaleY } = getBoardScale();
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, [getBoardScale]);

  const getTargetBounds = useCallback((targetObjectId: number | string) => {
    let targetX = BOARD_WIDTH - 200;
    let targetY = (BOARD_HEIGHT - 116) / 2;
    let targetWidth = 143;
    let targetHeight = 116;

    const targetElement = document.getElementById(String(targetObjectId));
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const topLeft = toBoardPoint(rect.left, rect.top);
      const { scaleX, scaleY } = getBoardScale();
      targetX = topLeft.x;
      targetY = topLeft.y;
      targetWidth = rect.width * scaleX;
      targetHeight = rect.height * scaleY;
      return { x: targetX, y: targetY, width: targetWidth, height: targetHeight };
    }

    if (String(targetObjectId) === "spirit") {
      return { x: targetX, y: targetY, width: targetWidth, height: targetHeight };
    }

    return null;
  }, [BOARD_HEIGHT, BOARD_WIDTH, getBoardScale, toBoardPoint]);

  const onMouseDown = (id: number | string) => (e: React.MouseEvent<SVGGElement>) => {
    const selectedObject = objects.find(o => o.id === id)!;
    const point = toBoardPoint(e.clientX, e.clientY);
    setDragging({
      id,
      offsetX: point.x - selectedObject.x,
      offsetY: point.y - selectedObject.y
    });
    setDraggedObject(selectedObject);
  };
  const onTouchStart = (id: number | string) => (e: React.TouchEvent<SVGGElement>) => {
    const touch = e.touches[0];
    const selectedObject = objects.find(o => o.id === id)!;
    const point = toBoardPoint(touch.clientX, touch.clientY);
    setDragging({
      id,
      offsetX: point.x - selectedObject.x,
      offsetY: point.y - selectedObject.y
    });
    setDraggedObject(selectedObject);
  };

  const onMouseMove = (e: React.MouseEvent<SVGGElement>) => {
    if (!dragging) return;
    const point = toBoardPoint(e.clientX, e.clientY);

    const { id, offsetX, offsetY } = dragging;
    const x = point.x - offsetX;
    const y = point.y - offsetY;

    setObjects((objs) =>
      objs.map((o) => (o.id === id ? { ...o, x, y } : o))
    );
    setDraggedObject((obj) => obj && obj.id === id ? { ...obj, x, y } : obj);
  };
  const onTouchMove = (e: React.TouchEvent<SVGGElement>) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const point = toBoardPoint(touch.clientX, touch.clientY);

    const { id, offsetX, offsetY } = dragging;
    const x = point.x - offsetX;
    const y = point.y - offsetY;

    setObjects((objs) =>
      objs.map((o) => (o.id === id ? { ...o, x, y } : o))
    );
    setDraggedObject((obj) => obj && obj.id === id ? { ...obj, x, y } : obj);
  };

  const onMouseUp = () => setDragging(null);
  const onTouchCancel = () => setDragging(null);
  const onTouchEnd = () => setDragging(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const gameInteractions = gameData[episodeIndex];
      if (!gameInteractions) {
        alert("เกมหมดแล้วจ้า");
        navigate('/map', { replace: true });
        return;
      }
      setInteractions(gameInteractions);
      if (gameInteractions[interactionIndex].type === "playground") {
        setDialogues(gameInteractions[interactionIndex].dialogues);
        setObjects(gameInteractions[interactionIndex].objects);
        setRule(gameInteractions[interactionIndex].rule);
      } else if (gameInteractions[interactionIndex].type === "checkpoint") {
        setDialogues([]);
        setObjects([]);
        setRule(null);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [episodeIndex, interactionIndex, navigate]);

  // Check if an object is within bounds of a target
  const isWithinBounds = (draggedObj: ObjectData, targetX: number, targetY: number, targetWidth: number, targetHeight: number) => {
    let objX = draggedObj.x;
    const objY = draggedObj.y;

    let objWidth = 62; // default width for pencil
    let objHeight = draggedObj.type === "pencil" ? draggedObj.length : 62;

    if (draggedObj.type === "pencil" && draggedObj.orientation === "horizontal") {
      // When rotated 90°, swap dimensions and adjust position
      [objWidth, objHeight] = [objHeight, objWidth];
      // The rotation happens around (0,0), so after 90° rotation, the bounds shift
      objX = draggedObj.x - draggedObj.length;
    }

    const objRight = objX + objWidth;
    const objBottom = objY + objHeight;
    const targetRight = targetX + targetWidth;
    const targetBottom = targetY + targetHeight;

    return (
      objX < targetRight &&
      objRight > targetX &&
      objY < targetBottom &&
      objBottom > targetY
    );
  };

  // Main check answer function
  const checkAnswer = useCallback(() => {
    if (!rule) return;
    if (rule.type === "dropOnObject") {
      const usedObjectIds = new Set<number | string>();
      const remainingAnswers = rule.answers.filter((answer) => {
        if (!draggedObject) return true;

        const targetBounds = getTargetBounds(answer.targetObjectId);
        if (!targetBounds) return true;

        const isCorrect = draggedObject.id === answer.objectId && isWithinBounds(
          draggedObject,
          targetBounds.x,
          targetBounds.y,
          targetBounds.width,
          targetBounds.height
        );

        if (isCorrect) {
          usedObjectIds.add(draggedObject.id);
          setDraggedObject(null);
          return false;
        }

        return true;
      });

      if (remainingAnswers.length !== rule.answers.length) {
        setRule({ ...rule, answers: remainingAnswers });
      }

      if (usedObjectIds.size > 0) {
        setObjects((prevObjects) => prevObjects.filter(o => !usedObjectIds.has(o.id)));
      }
    }
    else if (rule.type === "dropOnArea") {
      const usedObjectIds = new Set<number | string>();
      const remainingAnswers = rule.answers.filter((answer) => {
        if (!draggedObject) return true;

        const isCorrect = draggedObject.id === answer.objectId && isWithinBounds(
          draggedObject,
          answer.area.x,
          answer.area.y,
          answer.area.width,
          answer.area.height
        );

        if (isCorrect) {
          usedObjectIds.add(draggedObject.id);
          setDraggedObject(null);
          return false;
        }

        return true;
      });

      if (remainingAnswers.length !== rule.answers.length) {
        setRule({ ...rule, answers: remainingAnswers });
      }

      if (usedObjectIds.size > 0) {
        setObjects((prevObjects) => prevObjects.filter(o => !usedObjectIds.has(o.id)));
      }
    }
    else if (rule.type === "lastDialogue") {
      if (dialogueIndex >= dialogues.length) {
        setRule(null);
        setInteractionIndex((prev) => prev + 1);
        setDialogueIndex(0);
        nextInteractionIndex();
      }
    }
    else if (rule.type === "snapToPosition") {
      const answersToSnap = new Map<number | string, { x: number; y: number }>();
      const remainingAnswers = rule.answers.filter((answer) => {
        if (!draggedObject) return true;

        const tolerance = 15; // pixels
        const distanceX = Math.abs(draggedObject.x - answer.position.x);
        const distanceY = Math.abs(draggedObject.y - answer.position.y);

        if (draggedObject.id === answer.objectId && distanceX <= tolerance && distanceY <= tolerance) {
          answersToSnap.set(draggedObject.id, { x: answer.position.x, y: answer.position.y });
          setDraggedObject(null);
          return false;
        }

        return true;
      });

      if (answersToSnap.size > 0) {
        setObjects((prevObjects) =>
          prevObjects.map((o) => {
            const snap = answersToSnap.get(o.id);
            if (!snap) return o;
            return { ...o, x: snap.x, y: snap.y, fixed: true };
          })
        );
      }

      if (remainingAnswers.length !== rule.answers.length) {
        setRule({ ...rule, answers: remainingAnswers });
      }
    }
    else if (rule.type === "snapObjectWithThisPropertiesToPosition") {
      const answersToSnap = new Map<number | string, { x: number; y: number }>();
      const remainingAnswers = rule.answers.filter((answer) => {
        if (!draggedObject) return true;

        const tolerance = 15; // pixels
        const distanceX = Math.abs(draggedObject.x - answer.position.x);
        const distanceY = Math.abs(draggedObject.y - answer.position.y);

        if (distanceX <= tolerance && distanceY <= tolerance) {
          if (draggedObject.type !== answer.objectProperties.type) return true;
          if (draggedObject.type === "pencil" && answer.objectProperties.type === "pencil") {
            if (draggedObject.length !== answer.objectProperties.length) return true;
            if (draggedObject.orientation !== answer.objectProperties.orientation) return true;
            if (draggedObject.color !== answer.objectProperties.color) return true;
            answersToSnap.set(draggedObject.id, { x: answer.position.x, y: answer.position.y });
            return false;
          }
        }

        return true;
      });

      if (answersToSnap.size > 0) {
        setObjects((prevObjects) =>
          prevObjects.map((o) => {
            const snap = answersToSnap.get(o.id);
            if (!snap) return o;
            return { ...o, x: snap.x, y: snap.y, fixed: true };
          })
        );
      }

      if (remainingAnswers.length !== rule.answers.length) {
        setRule({ ...rule, answers: remainingAnswers });
      }
    }
  }, [dialogueIndex, dialogues.length, draggedObject, getTargetBounds, nextInteractionIndex, rule]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (dragging == null) {
      const timer = setTimeout(() => {
        checkAnswer();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [checkAnswer, dragging]);

  useEffect(() => {
    if (rule && rule.type !== "lastDialogue" && rule.answers.length === 0) {
      const timer = setTimeout(() => {
        setRule(null);
        setInteractionIndex((prev) => prev + 1);
        setDialogueIndex(0);
        nextInteractionIndex();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [nextInteractionIndex, rule]);

  return (
    <div className="font-mali h-dvh w-screen relative touch-none">
      <div className="flex h-1/3 w-full bg-linear-to-b from-[#FFF1F6] to-[#CFE1F9]" />
      <div id="board" key="board" className="flex h-2/3 w-full bg-[#DFC1A4]" />
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={onMouseUp}
        onTouchCancel={onTouchCancel}
        onTouchEnd={onTouchEnd}
      >
        <foreignObject x="0" y="0" width={BOARD_WIDTH} height={BOARD_HEIGHT}>
          <div className="flex flex-row justify-between items-center px-5">
            <div className="w-24"></div>
            <div className="flex justify-center items-center gap-3">
              {interactions[interactionIndex]?.type === "playground" && dialogues[dialogueIndex] &&
                <div className="flex justify-center items-center">
                  <StoryLine story={dialogues[dialogueIndex].text} onNext={() => {
                    checkAnswer();
                    if (dialogueIndex <= dialogues.length - 1) {
                      setDialogueIndex(dialogueIndex + 1);
                    }
                  }} canClickNext={dialogues[dialogueIndex].canClickNext} />
                  <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_96_6)">
                      <path d="M40.8203 20.0986C41.5756 20.462 41.5756 21.538 40.8203 21.9014L2.43359 40.3701C1.76969 40.6895 1 40.2055 1 39.4688V2.53125C1 1.7945 1.76969 1.31046 2.43359 1.62988L40.8203 20.0986Z" fill="white" stroke="url(#paint0_linear_96_6)" strokeWidth="2" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_96_6" x1="45" y1="21" x2="-15" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D1AADB" />
                        <stop offset="1" stopColor="#5263D2" />
                      </linearGradient>
                      <clipPath id="clip0_96_6">
                        <rect width="43" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              }
              {interactions[interactionIndex]?.type === "checkpoint" &&
                <div className="p-0.5 rounded-[20px] bg-linear-to-b from-[#D1AADB] to-[#5263D2]">
                  <div className="flex flex-col p-5 gap-6 rounded-[18px] bg-white">
                    <div className="text-base">{interactions[interactionIndex].text}</div>
                    <div className="flex justify-center items-center gap-10">
                      <button type="button" className="flex p-1.5 bg-linear-to-b from-[#E8E2F8] to-[#C6CDF9] text-primary rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)]" onClick={() => {
                        nextEpisodeIndex();
                        navigate('/map', { replace: true });
                      }}>
                        <div className="flex gap-2 px-8 py-4 w-full h-full rounded-full bg-white text-primary text-base font-semibold">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_708_1218)">
                              <path d="M19.875 7.125H3C2.70163 7.125 2.41548 7.24353 2.2045 7.4545C1.99353 7.66548 1.875 7.95163 1.875 8.25V12.75C1.87853 15.1146 2.77334 17.3909 4.38094 19.125H3C2.70163 19.125 2.41548 19.2435 2.2045 19.4545C1.99353 19.6655 1.875 19.9516 1.875 20.25C1.875 20.5484 1.99353 20.8345 2.2045 21.0455C2.41548 21.2565 2.70163 21.375 3 21.375H19.5C19.7984 21.375 20.0845 21.2565 20.2955 21.0455C20.5065 20.8345 20.625 20.5484 20.625 20.25C20.625 19.9516 20.5065 19.6655 20.2955 19.4545C20.0845 19.2435 19.7984 19.125 19.5 19.125H18.1191C18.9274 18.252 19.5636 17.2342 19.9941 16.125C21.0673 16.094 22.0862 15.6458 22.8342 14.8755C23.5822 14.1053 24.0004 13.0737 24 12V11.25C23.9988 10.1564 23.5638 9.10787 22.7904 8.33455C22.0171 7.56124 20.9686 7.12624 19.875 7.125ZM18.375 12.75C18.3726 14.0728 18.0033 15.3691 17.3082 16.4946C16.613 17.62 15.6193 18.5306 14.4375 19.125H8.0625C6.88071 18.5306 5.88698 17.62 5.19183 16.4946C4.49668 15.3691 4.12738 14.0728 4.125 12.75V9.375H18.375V12.75ZM21.75 12C21.7497 12.3744 21.6372 12.7401 21.4272 13.0501C21.2172 13.36 20.9192 13.6 20.5716 13.7391C20.6073 13.4106 20.6251 13.0804 20.625 12.75V9.5325C20.9592 9.67837 21.2437 9.91853 21.4435 10.2236C21.6433 10.5286 21.7498 10.8853 21.75 11.25V12ZM6.375 4.5V2.25C6.375 1.95163 6.49353 1.66548 6.7045 1.4545C6.91548 1.24353 7.20163 1.125 7.5 1.125C7.79837 1.125 8.08452 1.24353 8.2955 1.4545C8.50647 1.66548 8.625 1.95163 8.625 2.25V4.5C8.625 4.79837 8.50647 5.08452 8.2955 5.2955C8.08452 5.50647 7.79837 5.625 7.5 5.625C7.20163 5.625 6.91548 5.50647 6.7045 5.2955C6.49353 5.08452 6.375 4.79837 6.375 4.5ZM10.125 4.5V2.25C10.125 1.95163 10.2435 1.66548 10.4545 1.4545C10.6655 1.24353 10.9516 1.125 11.25 1.125C11.5484 1.125 11.8345 1.24353 12.0455 1.4545C12.2565 1.66548 12.375 1.95163 12.375 2.25V4.5C12.375 4.79837 12.2565 5.08452 12.0455 5.2955C11.8345 5.50647 11.5484 5.625 11.25 5.625C10.9516 5.625 10.6655 5.50647 10.4545 5.2955C10.2435 5.08452 10.125 4.79837 10.125 4.5ZM13.875 4.5V2.25C13.875 1.95163 13.9935 1.66548 14.2045 1.4545C14.4155 1.24353 14.7016 1.125 15 1.125C15.2984 1.125 15.5845 1.24353 15.7955 1.4545C16.0065 1.66548 16.125 1.95163 16.125 2.25V4.5C16.125 4.79837 16.0065 5.08452 15.7955 5.2955C15.5845 5.50647 15.2984 5.625 15 5.625C14.7016 5.625 14.4155 5.50647 14.2045 5.2955C13.9935 5.08452 13.875 4.79837 13.875 4.5Z" fill="#6A7AC8" />
                            </g>
                            <defs>
                              <clipPath id="clip0_708_1218">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          อยากพัก
                        </div>
                      </button>
                      <button type="button" className="flex p-1.5 bg-white text-primary rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)]" onClick={() => {
                        setRule(null);
                        setDialogueIndex(0);
                        setInteractionIndex(0);
                        setEpisodeIndex((prev) => prev + 1)
                        nextEpisodeIndex();
                      }}>
                        <div className="flex gap-2 px-8 py-4 w-full h-full rounded-full bg-linear-to-r from-[#ACD189] to-[#79B0BA] text-white text-base font-semibold">
                          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10.125C0 12.1275 0.593821 14.0851 1.70637 15.7501C2.81892 17.4152 4.40023 18.7129 6.25033 19.4793C8.10043 20.2456 10.1362 20.4461 12.1003 20.0554C14.0643 19.6648 15.8685 18.7005 17.2845 17.2845C18.7005 15.8684 19.6648 14.0643 20.0555 12.1003C20.4461 10.1362 20.2456 8.10043 19.4793 6.25033C18.7129 4.40022 17.4152 2.81891 15.7501 1.70637C14.0851 0.593817 12.1275 -3.8147e-06 10.125 -3.8147e-06C7.4406 0.00297356 4.86699 1.07067 2.96883 2.96883C1.07067 4.86699 0.00297771 7.44059 0 10.125ZM18 10.125C18 11.6825 17.5381 13.2051 16.6728 14.5001C15.8075 15.7951 14.5776 16.8045 13.1386 17.4005C11.6997 17.9966 10.1163 18.1525 8.58866 17.8487C7.06106 17.5448 5.65787 16.7948 4.55653 15.6935C3.4552 14.5921 2.70517 13.1889 2.40132 11.6613C2.09746 10.1337 2.25341 8.55033 2.84945 7.11136C3.44549 5.6724 4.45485 4.44249 5.74988 3.57717C7.04492 2.71186 8.56747 2.25 10.125 2.25C12.2129 2.25223 14.2146 3.08263 15.691 4.559C17.1674 6.03536 17.9978 8.0371 18 10.125ZM10.0791 6.32906C10.1836 6.22418 10.3078 6.14096 10.4445 6.08418C10.5813 6.0274 10.7279 5.99817 10.8759 5.99817C11.024 5.99817 11.1706 6.0274 11.3074 6.08418C11.4441 6.14096 11.5683 6.22418 11.6728 6.32906L14.6728 9.32906C14.7777 9.43357 14.8609 9.55777 14.9177 9.69451C14.9745 9.83126 15.0037 9.97787 15.0037 10.1259C15.0037 10.274 14.9745 10.4206 14.9177 10.5574C14.8609 10.6941 14.7777 10.8183 14.6728 10.9228L11.6728 13.9228C11.5682 14.0275 11.4439 14.1105 11.3072 14.1671C11.1705 14.2237 11.0239 14.2529 10.8759 14.2529C10.7279 14.2529 10.5814 14.2237 10.4447 14.1671C10.3079 14.1105 10.1837 14.0275 10.0791 13.9228C9.97442 13.8182 9.8914 13.6939 9.83477 13.5572C9.77814 13.4205 9.74899 13.2739 9.74899 13.1259C9.74899 12.9779 9.77814 12.8314 9.83477 12.6947C9.8914 12.5579 9.97442 12.4337 10.0791 12.3291L11.1562 11.25H6.375C6.07663 11.25 5.79048 11.1315 5.5795 10.9205C5.36853 10.7095 5.25 10.4234 5.25 10.125C5.25 9.82663 5.36853 9.54048 5.5795 9.3295C5.79048 9.11852 6.07663 9 6.375 9H11.1562L10.0763 7.92093C9.97184 7.81627 9.88908 7.69205 9.8327 7.55537C9.77633 7.4187 9.74745 7.27225 9.74771 7.12441C9.74797 6.97657 9.77737 6.83023 9.83422 6.69376C9.89108 6.55728 9.97428 6.43336 10.0791 6.32906Z" fill="white" />
                          </svg>
                          ไปต่อเลย!
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              }
              <svg id="spirit" key="spirit" width="143" height="116" viewBox="0 0 143 116" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            {interactions[interactionIndex]?.type === "playground" ?
              <BorderedButton onClick={() => {
                if (interactions[interactionIndex].type === "playground") {
                  setRule(null);
                  setDialogueIndex(0);
                  setInteractionIndex(0);
                  setEpisodeIndex((prev) => prev)
                  resetInteractionIndex();
                }
              }}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4064 9.37502V14.2043L20.4107 16.6067C20.5726 16.6998 20.7143 16.8243 20.8276 16.9728C20.9409 17.1214 21.0234 17.291 21.0704 17.4718C21.1174 17.6526 21.1279 17.841 21.1013 18.0259C21.0747 18.2108 21.0115 18.3885 20.9155 18.5487C20.8194 18.709 20.6924 18.8484 20.5418 18.959C20.3912 19.0696 20.2201 19.1491 20.0385 19.1928C19.8569 19.2365 19.6684 19.2436 19.484 19.2137C19.2996 19.1837 19.123 19.1173 18.9646 19.0184L14.2771 16.2059C14.0687 16.081 13.8963 15.9043 13.7766 15.693C13.6569 15.4816 13.5939 15.2429 13.5939 15V9.37502C13.5939 9.00206 13.742 8.64437 14.0057 8.38065C14.2695 8.11693 14.6272 7.96877 15.0001 7.96877C15.3731 7.96877 15.7308 8.11693 15.9945 8.38065C16.2582 8.64437 16.4064 9.00206 16.4064 9.37502ZM26.2501 6.09377C25.8772 6.09377 25.5195 6.24193 25.2557 6.50565C24.992 6.76937 24.8439 7.12706 24.8439 7.50002V8.36369C24.3505 7.81643 23.8384 7.27268 23.2864 6.71369C21.6577 5.08511 19.5851 3.97261 17.3277 3.5152C15.0703 3.0578 12.7281 3.27577 10.5939 4.14189C8.4596 5.008 6.62791 6.48385 5.32764 8.38503C4.02738 10.2862 3.31619 12.5284 3.28296 14.8315C3.24972 17.1345 3.89591 19.3963 5.14077 21.3342C6.38564 23.2721 8.17398 24.5002 10.2823 25.7275C12.3907 26.6549 14.7256 26.9403 16.9953 26.5483C19.265 26.1562 21.3688 25.104 23.0439 23.5231C23.3152 23.267 23.4737 22.9136 23.4844 22.5406C23.4952 22.1677 23.3574 21.8057 23.1013 21.5344C22.8452 21.2631 22.4918 21.1046 22.1188 21.0938C21.7459 21.083 21.3839 21.2209 21.1126 21.477C19.8398 22.6782 18.2412 23.4778 16.5166 23.7759C14.792 24.0739 13.0177 23.8573 11.4156 23.1529C9.81336 22.4486 8.4542 21.2878 7.50784 19.8155C6.56148 18.3433 6.06987 16.6248 6.09442 14.8748C6.11897 13.1248 6.65859 11.4208 7.64588 9.97566C8.63317 8.53053 10.0244 7.40832 11.6457 6.7492C13.267 6.09007 15.0466 5.92326 16.7622 6.26959C18.4777 6.61591 20.0533 7.46003 21.2919 8.6965C21.9857 9.39846 22.6173 10.0781 23.2302 10.7813H21.5626C21.1897 10.7813 20.832 10.9294 20.5682 11.1932C20.3045 11.4569 20.1564 11.8146 20.1564 12.1875C20.1564 12.5605 20.3045 12.9182 20.5682 13.1819C20.832 13.4456 21.1897 13.5938 21.5626 13.5938H26.2501C26.6231 13.5938 26.9808 13.4456 27.2445 13.1819C27.5082 12.9182 27.6564 12.5605 27.6564 12.1875V7.50002C27.6564 7.12706 27.5082 6.76937 27.2445 6.50565C26.9808 6.24193 26.6231 6.09377 26.2501 6.09377Z" fill="#6A7AC8" />
                </svg>
              </BorderedButton> :
              <div className="w-24"></div>
            }
          </div>
        </foreignObject>
        {objects.map(obj => {
          if (obj.type === "pencil") {
            return <Pencil key={obj.id} id={obj.id} length={obj.length} width={obj.width} color={obj.color} x={obj.x} y={obj.y} onMouseDown={onMouseDown(obj.id)} onTouchStart={onTouchStart(obj.id)} orientation={obj.orientation ? (obj.orientation == "vertical" ? "up" : "right") : undefined} fixed={obj.fixed} />;
          }
          if (obj.type === "other") {
            return (
              <g key={obj.id} id={String(obj.id)} transform={`translate(${obj.x}, ${obj.y})`} onMouseDown={obj.fixed ? undefined : onMouseDown(obj.id)} onTouchStart={obj.fixed ? undefined : onTouchStart(obj.id)}>
                {obj.svg}
              </g>
            );
          }
          if (obj.type === "spawner") {
            return (
              <g key={obj.id} id={String(obj.id)} transform={`translate(${obj.x}, ${obj.y})`}
                onMouseDown={(e: React.MouseEvent<SVGGElement>) => {
                  const selectedObject = objects.find(o => o.id === obj.id)!;
                  const point = toBoardPoint(e.clientX, e.clientY);
                  if (selectedObject.type === "spawner") {
                    if (selectedObject.spawnObject.type === "pencil") {
                      const newObj: PencilData = {
                        id: Date.now(),
                        type: "pencil",
                        x: point.x + selectedObject.spawnObject.length / 2,
                        y: point.y - selectedObject.spawnObject.width / 2,
                        length: selectedObject.spawnObject.length,
                        width: selectedObject.spawnObject.width,
                        color: selectedObject.spawnObject.color,
                        orientation: selectedObject.spawnObject.orientation,
                      };
                      setObjects((prev) => [...prev, newObj]);
                      setDragging({
                        id: newObj.id,
                        offsetX: point.x - newObj.x,
                        offsetY: point.y - newObj.y
                      });
                      setDraggedObject(newObj);
                    }
                  }
                }}
                onTouchStart={(e: React.TouchEvent<SVGGElement>) => {
                  const touch = e.touches[0];
                  const selectedObject = objects.find(o => o.id === obj.id)!;
                  const point = toBoardPoint(touch.clientX, touch.clientY);
                  if (selectedObject.type === "spawner") {
                    if (selectedObject.spawnObject.type === "pencil") {
                      const newObj: PencilData = {
                        id: Date.now(),
                        type: "pencil",
                        x: point.x + selectedObject.spawnObject.length / 2,
                        y: point.y - selectedObject.spawnObject.width / 2,
                        length: selectedObject.spawnObject.length,
                        width: selectedObject.spawnObject.width,
                        color: selectedObject.spawnObject.color,
                        orientation: selectedObject.spawnObject.orientation,
                      };
                      setObjects((prev) => [...prev, newObj]);
                      setDragging({
                        id: newObj.id,
                        offsetX: point.x - newObj.x,
                        offsetY: point.y - newObj.y
                      });
                      setDraggedObject(newObj);
                    }
                  }
                }}>
                {obj.spawnIcons}
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}

export default Game;
