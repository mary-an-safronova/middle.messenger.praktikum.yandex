/* eslint-disable max-params */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormWrap } from '../../components';
import { SignInForm } from '../../components/sign-in-form';
import { handleFormSubmit, handleInputChange } from '../../utils';
import { inputErrorProps, PATH, router } from '../../utils/constants';
import { Block } from '../../core';
import { TSignInForm } from '../../utils/types';
import { TFormErrorState } from '../../components/sign-in-form/types';
import { handleValidate } from '../../utils/handle-validate';
import * as authControllers from '../../services/auth';
import { StoreData, withStore } from '../../core/store';

const mapStateToProps = ({ currentUser }: StoreData) => ({
  currentUser,
});
class SignInPage extends Block {
  private validateField(evt: Event, inputName: string, inputValue: string, inputChild: any) {
    handleValidate(
      evt,
      inputName,
      inputValue,
      inputChild,
      this.props.errorState,
      this.setProps.bind(this),
      this.setPropsForChildren.bind(this),
    );
  }

  constructor() {
    const formState: TSignInForm = {
      login: '',
      password: '',
    };

    const errorState: TFormErrorState = {
      login: inputErrorProps,
      password: inputErrorProps,
    };

    super('div', {
      formState,
      errorState,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          if (!this.props.errorState.login.error && !this.props.errorState.password.error) {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              formState: this.props.formState,
            });

            authControllers.signIn(this.props.formState);
            this.setProps({ formState: { login: '', password: '' } });
          } else {
            console.log('errors: ', this.props.errorState);
          }
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));

          const childSignInForm = (this.children.SignInFormWrap as Block).children.children;

          this.validateField(evt, 'login', this.props.formState.login, (childSignInForm as Block).children.LoginInput);
          this.validateField(evt, 'password', this.props.formState.password, (childSignInForm as Block).children.PasswordInput);
        },

        click: (evt: Event) => { // Клик на ссылку
          const target = evt.target as HTMLElement;
          if (target.closest('.link')) {
            router.go(PATH.signUp);
          }
        },
      },

      SignInFormWrap: new FormWrap({
        name: 'sign-in-form',
        id: 'sign-in-form',
        titleSize: 'size-l',
        titleText: 'Вход',

        children: new SignInForm({
          formState: formState,
          errorState: errorState,
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

export default withStore(mapStateToProps)(SignInPage);
