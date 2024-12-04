/* eslint-disable no-console */
import { Form, FormWrap } from '..';
import {
  handleFormSubmit, handleInputChange, handleOverlayClick, inputErrorProps, navigate,
} from '../../utils';
import { Block } from '../../core';
import { TAddUserForm } from '../../utils/types';
import { TAddUserModalProps, TFormErrorState } from './types';
import { handleValidate } from '../../utils/handle-validate';

export default class AddUserModal extends Block {
  constructor(props: TAddUserModalProps) {
    const formState: TAddUserForm = props.formState || { login: '' };

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
            this.setProps({ formState: { login: '' } });
          } else {
            console.log('errors: ', this.props.errorState);
          }
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));

          const childAddUserForm = this.children.AddUserFormWrap.children.children;
          handleValidate(
            evt,
            'login',
            this.props.formState.login,
            childAddUserForm.children.FormInput,
            this.props.errorState,
            this.setProps.bind(this),
            this.setPropsForChildren.bind(this),
          );
        },

        click: (event: MouseEvent) => handleOverlayClick(event, props.onModalClose), // Клик на оверлей модального окна
      },

      AddUserFormWrap: new FormWrap({
        id: 'add-user-form',
        name: 'add-user-form',
        titleSize: 'size-s',
        titleText: 'Добавить пользователя',
        titleType: 'default',

        children: new Form({
          formElInCenter: false,
          buttonText: 'Добавить',
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
            {{{ AddUserFormWrap }}}
        {{/Modal}}
      {{/ModalOverlay}}
    `;
  }
}
