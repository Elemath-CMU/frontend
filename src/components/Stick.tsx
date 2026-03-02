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
          points={`0,0 3,${width / 15} 0,${2 * width / 15} 3,${3 * width / 15} 0,${4 * width / 15} 3,${5 * width / 15} 0,${6 * width / 15} 3,${7 * width / 15} 0,${8 * width / 15} 3,${9 * width / 15} 0,${10 * width / 15} 3,${11 * width / 15} 0,${12 * width / 15} 3,${13 * width / 15} 0,${14 * width / 15} 3,${width}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      )}
      {cutRight && (
        <polyline
          points={`${length},0 ${length - 3},${width / 15} ${length},${2 * width / 15} ${length - 3},${3 * width / 15} ${length},${4 * width / 15} ${length - 3},${5 * width / 15} ${length},${6 * width / 15} ${length - 3},${7 * width / 15} ${length},${8 * width / 15} ${length - 3},${9 * width / 15} ${length},${10 * width / 15} ${length - 3},${11 * width / 15} ${length},${12 * width / 15} ${length - 3},${13 * width / 15} ${length},${14 * width / 15} ${length - 3},${width}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      )}
    </g>
  );
}

export default Stick;
