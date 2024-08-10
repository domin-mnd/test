import type { IconProps } from './Icon.types';

export function PanelsIcon({
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
      <path
        d='M2.75 11.9167H10.0833V2.75H2.75V11.9167ZM2.75 19.25H10.0833V13.75H2.75V19.25ZM11.9167 19.25H19.25V10.0833H11.9167V19.25ZM11.9167 2.75V8.25H19.25V2.75H11.9167Z'
        fill={fill}
      />
    </svg>
  );
}
