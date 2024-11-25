import { UserInfoItem } from '..';
import { Block } from '../../core';
import { TChangeProfileDataBlockProps } from './types';

export default class ChangeProfileDataBlock extends Block {
  constructor(props: TChangeProfileDataBlockProps) {
    super('ul', {
      ...props,

      className: 'changed-profile-data-block',

      userInfo: props.userInfo,
      userData: props.userData,

      EmailItem: new UserInfoItem({
        name: props.userInfo.email,
        inputValue: props.userData.email,
        inputItemType: true,
        inputName: 'email-item-input',
        inputType: 'email',
        required: false,
      }),

      LoginItem: new UserInfoItem({
        name: props.userInfo.login,
        inputValue: props.userData.login,
        inputItemType: true,
        inputName: 'login-item-input',
        inputType: 'text',
        required: false,
      }),

      FirstNameItem: new UserInfoItem({
        name: props.userInfo.first_name,
        inputValue: props.userData.first_name,
        inputItemType: true,
        inputName: 'first_name-item-input',
        inputType: 'text',
        required: false,
      }),

      SecondNameItem: new UserInfoItem({
        name: props.userInfo.second_name,
        inputValue: props.userData.second_name,
        inputItemType: true,
        inputName: 'second_name-item-input',
        inputType: 'text',
        required: false,
      }),

      DisplayNameItem: new UserInfoItem({
        name: props.userInfo.display_name,
        inputValue: props.userData.display_name,
        inputItemType: true,
        inputName: 'display_name-item-input',
        inputType: 'text',
        required: false,
      }),

      PhoneItem: new UserInfoItem({
        name: props.userInfo.phone,
        inputValue: props.userData.phone,
        inputItemType: true,
        inputName: 'phone-item-input',
        inputType: 'phone',
        required: false,
      }),

    });
  }

  render(): string {
    return `
      {{{ EmailItem }}}
      {{{ LoginItem }}}
      {{{ FirstNameItem }}}
      {{{ SecondNameItem }}}
      {{{ DisplayNameItem }}}
      {{{ PhoneItem }}}
    `;
  }
}
