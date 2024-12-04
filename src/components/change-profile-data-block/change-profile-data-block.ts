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
      errorState: props.errorState,

      EmailItem: new UserInfoItem({
        name: props.userInfo.email,
        inputValue: props.userData.email,
        inputItemType: true,
        inputName: 'email',
        inputType: 'email',
        required: false,
        error: props.errorState.email.error,
        errorText: props.errorState.email.errorText,
      }),

      LoginItem: new UserInfoItem({
        name: props.userInfo.login,
        inputValue: props.userData.login,
        inputItemType: true,
        inputName: 'login',
        inputType: 'text',
        required: false,
        error: props.errorState.login.error,
        errorText: props.errorState.login.errorText,
      }),

      FirstNameItem: new UserInfoItem({
        name: props.userInfo.first_name,
        inputValue: props.userData.first_name,
        inputItemType: true,
        inputName: 'first_name',
        inputType: 'text',
        required: false,
        error: props.errorState.first_name.error,
        errorText: props.errorState.first_name.errorText,
      }),

      SecondNameItem: new UserInfoItem({
        name: props.userInfo.second_name,
        inputValue: props.userData.second_name,
        inputItemType: true,
        inputName: 'second_name',
        inputType: 'text',
        required: false,
        error: props.errorState.second_name.error,
        errorText: props.errorState.second_name.errorText,
      }),

      DisplayNameItem: new UserInfoItem({
        name: props.userInfo.display_name,
        inputValue: props.userData.display_name,
        inputItemType: true,
        inputName: 'display_name',
        inputType: 'text',
        required: false,
        error: props.errorState.display_name.error,
        errorText: props.errorState.display_name.errorText,
      }),

      PhoneItem: new UserInfoItem({
        name: props.userInfo.phone,
        inputValue: props.userData.phone,
        inputItemType: true,
        inputName: 'phone',
        inputType: 'phone',
        required: false,
        error: props.errorState.phone.error,
        errorText: props.errorState.phone.errorText,
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
