export interface MapButtonActiveProps {
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function MapButtonActive({ children, type = "button", onClick }: MapButtonActiveProps) {
  return (
    <button
      type={type}
      className="flex p-1.5 bg-linear-to-b from-[#D1AADB] to-[#5263D2]  rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)] border-white border-2"
      onClick={onClick}
    >
      <div className="px-8 py-5 w-full h-full rounded-full bg-linear-to-r from-[#5263D2] to-[#D1AADB] text-white text-4xl font-semibold shadow-[inset_0px_0px_8px_0px_#E9E6F7]">
        {children}
      </div>
    </button>
  );
}
export default MapButtonActive;
