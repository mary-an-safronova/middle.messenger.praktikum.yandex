/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormWrap } from '..';
import { handleInputChange, handleOverlayClick } from '../utils';
import { Block } from '../../core';
import { navigate } from '../../utils/navigate';
import { TformState } from './types';

export default class DeleteUserModal extends Block {
  constructor(props: Record<string, any>) {
    const formState: TformState = props.formState || { login: '' };

    super('div', {
      ...props,
      formState,
      onclick: props.onModalClose,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          console.log('handleFormSubmit: ', this.props.formState);
          navigate('navigatePage');
          this.setProps({
            formState: { login: '' },
          });
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));
        },

        click: (event: MouseEvent) => handleOverlayClick(event, props.onModalClose), // Клик на оверлей модального окна
      },

      DeleteUserFormWrap: new FormWrap({
        id: 'delete-user-form',
        name: 'delete-user-form',
        titleSize: 'size-s',
        titleText: 'Удалить пользователя',
        titleType: 'default',
        onSubmit: props.submit,

        children: new Form({
          formElInCenter: false,
          buttonText: 'Удалить',
          inputType: 'text',
          inputName: 'login',
          value: formState.login,
          placeholder: 'Логин',
          required: true,
          inputError: false,
          errorText: '',
          formErrorText: '',
        }),
      }),
    });
  }

  render(): string {
    return `
      {{#> ModalOverlay onclick="{{onclick}}"}}
        {{#> Modal size="size-l"}}
          {{{ DeleteUserFormWrap }}}
        {{/Modal}}
      {{/ModalOverlay}}
    `;
  }
}
