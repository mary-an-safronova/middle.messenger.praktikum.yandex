import { TInputError, TMessage, TMessageForm } from '../../utils/types';

export type TFormErrorState = {
  message: TInputError,
}

export type TMessageBlockProps = {
  messageData?: TMessage;
  formState?: TMessageForm;
  errorState?: TFormErrorState;
};
