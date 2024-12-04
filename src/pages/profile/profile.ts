/* eslint-disable max-params */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar, BackButton, ChangeProfileData, ChangePasswordDataBlock,
  Title, UserInfo, UserInfoButtons,
  ChangeProfileDataBlock,
  FileUploadModal,
} from '../../components';
import {
  handleFormSubmit,
  handleInputChange,
  navigate,
  userProfileInfoNames,
  userProfileInfoData,
  userProfilePasswordData,
  inputErrorProps,
} from '../../utils';
import { TAvatarForm, TChangePasswordForm, TChangeUserForm } from '../../utils/types';
import { Block } from '../../core';
import { handleValidate } from '../../utils/handle-validate';
import { TChangeUserFormErrorState } from '../../components/change-profile-data-block/types';
import { TChangePassFormErrorState } from '../../components/change-password-data-block/types';

export default class ProfilePage extends Block {
  private validateField(evt: Event, inputName: string, inputValue: string, inputChild: any, prevInputValue?: string) {
    handleValidate(
      evt,
      inputName,
      inputValue,
      inputChild,
      this.props.changeUserErrorState,
      this.setProps.bind(this),
      this.setPropsForChildren.bind(this),
      prevInputValue,
    );
  }

  constructor(props: Record<string, any>) {
    const isAvatarChangeModal: boolean = false;
    const isPasswordChange: boolean = false;
    const isUserDataChange: boolean = false;

    const avatarFormState: TAvatarForm = props.formState || { file: '' }; // Состояние формы изменения аватара

    const passwordFormState: TChangePasswordForm = props.passwordFormState || { // Состояние формы изменения пароля юзера
      oldPassword: userProfilePasswordData.oldPassword,
      newPassword: userProfilePasswordData.newPassword,
      confirmation_password: userProfilePasswordData.newPassword,
    };

    const passwordErrorState: TChangePassFormErrorState = props.passwordFormState || { // Состояние ошибок ввода формы изменения пароля юзера
      oldPassword: inputErrorProps,
      newPassword: inputErrorProps,
      confirmation_password: inputErrorProps,
    };

    const userDataFormState: TChangeUserForm = props.userDataFormState || { // Состояние формы изменения данных юзера
      email: userProfileInfoData.email,
      login: userProfileInfoData.login,
      first_name: userProfileInfoData.first_name,
      second_name: userProfileInfoData.second_name,
      display_name: userProfileInfoData.display_name,
      phone: userProfileInfoData.phone,
      avatar: userProfileInfoData.avatar,
    };

    const changeUserErrorState: TChangeUserFormErrorState = props.errorState || { // Состояние ошибок ввода формы изменения данных юзера
      email: inputErrorProps,
      login: inputErrorProps,
      first_name: inputErrorProps,
      second_name: inputErrorProps,
      display_name: inputErrorProps,
      phone: inputErrorProps,
      avatar: inputErrorProps,
    };

    super('div', {
      ...props,

      isAvatarChangeModal,
      isPasswordChange,
      isUserDataChange,
      avatarFormState,
      passwordFormState,
      userDataFormState,
      changeUserErrorState,
      passwordErrorState,

      // Компоненты
      ProfileBackButton: new BackButton({}),

      ProfileAvatar: new Avatar({
        avatarIcon: userDataFormState.avatar,

        changeAvatarClick: () => {
          this.setProps({
            isAvatarChangeModal: true,
          });
        },
      }),

      ProfileTitle: new Title({
        text: userDataFormState.first_name,
        size: 'size-m',
      }),

      ProfileUserInfo: new UserInfo({ // Актуальные данные юзера
        userInfo: userProfileInfoNames,
        userData: userDataFormState,
      }),

      // Элементы управления
      ProfileUserInfoButtons: new UserInfoButtons({
        changeDataButtonClick: () => { // Открытие формы изменения данных пользователя
          this.setProps({
            isUserDataChange: true,
          });
        },

        changePasswordButtonClick: () => { // Открытие формы изменения пароля пользователя
          this.setProps({
            isPasswordChange: true,
          });
        },

        logOutButtonClick: () => { // Выход из аккаунта
          navigate('navigatePage');
        },
      }),

      // Компонент - модальное окно с формой изменения аватара пользователя
      ProfileAvatarFileUploadModal: new FileUploadModal({
        avatarFormState: avatarFormState,

        onModalClose: () => {
          this.setProps({
            isAvatarChangeModal: false,
          });
        },
      }),

      // Компонент с формой изменения пароля пользователя
      ChangePasswordDataWrap: new ChangeProfileData({
        avatarIcon: userDataFormState.avatar,

        events: {
          change: (evt: Event) => { // Отслеживание изменения инпутов
            handleInputChange(evt, this.props.formState, this.setProps.bind(this));

            const childChangePasswordForm = this.children.ChangePasswordDataWrap.children.children;
            this.validateField(evt, 'oldPassword', this.props.formState.oldPassword, childChangePasswordForm.children.OldPasswordItem.children.InputItem);
            this.validateField(evt, 'newPassword', this.props.formState.newPassword, childChangePasswordForm.children.NewPasswordItem.children.InputItem);
            this.validateField(
              evt,
              'confirmation_password',
              this.props.formState.confirmation_password,
              childChangePasswordForm.children.ConfirmationPasswordItem.children.InputItem,
              this.props.formState.newPassword,
            );
          },

          submit: (evt: Event) => { // Сабмит формы
            evt.preventDefault();
            if (!this.props.errorState.oldPassword.error
              && !this.props.errorState.newPassword.error
              && !this.props.errorState.confirmation_password.error) {
              handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
                passwordFormState: this.props.formState,
                isPasswordChange: false,
              });
            } else {
              console.log('errors: ', this.props.errorState);
            }
          },
        },

        children: new ChangePasswordDataBlock({
          userData: passwordFormState,
          errorState: passwordErrorState,
        }),
      }),

      // Компонент с формой изменения данных пользователя
      ChangeUserDataWrap: new ChangeProfileData({
        avatarIcon: userDataFormState.avatar,
        formName: 'changec-profile-data',

        events: {
          change: (evt: Event) => { // Отслеживание изменения инпутов
            handleInputChange(evt, this.props.formState, this.setProps.bind(this));

            const childChangeProfileForm = this.children.ChangeUserDataWrap.children.children;
            this.validateField(evt, 'email', this.props.formState.email, childChangeProfileForm.children.EmailItem.children.InputItem);
            this.validateField(evt, 'login', this.props.formState.login, childChangeProfileForm.children.LoginItem.children.InputItem);
            this.validateField(evt, 'first_name', this.props.formState.first_name, childChangeProfileForm.children.FirstNameItem.children.InputItem);
            this.validateField(evt, 'second_name', this.props.formState.second_name, childChangeProfileForm.children.SecondNameItem.children.InputItem);
            this.validateField(evt, 'display_name', this.props.formState.display_name, childChangeProfileForm.children.DisplayNameItem.children.InputItem);
            this.validateField(evt, 'phone', this.props.formState.phone, childChangeProfileForm.children.PhoneItem.children.InputItem);
          },

          submit: (evt: Event) => { // Сабмит формы
            evt.preventDefault();
            if (!this.props.errorState.email.error
              && !this.props.errorState.login.error
              && !this.props.errorState.first_name.error
              && !this.props.errorState.second_name.error
              && !this.props.errorState.display_name.error
              && !this.props.errorState.phone.error) {
              handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
                userDataFormState: this.props.formState,
                isUserDataChange: false,
              });
              this.setProps({
                formState: {
                  email: '',
                  login: '',
                  first_name: '',
                  second_name: '',
                  display_name: '',
                  phone: '',
                },
              });
            } else {
              console.log('errors: ', this.props.errorState);
            }
          },
        },

        children: new ChangeProfileDataBlock({
          userInfo: userProfileInfoNames,
          userData: userDataFormState,
          errorState: changeUserErrorState,
        }),
      }),
    });
  }

  render(): string {
    return `
      {{{ ProfileBackButton }}}
      <div class="profile">
        {{#if isPasswordChange}}
          {{{ ChangePasswordDataWrap }}}
        {{else if isUserDataChange}}
          {{{ ChangeUserDataWrap }}}
        {{else}}
          <div class="profile__avatar-wrap">
            {{{ ProfileAvatar }}}
            {{{ ProfileTitle }}}
          </div>
          <div class="profile__info-raws-wrap">
            {{{ ProfileUserInfo }}}
            {{{ ProfileUserInfoButtons }}}
          </div>
        {{/if}}
      </div>
      {{#if isAvatarChangeModal}}
        {{{ ProfileAvatarFileUploadModal }}}
      {{/if}}
    `;
  }
}
