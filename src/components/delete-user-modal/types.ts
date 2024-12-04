import { TDeleteUserForm, TInputError } from '../../utils/types';

export type TFormErrorState = {
  login: TInputError,
}

export type TDeleteUserModalProps = {
  formState?: TDeleteUserForm;
  errorState?: TFormErrorState;
  onModalClose: () => void;
}
