import { Block } from '../../core';
import { Button, Input, Link } from '../index';
import { TSignInFormProps } from './types';

export default class SignInForm extends Block {
  constructor(props: TSignInFormProps) {
    super('div', {
      ...props,

      formState: props.formState,

      LoginInput: new Input({
        name: 'login',
        type: 'text',
        error: false,
        value: props.formState.login,
        required: true,
        placeholder: 'Логин',
        errorText: '',
      }),

      PasswordInput: new Input({
        name: 'password',
        type: 'password',
        error: false,
        value: props.formState.password,
        required: true,
        placeholder: 'Пароль',
        errorText: '',
      }),

      SubmitButton: new Button({
        styleType: 'active',
        type: 'submit',
        text: 'Авторизоваться',
      }),

      SignInLink: new Link({
        size: 'small',
        text: 'Нет аккаунта?',
      }),
    });
  }

  render(): string {
    return `
        <div class="sign-in-form__elements">
          <div class="sign-in-form__inputs-wrap">
            {{{ LoginInput }}}
            {{{ PasswordInput }}}
          </div>
          <div class="sign-in-form__btns-wrap">
            {{{ SubmitButton }}}
            {{{ SignInLink }}}
          </div>
        </div>
    `;
  }
}
