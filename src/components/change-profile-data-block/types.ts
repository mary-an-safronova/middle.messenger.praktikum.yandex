import { TInputError, TUser } from '../../utils/types';

export type TChangeUserFormErrorState = {
  email: TInputError,
  login: TInputError,
  first_name: TInputError,
  second_name: TInputError,
  display_name: TInputError,
  phone: TInputError,
  avatar: TInputError,
}

export type TChangeProfileDataBlockProps = {
  userInfo: TUser;
  userData: TUser;
  errorState: TChangeUserFormErrorState;
};
