export interface BorderedButtonProps {
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function BorderedButton({ children, type = "button", onClick }: BorderedButtonProps) {
    return (
        <button type={type} className="flex p-1.5 bg-linear-to-b from-[#D1AADB] to-[#5263D2] text-primary rounded-full cursor-pointer shadow-[0_0_12px_0_rgba(175,168,207,0.5)] border-white border-2" onClick={onClick}>
            <div className="px-8 py-4 w-full h-full rounded-full bg-white text-primary text-base font-semibold">
                {children}
            </div>
        </button>
    );
};

export default BorderedButton;
