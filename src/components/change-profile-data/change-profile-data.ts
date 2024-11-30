import { Avatar, Button } from '..';
import { Block } from '../../core';
import { TChangeProfileDataProps } from './types';

export default class ChangeProfileData extends Block {
  constructor(props: TChangeProfileDataProps) {
    super('div', {
      ...props,

      avatarIcon: props.avatarIcon,

      children: props.children,

      ChangeProfileAvatar: new Avatar({
        avatarIcon: props.avatarIcon,
      }),

      SubmitButton: new Button({
        type: 'submit',
        text: 'Сохранить',
        styleType: 'active',
        variant: 'text',
      }),
    });
  }

  render(): string {
    return `
      <form class="change-profile-data" onsubmit={{submit}}>
        {{{ ChangeProfileAvatar }}}
        <div class="change-profile-data__info-wrap">
          {{{ children }}}
        </div>
        {{{ SubmitButton }}}
      </form>
    `;
  }
}
