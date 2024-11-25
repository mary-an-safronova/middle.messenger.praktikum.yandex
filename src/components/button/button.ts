import { Block } from '../../core';
import { TButtonProps } from './types';

export default class Button extends Block {
  constructor(props: TButtonProps) {
    super('button', {
      ...props,
      className: `button button_${props.styleType}`,
      styleType: props.styleType,
      type: props.type,
      text: props.text,
      onclick: props.onClick,
    });
  }

  render(): string {
    return `
      {{text}}
    `;
  }
}
