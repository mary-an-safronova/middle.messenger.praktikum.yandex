/* eslint-disable @typescript-eslint/no-explicit-any */
export type TButtonProps = {
  styleType?: 'active';
  type?: 'submit' | 'button' | 'reset';
  text?: string;
  onClick?: () => void;
  variant: 'text' | 'image' | 'btnWithChildren';
  imgIcon?: string;
  imgIconAlt?: string;
  [x: string]: any;
}
