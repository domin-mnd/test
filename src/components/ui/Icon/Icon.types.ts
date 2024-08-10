import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Fill color, use "currentColor" for cases where the color is inherited from the certain state. */
  fill?: string;
  /** Width & height shorthand. */
  size?: number;
}

export type IconComponent = React.FC<IconProps>;
