import { Block } from '../../core';
import { TTitleProps } from './types';

export default class Title extends Block {
  constructor(props: TTitleProps) {
    super('div', {
      ...props,

      tag: props.tag,
      size: props.size,
      type: props.type,
      text: props.text,
    });
  }

  render(): string {
    return `
      {{#if (eq tag "h2")}}
        <h2 class="title title_{{size}} title_{{type}}">{{text}}</h2>
      {{else}}
        <h1 class="title title_{{size}} title_{{type}}">{{text}}</h1>
      {{/if}}
    `;
  }
}
