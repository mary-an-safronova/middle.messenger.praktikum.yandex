import { Block } from '../../core';
import { Button, Input, Link } from '../index';
import { TSignUpFormProps } from './types';

export default class SignUpForm extends Block {
  constructor(props: TSignUpFormProps) {
    super('div', {
      ...props,

      formState: props.formState,

      EmailInput: new Input({
        name: 'email',
        type: 'text',
        error: false,
        value: props.formState.email,
        required: true,
        placeholder: 'Почта',
        errorText: '',
      }),

      LoginInput: new Input({
        name: 'login',
        type: 'text',
        error: false,
        value: props.formState.login,
        required: true,
        placeholder: 'Логин',
        errorText: '',
      }),

      FirstNameInput: new Input({
        name: 'first_name',
        type: 'text',
        error: false,
        value: props.formState.first_name,
        required: true,
        placeholder: 'Имя',
        errorText: '',
      }),

      SecondNameInput: new Input({
        name: 'second_name',
        type: 'text',
        error: false,
        value: props.formState.second_name,
        required: true,
        placeholder: 'Фамилия',
        errorText: '',
      }),

      PhoneInput: new Input({
        name: 'phone',
        type: 'text',
        error: false,
        value: props.formState.phone,
        required: true,
        placeholder: 'Телефон',
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

      ConfirmationPasswordInput: new Input({
        name: 'confirmation_password',
        type: 'password',
        error: false,
        value: props.formState.confirmation_password,
        required: true,
        placeholder: 'Пароль (ещё раз)',
        errorText: '',
      }),

      SubmitButton: new Button({
        styleType: 'active',
        type: 'submit',
        text: 'Зарегистрироваться',
        variant: 'text',
      }),

      SignInLink: new Link({
        size: 'small',
        text: 'Войти',
      }),
    });
  }

  render(): string {
    return `
        <div class="sign-up-form__elements">
          <div class="sign-up-form__inputs-wrap">
            {{{ EmailInput }}}
            {{{ LoginInput }}}
            {{{ FirstNameInput }}}
            {{{ SecondNameInput }}}
            {{{ PhoneInput }}}
            {{{ PasswordInput }}}
            {{{ ConfirmationPasswordInput }}}
          </div>
          <div class="sign-up-form__btns-wrap">
            {{{ SubmitButton }}}
            {{{ SignInLink }}}
          </div>
        </div>
    `;
  }
}
