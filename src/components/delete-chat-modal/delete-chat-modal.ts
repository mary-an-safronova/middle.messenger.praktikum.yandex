/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Button, FormWrap } from '..';
import { handleOverlayClick } from '../../utils';
import { Block } from '../../core';

export default class DeleteChatModal extends Block {
  constructor(props: Record<string, any>) {
    super('div', {
      ...props,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.stopPropagation();
          evt.preventDefault();
          props.formSubmit();
          props.onModalClose();
        },

        click: (event: MouseEvent) => handleOverlayClick(event, props.onModalClose), // Клик на оверлей модального окна
      },

      DeleteChatFormWrap: new FormWrap({
        id: 'delete-chat-form',
        name: 'delete-chat-form',
        titleSize: 'size-s',
        titleText: 'Удалить чат?',
        titleType: 'default',

        children: new Button({
          styleType: 'active',
          type: 'submit',
          text: 'Удалить',
          variant: 'text',
          extraClass: 'delete-chat__button',
        }),
      }),
    });
  }

  render(): string {
    return `
      {{#> ModalOverlay onclick="{{onclick}}"}}
        {{#> Modal size="size-l"}}
            {{{ DeleteChatFormWrap }}}
        {{/Modal}}
      {{/ModalOverlay}}
    `;
  }
}
