/* eslint-disable @typescript-eslint/no-explicit-any */
import { Circle } from '..';
import { Block } from '../../core';

export default class BackButton extends Block {
  constructor(props: Record<string, any>) {
    super('div', {
      ...props,

      className: 'back-button',

      BackButtonCircle: new Circle({
        direction: 'left',
      }),
    });
  }

  render(): string {
    return `
      {{{ BackButtonCircle }}}
    `;
  }
}
