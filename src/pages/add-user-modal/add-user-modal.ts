/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormWrap } from '../../components';
import { handleInputChange } from '../../components/utils';
import { Block } from '../../core';
import { navigate } from '../../utils/navigate';
import { TFormState } from './types';

export default class AddUserModal extends Block {
  constructor(props: Record<string, any>) {
    const formState: TFormState = props.formState || { login: '' };

    super('div', {
      ...props,
      formState,

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
      },

      AddUserFormWrap: new FormWrap({
        id: 'add-user-form',
        name: 'add-user-form',
        titleSize: 'size-s',
        titleText: 'Добавить пользователя',
        titleType: 'default',
        onSubmit: props.submit,

        children: new Form({
          formElInCenter: false,
          buttonText: 'Добавить',
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
      {{#> ModalOverlay}}
        {{#> Modal size="size-l"}}
            {{{ AddUserFormWrap }}}
        {{/Modal}}
      {{/ModalOverlay}}
    `;
  }
}
