import { UserInfoItem } from '..';
import { Block } from '../../core';
import { TChangePasswordDataBlockProps } from './types';

export default class ChangePasswordDataBlock extends Block {
  constructor(props: TChangePasswordDataBlockProps) {
    super('ul', {
      ...props,

      className: 'changed-password-data',

      userData: props.userData,

      OldPasswordItem: new UserInfoItem({
        name: 'Старый пароль',
        inputValue: props.userData.oldPassword,
        inputItemType: true,
        inputName: 'old-password-item-input',
        inputType: 'text',
        required: true,
      }),

      NewPasswordItem: new UserInfoItem({
        name: 'Новый пароль',
        inputValue: props.userData.newPassword,
        inputItemType: true,
        inputName: 'new-password-item-input',
        inputType: 'text',
        required: true,
      }),

      ConfirmationPasswordItem: new UserInfoItem({
        name: 'Повторите новый пароль',
        inputValue: props.userData.confirmation_password,
        inputItemType: true,
        inputName: 'confirmation-password-item-input',
        inputType: 'text',
        required: true,
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
