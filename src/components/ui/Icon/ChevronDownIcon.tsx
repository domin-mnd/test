import type { IconProps } from './Icon.types';

export function ChevronDownIcon({
  size = 24,
  fill = 'black',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_1_915)'>
        <path
          d='M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_1_915'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
