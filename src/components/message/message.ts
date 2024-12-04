import { Block } from '../../core';
import { TMessageProps } from './types';

export default class Message extends Block {
  constructor(props: TMessageProps) {
    super('div', {
      ...props,
      className: `message message_${props.position}`,
      position: props.position,
      content: props.content,
      type: props.type,
    });
  }

  render(): string {
    return `
      <div class="message__wrap {{#if (eq position "right")}}message__wrap_right{{else if (eq position "left")}}message__wrap_left{{/if}}">
        {{#if (eq type "text")}}
          <p class="message__text">{{content}}</p>
        {{/if}}
      </div>
    `;
  }
}
