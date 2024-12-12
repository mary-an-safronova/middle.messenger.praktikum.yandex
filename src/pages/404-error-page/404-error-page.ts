import { ErrorComponent } from '../../components';
import { Block } from '../../core';

export default class BadRequestPage extends Block {
  constructor() {
    super('div', {
      ErrComponent: new ErrorComponent({
        titleText: '404',
        subtitleText: 'Не туда попали',
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
