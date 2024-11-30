/* eslint-disable @typescript-eslint/no-explicit-any */
import { Block } from '../../core';
import { TMessageModalItem } from '../../utils/types';

export default class IconTextItem extends Block {
  constructor(props: TMessageModalItem & {
    buttonType: string;
    onClick: (evt: MouseEvent) => void,
  }) {
    super('button', {
      ...props,
      className: 'icon-text__wrap',
      type: props.buttonType,
      onClick: props.onClick,

      events: {
        click: (evt: MouseEvent) => {
          evt.preventDefault();
          props.onClick(evt);
        },
      },
    });
  }

  render(): string {
    return `
      <img class="icon-text__icon" src="{{icon}}" alt="Скрепка">
      <p class="icon-text__text">{{text}}</p>
    `;
  }
}
