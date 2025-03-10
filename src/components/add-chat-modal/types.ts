import { TAddChatForm, TInputError } from '../../utils/types';

export type TFormErrorState = {
  title: TInputError,
}

export type TAddChatModalProps = {
  formState?: TAddChatForm;
  errorState?: TFormErrorState;
  onModalClose: () => void;
}
