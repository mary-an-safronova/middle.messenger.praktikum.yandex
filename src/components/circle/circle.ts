/* eslint-disable object-shorthand */
import { Block } from '../../core';
import { iconRight, iconLeft } from '../../assets';
import { TCircleProps } from './types';

export default class Circle extends Block {
  constructor(props: TCircleProps) {
    super('div', {
      ...props,
      className: `circle circle_${props.direction}`,

      direction: props.direction,
      iconRight: iconRight,
      iconLeft: iconLeft,
      circleNumber: props.circleNumber,

    });
  }

  render(): string {
    return `
      {{#if direction}}
        <img src="{{#if (eq direction "right")}}{{iconRight}}{{else if (eq direction "left")}}{{iconLeft}}{{/if}}" alt="Стрелка">
      {{else}}
        <p class="circle__number">{{circleNumber}}</p>
      {{/if}}
    `;
  }
}
