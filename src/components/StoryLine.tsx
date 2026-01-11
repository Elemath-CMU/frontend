export interface StoryLineProps {
  story: React.ReactNode;
  onNext: React.MouseEventHandler<HTMLButtonElement>;
  canClickNext?: boolean;
}

function StoryLine({ story, onNext, canClickNext = true }: StoryLineProps) {
    return (
        <div className="p-0.5 rounded-[20px] bg-linear-to-b from-[#D1AADB] to-[#5263D2]">
            <div className="flex flex-col p-5 gap-6 rounded-[18px] bg-white">
                <div className="text-base">{story}</div>
                {canClickNext && <div className="flex justify-end"><button type="button" className="text-primary text-sm font-semibold cursor-pointer" onClick={onNext}>กดเพื่อไปต่อ</button></div>}
            </div>
        </div>
    );
}

export default StoryLine;
