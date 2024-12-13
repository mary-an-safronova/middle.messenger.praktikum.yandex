/* eslint-disable max-params */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar, ChangeProfileData, ChangePasswordDataBlock,
  Title, UserInfo, UserInfoButtons,
  ChangeProfileDataBlock,
  FileUploadModal,
  Button,
  Circle,
} from '../../components';
import { handleFormSubmit, handleInputChange, handleOverlayClick } from '../../utils';
import { userProfileInfoData, userProfilePasswordData } from '../../utils/fakeData';
import {
  userProfileInfoNames, inputErrorProps, router, PATH,

} from '../../utils/constants';
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

  constructor() {
    const isAvatarChangeModal = false;
    const isPasswordChange = false;
    const isUserDataChange = false;

    const passwordFormState: TChangePasswordForm = { // Состояние формы изменения пароля юзера
      oldPassword: userProfilePasswordData.oldPassword,
      newPassword: userProfilePasswordData.newPassword,
      confirmation_password: userProfilePasswordData.newPassword,
    };

    const passwordErrorState: TChangePassFormErrorState = { // Состояние ошибок ввода формы изменения пароля юзера
      oldPassword: inputErrorProps,
      newPassword: inputErrorProps,
      confirmation_password: inputErrorProps,
    };

    const userDataFormState: TChangeUserForm = { // Состояние формы изменения данных юзера
      email: userProfileInfoData.email,
      login: userProfileInfoData.login,
      first_name: userProfileInfoData.first_name,
      second_name: userProfileInfoData.second_name,
      display_name: userProfileInfoData.display_name,
      phone: userProfileInfoData.phone,
    };

    const changeUserErrorState: TChangeUserFormErrorState = { // Состояние ошибок ввода формы изменения данных юзера
      email: inputErrorProps,
      login: inputErrorProps,
      first_name: inputErrorProps,
      second_name: inputErrorProps,
      display_name: inputErrorProps,
      phone: inputErrorProps,
      avatar: inputErrorProps,
    };

    const avatarFormState: TAvatarForm = {
      file: userProfileInfoData.avatar,
    }; // Состояние формы изменения аватара

    super('div', {
      isAvatarChangeModal,
      isPasswordChange,
      isUserDataChange,
      avatarFormState,
      passwordFormState,
      userDataFormState,
      changeUserErrorState,
      passwordErrorState,

      // Компоненты
      ProfileBackButton: new Button({
        extraClass: 'profile__back-button',
        type: 'button',
        onClick: () => {
          if (!this.props.isUserDataChange && !this.props.isPasswordChange) {
            router.back();
          }
        },
        variant: 'btnWithChildren',
        children: new Circle({
          direction: 'left',
        }),
      }),

      ChangeBackButton: new Button({
        extraClass: 'profile__back-button',
        type: 'button',
        onClick: () => {
          if (this.props.isUserDataChange) {
            this.setProps({ isUserDataChange: false });
          }
          if (this.props.isPasswordChange) {
            this.setProps({ isPasswordChange: false });
          }
        },
        variant: 'btnWithChildren',
        children: new Circle({
          direction: 'left',
        }),
      }),

      ProfileAvatar: new Avatar({
        avatarIcon: avatarFormState.file,

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
          router.go(PATH.signIn);
        },
      }),

      // Компонент - модальное окно с формой изменения аватара пользователя
      ProfileAvatarFileUploadModal: new FileUploadModal({
        avatarFormState: avatarFormState,
        placeholder: 'Выбрать файл на компьютере',

        events: {
          change: (evt: Event) => { // Отслеживание изменения инпутов
            handleInputChange(evt, this.props.formState, this.setProps.bind(this));
          },

          submit: (evt: Event) => {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              formState: this.props.formState,
            });
            this.setProps({ isAvatarChangeModal: false });
            const avatarComponent = this.children.ProfileAvatar;
            this.setPropsForChildren(avatarComponent, { avatarIcon: this.props.formState.file });
          },

          click: (event: MouseEvent) => handleOverlayClick(event, () => {
            this.setProps({ isAvatarChangeModal: false });
          }), // Клик на оверлей модального окна
        },
      }),

      // Компонент с формой изменения пароля пользователя
      ChangePasswordDataWrap: new ChangeProfileData({
        events: {
          change: (evt: Event) => { // Отслеживание изменения инпутов
            handleInputChange(evt, this.props.formState, this.setProps.bind(this));

            const childChangePasswordForm = (this.children.ChangePasswordDataWrap as Block).children.children;
            const childOldPasswordItem = (childChangePasswordForm as Block).children.OldPasswordItem;
            const childNewPasswordItem = (childChangePasswordForm as Block).children.NewPasswordItem;
            const childConfirmationPasswordItem = (childChangePasswordForm as Block).children.ConfirmationPasswordItem;
            this.validateField(evt, 'oldPassword', this.props.formState.oldPassword, (childOldPasswordItem as Block).children.InputItem);
            this.validateField(evt, 'newPassword', this.props.formState.newPassword, (childNewPasswordItem as Block).children.InputItem);
            this.validateField(
              evt,
              'confirmation_password',
              this.props.formState.confirmation_password,
              (childConfirmationPasswordItem as Block).children.InputItem,
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
        formName: 'changec-profile-data',

        events: {
          change: (evt: Event) => { // Отслеживание изменения инпутов
            handleInputChange(evt, this.props.formState, this.setProps.bind(this));

            const childChangeProfileForm = (this.children.ChangeUserDataWrap as Block).children.children;
            this.validateField(evt, 'email', this.props.formState.email, ((childChangeProfileForm as Block).children.EmailItem as Block).children.InputItem);
            this.validateField(evt, 'login', this.props.formState.login, ((childChangeProfileForm as Block).children.LoginItem as Block).children.InputItem);
            this.validateField(evt, 'first_name', this.props.formState.first_name, ((childChangeProfileForm as Block).children.FirstNameItem as Block).children.InputItem);
            this.validateField(evt, 'second_name', this.props.formState.second_name, ((childChangeProfileForm as Block).children.SecondNameItem as Block).children.InputItem);
            this.validateField(evt, 'display_name', this.props.formState.display_name, ((childChangeProfileForm as Block).children.DisplayNameItem as Block).children.InputItem);
            this.validateField(evt, 'phone', this.props.formState.phone, ((childChangeProfileForm as Block).children.PhoneItem as Block).children.InputItem);
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

      <div class="profile">

        <div class="profile__avatar-wrap">
          {{{ ProfileAvatar }}}
          {{{ ProfileTitle }}}
        </div>

        {{#if isPasswordChange}}
          {{{ ChangeBackButton }}}
          {{{ ChangePasswordDataWrap }}}
        {{else if isUserDataChange}}
          {{{ ChangeBackButton }}}
          {{{ ChangeUserDataWrap }}}
        {{else}}
          {{{ ProfileBackButton }}}

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
