/* eslint-disable max-params */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormWrap, SignUpForm } from '../../components';
import { handleFormSubmit, handleInputChange } from '../../utils';
import { inputErrorProps, PATH, router } from '../../utils/constants';
import { Block } from '../../core';
import { TSignUpForm } from '../../utils/types';
import { TFormErrorState } from '../../components/sign-up-form/types';
import { handleValidate } from '../../utils/handle-validate';
import { StoreData, withStore } from '../../core/store';
import * as authControllers from '../../services/auth';

const mapStateToProps = ({ currentUser }: StoreData) => ({
  currentUser,
});

class SignUpPage extends Block {
  private validateField(evt: Event, inputName: string, inputValue: string, inputChild: any, prevInputValue?: string) {
    handleValidate(
      evt,
      inputName,
      inputValue,
      inputChild,
      this.props.errorState,
      this.setProps.bind(this),
      this.setPropsForChildren.bind(this),
      prevInputValue,
    );
  }

  constructor() {
    const formState: TSignUpForm = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      confirmation_password: '',
    };

    const errorState: TFormErrorState = {
      email: inputErrorProps,
      login: inputErrorProps,
      first_name: inputErrorProps,
      second_name: inputErrorProps,
      phone: inputErrorProps,
      password: inputErrorProps,
      confirmation_password: inputErrorProps,
    };

    super('div', {
      formState,
      errorState,

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          if (!this.props.errorState.email.error
            && !this.props.errorState.login.error
            && !this.props.errorState.first_name.error
            && !this.props.errorState.second_name.error
            && !this.props.errorState.phone.error
            && !this.props.errorState.password.error
            && !this.props.errorState.confirmation_password.error) {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              formState: this.props.formState,
            });
            authControllers.signUp(this.props.formState);
            this.setProps({
              formState: {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                phone: '',
                password: '',
                confirmation_password: '',
              },
            });
          } else {
            console.log('errors: ', this.props.errorState);
          }
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));

          const childSignUpForm = (this.children.SignUpFormWrap as Block).children.children;

          this.validateField(evt, 'email', this.props.formState.email, (childSignUpForm as Block).children.EmailInput);
          this.validateField(evt, 'login', this.props.formState.login, (childSignUpForm as Block).children.LoginInput);
          this.validateField(evt, 'first_name', this.props.formState.first_name, (childSignUpForm as Block).children.FirstNameInput);
          this.validateField(evt, 'second_name', this.props.formState.second_name, (childSignUpForm as Block).children.SecondNameInput);
          this.validateField(evt, 'phone', this.props.formState.phone, (childSignUpForm as Block).children.PhoneInput);
          this.validateField(evt, 'password', this.props.formState.password, (childSignUpForm as Block).children.PasswordInput);
          this.validateField(
            evt,
            'confirmation_password',
            this.props.formState.confirmation_password,
            (childSignUpForm as Block).children.ConfirmationPasswordInput,
            this.props.formState.password,
          );
        },

        click: (evt: Event) => { // Клик на ссылку
          const target = evt.target as HTMLElement;
          if (target.closest('.link')) {
            router.go(PATH.signIn);
          }
        },
      },

      SignUpFormWrap: new FormWrap({
        name: 'sign-up-form',
        id: 'sign-up-form',
        titleSize: 'size-l',
        titleText: 'Регистрация',

        children: new SignUpForm({
          formState: formState,
          errorState: errorState,
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

export default withStore(mapStateToProps)(SignUpPage);
