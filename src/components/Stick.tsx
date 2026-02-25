export interface StickProps {
  id: number | string;
  length: number;
  width: number;
  x: number;
  y: number;
  cutLeft?: boolean;
  cutRight?: boolean;
  fixed?: boolean;
  onMouseDown?: React.MouseEventHandler<SVGGElement>;
  onTouchStart?: React.TouchEventHandler<SVGGElement>;
}

function Stick({ id: key, length, width, x, y, cutLeft, cutRight, fixed, onMouseDown, onTouchStart }: StickProps) {
  return (
    <g
      key={key}
      transform={`translate(${x}, ${y})`}
      fill="none"
      onMouseDown={fixed ? undefined : onMouseDown}
      onTouchStart={fixed ? undefined : onTouchStart}
      className="cursor-grab"
    >
      <rect x="0" y="0" width={length} height={width} rx={3.5} fill="#895129" stroke="black" strokeWidth="2" />
      {cutLeft && (
        <polyline
          points={`0,0 5,${width / 6} 0,${width / 3} 5,${width / 2} 0,${(2 * width) / 3} 5,${(5 * width) / 6} 0,${width}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      )}
      {cutRight && (
        <polyline
          points={`${length},0 ${length - 5},${width / 6} ${length},${width / 3} ${length - 5},${width / 2} ${length},${(2 * width) / 3} ${length - 5},${(5 * width) / 6} ${length},${width}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      )}
    </g>
  );
}

export default Stick;
