export interface PencilProps {
  id: number | string;
  length: number;
  width: number;
  color: string;
  x: number;
  y: number;
  orientation?: 'up' | 'down' | 'left' | 'right'; // Optional orientation prop
  fixed?: boolean;
  onMouseDown?: React.MouseEventHandler<SVGGElement>;
  onTouchStart?: React.TouchEventHandler<SVGGElement>;
}

function Pencil({ id: key, length, width, color, x, y, orientation, fixed, onMouseDown, onTouchStart }: PencilProps) {
    // Fixed dimensions
    const tipHeight = 26;
    const bottomCapHeight = 11; // Space needed for rounded bottom
    
    // Calculate positions based on width
    const margin = width * 0.032; // ~2px margin at default 62px width
    const leftX = margin;
    const rightX = width - margin;
    const tipCenterX = width / 2;
    
    // Calculate body height based on length
    const bodyHeight = length - tipHeight - bottomCapHeight;
    
    // Calculate bottom position
    const bodyBottom = tipHeight + bodyHeight + bottomCapHeight;
    const bottomY = tipHeight + bodyHeight;
    
    return (
        <g key={key} transform={`translate(${x}, ${y}) ${orientation ? `rotate(${orientation === 'up' ? 0 : orientation === 'right' ? 90 : orientation === 'down' ? 180 : -90})` : ''}`} fill="none" onMouseDown={ fixed ? undefined : onMouseDown} onTouchStart={fixed ? undefined : onTouchStart} className="cursor-grab">
            {/* Pencil body */}
            <path 
                d={`M${rightX} ${tipHeight}V${bottomY}C${rightX} ${bottomY + 6.075} ${rightX - 5.0751} ${bodyBottom} ${rightX - 11} ${bodyBottom}H${leftX + 11}C${leftX + 6.92487} ${bodyBottom} ${leftX} ${bottomY + 6.075} ${leftX} ${bottomY}V${tipHeight}H${rightX}Z`} 
                fill={color} 
                stroke="black" 
                strokeWidth="2" 
            />
            <path 
                d={`M${rightX} ${tipHeight}V${bottomY}C${rightX} ${bottomY + 6.075} ${rightX - 5.0751} ${bodyBottom} ${rightX - 11} ${bodyBottom}H${leftX + 11}C${leftX + 6.92487} ${bodyBottom} ${leftX} ${bottomY + 6.075} ${leftX} ${bottomY}V${tipHeight}H${rightX}Z`} 
                fill={color} 
                stroke="black" 
                strokeWidth="2" 
            />
            
            {/* Pencil tip */}
            <g clipPath="url(#clip0_68_77)">
                <path d={`M${tipCenterX} 0.495544C${tipCenterX + 0.3645} 0.205499 ${tipCenterX + 0.8809} 0.205499 ${tipCenterX + 1.2454} 0.495543L${rightX} 23.7175C${rightX + 0.7407} 24.3069 ${rightX + 0.3239} 25.5 ${rightX - 0.6227} 25.5H${leftX - 0.6227}C${leftX - 1.569} 25.5 ${leftX - 1.9858} 24.307 ${leftX - 1.2452} 23.7175L${tipCenterX} 0.495544Z`} fill="#FFECC3" stroke="black" strokeWidth="2" />
                <path d={`M${tipCenterX} 0L${tipCenterX + width * 0.16538} 9H${tipCenterX - width * 0.16538}L${tipCenterX} 0Z`} fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_68_77">
                    <rect width={width} height="26" fill="white" />
                </clipPath>
            </defs>
        </g>
    );
}

export default Pencil;
