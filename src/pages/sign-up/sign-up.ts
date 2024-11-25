/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormWrap, SignUpForm } from '../../components';
import { handleInputChange } from '../../components/utils';
import { Block } from '../../core';
import { navigate } from '../../utils/navigate';
import { TFormState } from './types';

export default class SignUpPage extends Block {
  constructor(props: Record<string, any>) {
    const formState: TFormState = props.formState || {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      confirmation_password: '',
    };

    super('div', {
      ...props,

      formState,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          console.log('handleFormSubmit: ', this.props.formState);
          navigate('navigatePage');
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps);
        },

        click: (evt: Event) => { // Клик на ссылку
          const target = evt.target as HTMLElement;
          if (target.closest('.link')) {
            navigate('signInPage');
          }
        },
      },

      SignUpFormWrap: new FormWrap({
        name: 'sign-up-form',
        id: 'sign-up-form',
        titleSize: 'size-l',
        titleText: 'Регистрация',
        onSubmit: props.submit,

        children: new SignUpForm({
          formState: formState,
        }),
      }),
    });
  }

  render(): string {
    return `
      {{#>Modal size='size-l'}}
        {{{ SignUpFormWrap }}}
      {{/Modal}}
    `;
  }
}
