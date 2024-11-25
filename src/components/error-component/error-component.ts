import { Link, Title } from '..';
import { Block } from '../../core';
import { navigate } from '../../utils/navigate';
import { TErrorComponentProps } from './types';

export default class ErrorComponent extends Block {
  constructor(props: TErrorComponentProps) {
    super('div', {
      ...props,
      className: 'error-component',

      events: {
        click: (evt: Event) => { // Клик на ссылку
          const target = evt.target as HTMLElement;
          if (target.closest('.link')) {
            navigate('navigatePage');
          }
        },
      },

      ErrComponentTitle: new Title({
        size: 'size-xl',
        text: props.titleText,
      }),

      ErrComponentSubtitle: new Title({
        tag: 'h2',
        size: 'size-l',
        text: props.subtitleText,
      }),

      ErrComponentLink: new Link({
        size: 'small',
        text: props.linkText,
      }),
    });
  }

  render(): string {
    return `
      {{{ ErrComponentTitle }}}
      <div class="error-component__subtitleWrap">
        {{{ ErrComponentSubtitle }}}
      </div>
      {{{ ErrComponentLink }}}
    `;
  }
}
