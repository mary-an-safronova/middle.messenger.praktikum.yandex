import { Button, IconTextItem } from '..';
import { Block } from '../../core';
import { TMessageModalProps } from './types';

export default class MessageModal extends Block {
  constructor(props: TMessageModalProps) {
    super('div', {
      ...props,
      className: `message-modal message-modal_${props.position}`,

      ModalItems: props.modalItems.map(
        (modalItemProps) => new Button({
          variant: 'btnWithChildren',
          type: 'button',

          children: new IconTextItem({
            ...modalItemProps,
            buttonType: 'button',
            onClick(evt) {
              props.onClick(evt);
            },
          }),
        }),
      ),
    });
  }

  render(): string {
    return `
      <div class="message-modal__inner-wrap">
        {{#each ModalItems}}
          {{{ this }}}
        {{/each}}
      </div>
    `;
  }
}
