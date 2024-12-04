import { UserInfoItem } from '..';
import { Block } from '../../core';
import { TChangePasswordDataBlockProps } from './types';

export default class ChangePasswordDataBlock extends Block {
  constructor(props: TChangePasswordDataBlockProps) {
    super('ul', {
      ...props,

      className: 'changed-password-data',

      userData: props.userData,
      errorState: props.errorState,

      OldPasswordItem: new UserInfoItem({
        name: 'Старый пароль',
        inputValue: props.userData.oldPassword,
        inputItemType: true,
        inputName: 'oldPassword',
        inputType: 'text',
        required: true,
        error: props.errorState.oldPassword.error,
        errorText: props.errorState.oldPassword.errorText,
      }),

      NewPasswordItem: new UserInfoItem({
        name: 'Новый пароль',
        inputValue: props.userData.newPassword,
        inputItemType: true,
        inputName: 'newPassword',
        inputType: 'text',
        required: true,
        error: props.errorState.newPassword.error,
        errorText: props.errorState.newPassword.errorText,
      }),

      ConfirmationPasswordItem: new UserInfoItem({
        name: 'Повторите новый пароль',
        inputValue: props.userData.confirmation_password,
        inputItemType: true,
        inputName: 'confirmation_password',
        inputType: 'text',
        required: true,
        error: props.errorState.confirmation_password.error,
        errorText: props.errorState.confirmation_password.errorText,
      }),
    });
  }

  render(): string {
    return `
      {{{ OldPasswordItem }}}
      {{{ NewPasswordItem }}}
      {{{ ConfirmationPasswordItem }}}
    `;
  }
}
