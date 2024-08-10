import type { IconProps } from './Icon.types';

export function ArrowLeftIcon({
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
      <g clipPath='url(#clip0_1_55)'>
        <path
          d='M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_1_55'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
