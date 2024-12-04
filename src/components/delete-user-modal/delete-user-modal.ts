/* eslint-disable no-console */
import { Form, FormWrap } from '..';
import {
  handleFormSubmit, handleInputChange, handleOverlayClick, inputErrorProps, navigate,
} from '../../utils';
import { Block } from '../../core';
import { TDeleteUserForm } from '../../utils/types';
import { TDeleteUserModalProps, TFormErrorState } from './types';
import { handleValidate } from '../../utils/handle-validate';

export default class DeleteUserModal extends Block {
  constructor(props: TDeleteUserModalProps) {
    const formState: TDeleteUserForm = props.formState || { login: '' };

    const errorState: TFormErrorState = props.errorState || {
      login: inputErrorProps,
    };

    super('div', {
      ...props,
      formState,
      errorState,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.stopPropagation();
          evt.preventDefault();
          if (!this.props.errorState.login.error) {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              login: this.props.formState,
            });
            navigate('chatPage');
          } else {
            console.log('errors: ', this.props.errorState);
          }
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));

          const childDeleteUserForm = this.children.DeleteUserFormWrap.children.children;
          handleValidate(
            evt,
            'login',
            this.props.formState.login,
            childDeleteUserForm.children.FormInput,
            this.props.errorState,
            this.setProps.bind(this),
            this.setPropsForChildren.bind(this),
          );
        },

        click: (event: MouseEvent) => handleOverlayClick(event, props.onModalClose), // Клик на оверлей модального окна
      },

      DeleteUserFormWrap: new FormWrap({
        id: 'delete-user-form',
        name: 'delete-user-form',
        titleSize: 'size-s',
        titleText: 'Удалить пользователя',
        titleType: 'default',

        children: new Form({
          formElInCenter: false,
          buttonText: 'Удалить',
          inputType: 'text',
          inputName: 'login',
          value: formState.login,
          placeholder: 'Логин',
          required: true,
          inputError: errorState.login.error,
          errorText: errorState.login.errorText,
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
