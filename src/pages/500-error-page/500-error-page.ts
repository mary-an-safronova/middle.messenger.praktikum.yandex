/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorComponent } from '../../components';
import { Block } from '../../core';

export default class InternalServerErrorPage extends Block {
  constructor(props: Record<string, any>) {
    super('div', {
      ...props,

      ErrComponent: new ErrorComponent({
        titleText: '500',
        subtitleText: 'Мы уже фиксим',
        linkText: 'Назад к чатам',
      }),
    });
  }

  render(): string {
    return `
      {{{ ErrComponent }}}
    `;
  }
}
