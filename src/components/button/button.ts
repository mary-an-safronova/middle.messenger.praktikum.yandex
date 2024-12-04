import { Block } from '../../core';
import { TButtonProps } from './types';

export default class Button extends Block {
  constructor(props: TButtonProps) {
    super('button', {
      ...props,
      className: `button button_${props.styleType} button_${props.variant}`,
      styleType: props.styleType,
      type: props.type,
      disabled: props.disabled,
      text: props.text,
      onclick: props.onClick,
      variant: props.variant,
      imgIcon: props.imgIcon,
      imgIconAlt: props.imgIconAlt,
      children: props.children,

      events: {
        click: (evt: Event) => {
          evt.stopPropagation();
          if (props.onClick) {
            evt.preventDefault(); // Предотвратит сабмит формы если тип не сабмит
            props.onClick();
          }
        },
      },
    });
  }

  render(): string {
    return `
      {{#if (eq variant "text")}}
        {{text}}
      {{/if}}
      {{#if (and (eq variant "image") imgIcon imgIconAlt)}}
        <img src="{{imgIcon}}" alt="{{imgIconAlt}}">
      {{/if}}
      {{#if (eq variant "btnWithChildren")}}
        {{{ children }}}
      {{/if}}
    `;
  }
}
