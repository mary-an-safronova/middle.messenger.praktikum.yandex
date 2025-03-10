import { noAvatar } from '../../assets';
import { Block } from '../../core';
import { TImgNameProps } from './types';

export default class ImgName extends Block {
  constructor(props: TImgNameProps) {
    super('button', {
      ...props,
      className: 'img-name-wrap',
      chat: props.chat,
      extraClass: props.extraClass,

      events: {
        click: (evt: Event) => {
          evt.stopPropagation();
          if (props.onClick) {
            evt.preventDefault();
            props.onClick();
          }
        },
      },
    });
  }

  render(): string {
    return `
      <div class="img-wrap">
        <img class="img" src="${this.props.chat?.avatar_image === '' ? noAvatar : this.props.chat?.avatar_image}" alt="Аватар чата">
      </div>
      <p class="bold-text">${this.props.chat?.title}</p>
    `;
  }
}
