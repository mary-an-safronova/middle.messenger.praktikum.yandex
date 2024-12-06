import { TAddUserForm, TInputError } from '../../utils/types';

export type TFormErrorState = {
  login: TInputError,
}

export type TAddUserModalProps = {
  formState?: TAddUserForm;
  errorState?: TFormErrorState;
  onModalClose: () => void;
}
