/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormWrap } from '../../components';
import { SignInForm } from '../../components/sign-in-form';
import { handleInputChange } from '../../components/utils';
import { Block } from '../../core';
import { navigate } from '../../utils/navigate';
import { TFormState } from './types';

export default class SignInPage extends Block {
  constructor(props: Record<string, any>) {
    const formState: TFormState = props.formState || {
      login: '',
      password: '',
    };
    super('div', {
      ...props,

      formState,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          console.log('handleFormSubmit: ', this.props.formState);

          navigate('navigatePage');
          this.setProps({
            formState: { login: '', password: '' },
          });
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));
        },

        click: (evt: Event) => { // Клик на ссылку
          const target = evt.target as HTMLElement;
          if (target.closest('.link')) {
            navigate('signUpPage');
          }
        },
      },

      SignInFormWrap: new FormWrap({
        name: 'sign-in-form',
        id: 'sign-in-form',
        titleSize: 'size-l',
        titleText: 'Вход',
        onSubmit: props.submit,

        children: new SignInForm({
          formState: formState,
        }),
      }),
    });
  }

  render(): string {
    return `
      {{#>Modal size='size-l'}}
        {{{ SignInFormWrap }}}
      {{/Modal}}
    `;
  }
}
