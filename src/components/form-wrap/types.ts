/* eslint-disable @typescript-eslint/no-explicit-any */
export type TFormWrapProps = {
  name?: string;
  id?: string;
  titleSize?: 'size-s' | 'size-l';
  titleText?: string;
  titleType?: 'type-error' | 'default';
  formName?: string;
  children?: any;
  onSubmit?: () => void;
};
