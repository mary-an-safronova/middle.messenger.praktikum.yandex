import { TInputError, TSignInForm } from '../../utils/types';

export type TFormErrorState = {
  login: TInputError,
  password: TInputError,
}

export type TSignInFormProps = {
  formState: TSignInForm;
  errorState: TFormErrorState;
};
