import { gameData } from "../../pages/GameData";

export interface MapButtonInactiveProps {
  index: number;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function MapButtonInactive({ index, children, type = "button", onClick }: MapButtonInactiveProps) {
  return (
    <div className="flex items-center">
      {index !== 0 &&
        <div className="flex bg-primary-light w-20 h-10 -mr-9.5 py-1">
          <div className="flex w-full h-full bg-white"></div>
        </div>
      }
      <button
        type={type}
        className="flex p-1.5 z-1 bg-linear-to-b from-[#F2DDF5] to-[#6A7AC8]  rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)] border-white border-2"
        onClick={onClick}
      >
        <div className="px-8 py-5 w-full h-full rounded-full bg-[#E8E2F8] text-primary text-4xl font-semibold">
          {children}
        </div>
      </button>
      {index !== gameData.length - 1 &&
        <div className="bg-primary-light w-20 h-10 -ml-9.5 py-1">
          <div className="flex w-full h-full bg-white"></div>
        </div>
      }
    </div>
  );
}
export default MapButtonInactive;
