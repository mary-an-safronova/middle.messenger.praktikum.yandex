import { ErrorComponent } from '../../components';
import { Block } from '../../core';

export default class InternalServerErrorPage extends Block {
  constructor() {
    super('div', {
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
