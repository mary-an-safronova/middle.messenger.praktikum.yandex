/* eslint-disable @typescript-eslint/no-explicit-any */
export type TButtonProps = {
  styleType?: 'active' | 'inactive';
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
  variant: 'text' | 'image' | 'btnWithChildren';
  imgIcon?: string;
  imgIconAlt?: string;
  [x: string]: any;
}
