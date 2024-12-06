import { Block } from '../../core';
import { TUserInfoButtonRawProps } from './types';

export default class UserInfoButtonRaw extends Block {
  constructor(props: TUserInfoButtonRawProps) {
    super('li', {
      ...props,
      className: 'user-info-button',

      button: props.button,

      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return `
      <p class="user-info-button__part {{#if (eq button "Выйти")}}user-info-button__part_extra{{/if}}">{{button}}</p>
    `;
  }
}
