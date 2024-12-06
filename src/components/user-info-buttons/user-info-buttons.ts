import { UserInfoButtonRaw } from '..';
import { Block } from '../../core';
import { TUserInfoButtonsProps } from './types';

export default class UserInfoButtons extends Block {
  constructor(props: TUserInfoButtonsProps) {
    super('ul', {
      ...props,
      className: 'user-info-buttons',

      ChangeDataButton: new UserInfoButtonRaw({
        button: 'Изменить данные',
        onClick: props.changeDataButtonClick,
      }),

      ChangePasswordButton: new UserInfoButtonRaw({
        button: 'Изменить пароль',
        onClick: props.changePasswordButtonClick,
      }),

      LogOutButton: new UserInfoButtonRaw({
        button: 'Выйти',
        onClick: props.logOutButtonClick,
      }),
    });
  }

  render(): string {
    return `
      {{{ ChangeDataButton }}}
      {{{ ChangePasswordButton }}}
      {{{ LogOutButton }}}
    `;
  }
}
