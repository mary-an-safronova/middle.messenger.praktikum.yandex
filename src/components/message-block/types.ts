import {
  TChatUser, TInputError, TChat, TMessageForm,
} from '../../utils/types';

export type TFormErrorState = {
  message: TInputError,
}

export type TMessageBlockProps = {
  chat?: TChat;
  formState?: TMessageForm;
  errorState?: TFormErrorState;
  chatUsers?: TChatUser[];
  currentUserId?: number;
  onAvatarImgClick: () => void;
};
