import { Block } from '../../core';
import { TAvatarProps } from './types';

export default class Avatar extends Block {
  constructor(props: TAvatarProps) {
    super('button', {
      ...props,
      className: 'avatar',

      avatarIcon: props.avatarIcon,

      events: {
        click: props.changeAvatarClick,
      },
    });
  }

  render(): string {
    return `
      <img class="avatar__img" src="{{avatarIcon}}" alt="Аватар" />
      <div class="avatar__cover">
        <p class="avatar__text">Поменять аватар</p>
      </div>
    `;
  }
}
