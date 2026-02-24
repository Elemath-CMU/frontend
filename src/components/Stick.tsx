export interface StickProps {
  id: number | string;
  length: number;
  width: number;
  x: number;
  y: number;
  orientation?: 'horizontal' | 'vertical';
  fixed?: boolean;
  onMouseDown?: React.MouseEventHandler<SVGGElement>;
  onTouchStart?: React.TouchEventHandler<SVGGElement>;
}

function Stick({ id: key, length, width, x, y, orientation, fixed, onMouseDown, onTouchStart }: StickProps) {
  const rotation = orientation === 'vertical' ? `rotate(90) translate(0, -${length})` : '';

  return (
    <g
      key={key}
      transform={`translate(${x}, ${y}) ${rotation}`}
      fill="none"
      onMouseDown={fixed ? undefined : onMouseDown}
      onTouchStart={fixed ? undefined : onTouchStart}
      className="cursor-grab"
    >
      <rect x="0" y="0" width={length} height={width} rx={3.5} fill="#895129" stroke="black" strokeWidth="2" />
    </g>
  );
}

export default Stick;
