import { TInputError, TSignUpForm } from '../../utils/types';

export type TFormErrorState = {
  email: TInputError,
  login: TInputError,
  first_name: TInputError,
  second_name: TInputError,
  phone: TInputError,
  password: TInputError,
  confirmation_password: TInputError,
}

export type TSignUpFormProps = {
  formState: TSignUpForm;
  errorState: TFormErrorState;
};
