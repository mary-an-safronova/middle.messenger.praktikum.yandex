import { Block } from '../../core';
import { Button, Input, Link } from '../index';
import { TSignUpFormProps } from './types';

export default class SignUpForm extends Block {
  constructor(props: TSignUpFormProps) {
    super('div', {
      ...props,

      formState: props.formState,
      errorState: props.errorState,

      EmailInput: new Input({
        name: 'email',
        type: 'text',
        error: props.errorState.email.error,
        value: props.formState.email,
        required: true,
        placeholder: 'Почта',
        errorText: props.errorState.email.errorText,
      }),

      LoginInput: new Input({
        name: 'login',
        type: 'text',
        error: props.errorState.login.error,
        value: props.formState.login,
        required: true,
        placeholder: 'Логин',
        errorText: props.errorState.login.errorText,
      }),

      FirstNameInput: new Input({
        name: 'first_name',
        type: 'text',
        error: props.errorState.first_name.error,
        value: props.formState.first_name,
        required: true,
        placeholder: 'Имя',
        errorText: props.errorState.first_name.errorText,
      }),

      SecondNameInput: new Input({
        name: 'second_name',
        type: 'text',
        error: props.errorState.second_name.error,
        value: props.formState.second_name,
        required: true,
        placeholder: 'Фамилия',
        errorText: props.errorState.second_name.errorText,
      }),

      PhoneInput: new Input({
        name: 'phone',
        type: 'text',
        error: props.errorState.phone.error,
        value: props.formState.phone,
        required: true,
        placeholder: 'Телефон',
        errorText: props.errorState.phone.errorText,
      }),

      PasswordInput: new Input({
        name: 'password',
        type: 'password',
        error: props.errorState.password.error,
        value: props.formState.password,
        required: true,
        placeholder: 'Пароль',
        errorText: props.errorState.password.errorText,
      }),

      ConfirmationPasswordInput: new Input({
        name: 'confirmation_password',
        type: 'password',
        error: props.errorState.confirmation_password.error,
        value: props.formState.confirmation_password,
        required: true,
        placeholder: 'Пароль (ещё раз)',
        errorText: props.errorState.confirmation_password.errorText,
      }),

      SubmitButton: new Button({
        styleType: 'active',
        disabled: false,
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
