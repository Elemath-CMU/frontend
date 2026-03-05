import { gameData } from "../../pages/GameData";

export interface MapButtonActiveProps {
  index: number;
  currentEpisode?: number;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function MapButtonActive({ index, children, type = "button", onClick }: MapButtonActiveProps) {
  return (
    <div className="flex items-center">
      {index !== 0 &&
        <div className="bg-primary-light w-20 h-10 -mr-9.5 py-1">
          <div className="flex w-full h-full bg-primary"></div>
        </div>
      }
      <button
        type={type}
        className="flex p-1.5 z-1 bg-linear-to-b from-[#D1AADB] to-[#5263D2]  rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)] border-white border-2"
        onClick={onClick}
      >
        <div className="px-8 py-5 w-full h-full rounded-full bg-linear-to-r from-[#5263D2] to-[#D1AADB] text-white text-4xl font-semibold shadow-[inset_0px_0px_8px_0px_#E9E6F7]">
          {children}
        </div>
      </button>
      {index !== gameData.length - 1 &&
        <div className="bg-primary-light w-20 h-10 -ml-9.5 py-1">
          <div className="flex w-full h-full bg-primary"></div>
        </div>
      }
    </div>
  );
}
export default MapButtonActive;
