export interface PencilProps {
  id: number | string;
  length: number; // length in pixels (e.g., 100-300)
  x: number;
  y: number;
  fixed?: boolean;
  onMouseDown?: React.MouseEventHandler<SVGGElement>;
  onTouchStart?: React.TouchEventHandler<SVGGElement>;
}

function Pencil({ id: key, length, x, y, fixed, onMouseDown, onTouchStart }: PencilProps) {
    // Fixed dimensions
    const tipHeight = 26;
    const bottomCapHeight = 11; // Space needed for rounded bottom
    const strokeWidth = 2;
    const width = 62;
    
    // Calculate body height based on length
    const bodyHeight = length - tipHeight - bottomCapHeight;
    const totalHeight = length + strokeWidth; // Add stroke width to prevent cutoff
    
    // Calculate bottom position
    const bodyBottom = tipHeight + bodyHeight + bottomCapHeight;
    const bottomY = tipHeight + bodyHeight;
    
    return (
        <g key={key} transform={`translate(${x}, ${y})`} fill="none" onMouseDown={ fixed ? undefined : onMouseDown} onTouchStart={fixed ? undefined : onTouchStart} className="cursor-grab">
            {/* Pencil body */}
            <path 
                d={`M60 ${tipHeight}V${bottomY}C60 ${bottomY + 6.075} 55.0751 ${bodyBottom} 49 ${bodyBottom}H13C6.92487 ${bodyBottom} 2 ${bottomY + 6.075} 2 ${bottomY}V${tipHeight}H60Z`} 
                fill="#F9D17B" 
                stroke="black" 
                strokeWidth="2" 
            />
            <path 
                d={`M60 ${tipHeight}V${bottomY}C60 ${bottomY + 6.075} 55.0751 ${bodyBottom} 49 ${bodyBottom}H13C6.92487 ${bodyBottom} 2 ${bottomY + 6.075} 2 ${bottomY}V${tipHeight}H60Z`} 
                fill="#F9D17B" 
                stroke="black" 
                strokeWidth="2" 
            />
            
            {/* Pencil tip */}
            <g clipPath="url(#clip0_68_77)">
                <path d="M30.3773 0.495544C30.7418 0.205499 31.2582 0.205499 31.6227 0.495543L60.8031 23.7175C61.5438 24.3069 61.127 25.5 60.1804 25.5H1.81957C0.873013 25.5 0.456231 24.307 1.19688 23.7175L30.3773 0.495544Z" fill="#FFECC3" stroke="black" strokeWidth="2" />
                <path d="M30.84 0L41.0937 9H20.5863L30.84 0Z" fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_68_77">
                    <rect width="62" height="26" fill="white" />
                </clipPath>
            </defs>
        </g>
    );
}

export default Pencil;
