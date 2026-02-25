export interface StickProps {
  id: number | string;
  length: number;
  width: number;
  x: number;
  y: number;
  orientation?: 'horizontal' | 'vertical';
  fixed?: boolean;
  cutLeft?: boolean;
  cutRight?: boolean;
  onMouseDown?: React.MouseEventHandler<SVGGElement>;
  onTouchStart?: React.TouchEventHandler<SVGGElement>;
}

function Stick({ id: key, length, width, x, y, orientation, fixed, cutLeft, cutRight, onMouseDown, onTouchStart }: StickProps) {
  const rotation = orientation === 'vertical' ? `rotate(90) translate(0, -${length})` : '';
  const clipId = `stick-clip-${key}`;

  return (
    <g
      key={key}
      transform={`translate(${x}, ${y}) ${rotation}`}
      fill="none"
      onMouseDown={fixed ? undefined : onMouseDown}
      onTouchStart={fixed ? undefined : onTouchStart}
      className="cursor-grab"
    >
      <clipPath id={clipId}>
        <rect x="0" y="0" width={length} height={width} rx={3.5} />
      </clipPath>
      <rect x="0" y="0" width={length} height={width} rx={3.5} fill="#895129" stroke="black" strokeWidth="2" />
      {cutLeft && (
        <g clipPath={`url(#${clipId})`}>
          <line x1={0} y1={0} x2={width} y2={width} stroke="black" strokeWidth="2" />
          <line x1={0} y1={width} x2={width} y2={0} stroke="black" strokeWidth="2" />
        </g>
      )}
      {cutRight && (
        <g clipPath={`url(#${clipId})`}>
          <line x1={length - width} y1={0} x2={length} y2={width} stroke="black" strokeWidth="2" />
          <line x1={length - width} y1={width} x2={length} y2={0} stroke="black" strokeWidth="2" />
        </g>
      )}
    </g>
  );
}

export default Stick;
