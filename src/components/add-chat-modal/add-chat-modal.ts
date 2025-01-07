/* eslint-disable no-console */
import { Form, FormWrap } from '..';
import {
  handleFormSubmit, handleInputChange, handleOverlayClick,
} from '../../utils';
import { inputErrorProps } from '../../utils/constants';
import { Block } from '../../core';
import { TAddChatModalProps, TFormErrorState } from './types';
import { handleValidate } from '../../utils/handle-validate';
import * as chatsControllers from '../../services/chats';
import { TAddChatForm } from '../../utils/types';

export default class AddChatModal extends Block {
  constructor(props: TAddChatModalProps) {
    const formState: TAddChatForm = props.formState || { title: '' };

    const errorState: TFormErrorState = props.errorState || {
      title: inputErrorProps,
    };

    super('div', {
      ...props,
      formState,
      errorState,

      events: {
        submit: async (evt: Event) => { // Сабмит формы
          evt.stopPropagation();
          evt.preventDefault();
          if (!this.props.errorState.title.error) {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              title: this.props.formState,
            });
            await chatsControllers.createChat(this.props.formState);
            props.onModalClose();
          } else {
            console.log('errors: ', this.props.errorState);
          }
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));

          const childAddChatForm = (this.children.AddChatFormWrap as Block).children.children;
          handleValidate(
            evt,
            'title',
            this.props.formState.title,
            (childAddChatForm as Block).children.FormInput,
            this.props.errorState,
            this.setProps.bind(this),
            this.setPropsForChildren.bind(this),
          );
        },

        click: (event: MouseEvent) => handleOverlayClick(event, props.onModalClose), // Клик на оверлей модального окна
      },

      AddChatFormWrap: new FormWrap({
        id: 'add-chat-form',
        name: 'add-chat-form',
        titleSize: 'size-s',
        titleText: 'Создать чат',
        titleType: 'default',

        children: new Form({
          formElInCenter: false,
          buttonText: 'Создать',
          inputType: 'text',
          inputName: 'title',
          value: formState.title,
          placeholder: 'Имя чата',
          required: true,
          inputError: errorState.title.error,
          errorText: errorState.title.errorText,
          formErrorText: '',
        }),
      }),
    });
  }

  render(): string {
    return `
      {{#> ModalOverlay onclick="{{onclick}}"}}
        {{#> Modal size="size-l"}}
            {{{ AddChatFormWrap }}}
        {{/Modal}}
      {{/ModalOverlay}}
    `;
  }
}
