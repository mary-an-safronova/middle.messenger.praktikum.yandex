import { UserInfoItem } from '..';
import { Block } from '../../core';
import { TUserInfoProps } from './types';

export default class UserInfo extends Block {
  constructor(props: TUserInfoProps) {
    super('ul', {
      ...props,

      className: 'user-info',

      userInfo: props.userInfo,
      userData: props.userData,

      EmailItem: new UserInfoItem({
        name: props.userInfo.email,
        value: props.userData.email,
      }),

      LoginItem: new UserInfoItem({
        name: props.userInfo.login,
        value: props.userData.login,
      }),

      FirstNameItem: new UserInfoItem({
        name: props.userInfo.first_name,
        value: props.userData.first_name,
      }),

      SecondNameItem: new UserInfoItem({
        name: props.userInfo.second_name,
        value: props.userData.second_name,
      }),

      DisplayNameItem: new UserInfoItem({
        name: props.userInfo.display_name,
        value: props.userData.display_name,
      }),

      PhoneItem: new UserInfoItem({
        name: props.userInfo.phone,
        value: props.userData.phone,
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
