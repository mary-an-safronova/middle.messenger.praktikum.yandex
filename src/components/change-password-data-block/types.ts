import { TInputError, TUserPassword } from '../../utils/types';

export type TChangePassFormErrorState = {
  oldPassword: TInputError,
  newPassword: TInputError,
  confirmation_password: TInputError,
}

export type TChangePasswordDataBlockProps = {
  userData: TUserPassword;
  errorState: TChangePassFormErrorState;
};
