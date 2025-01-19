/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
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
import { userProfileInfoNames, inputErrorProps, router } from '../../utils/constants';
import { TAvatarForm, TUser } from '../../utils/types';
import { Block } from '../../core';
import { handleValidate } from '../../utils/handle-validate';
import { TChangeUserFormErrorState } from '../../components/change-profile-data-block/types';
import { TChangePassFormErrorState } from '../../components/change-password-data-block/types';
import * as authControllers from '../../services/auth';
import * as userControllers from '../../services/user';
import store, { StoreData, withStore } from '../../core/store';
import { TBlockProps } from '../../core/block';

class ProfilePage extends Block {
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

    const userDataFormState = store.getState().currentUser?.data; // Состояние данных юзера
    const passwordFormState = store.getState().currentUser?.password; // Состояние формы изменения пароля юзера

    const avatarFile = store.getState().currentUser?.avatar_image;
    const avatarFormState: TAvatarForm = { file: avatarFile }; // Состояние формы изменения аватара

    const passwordErrorState: TChangePassFormErrorState = { // Состояние ошибок ввода формы изменения пароля юзера
      oldPassword: inputErrorProps,
      newPassword: inputErrorProps,
      confirmation_password: inputErrorProps,
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

    super('div', {
      isAvatarChangeModal,
      isPasswordChange,
      isUserDataChange,
      avatarFormState: avatarFormState,
      passwordFormState: passwordFormState,
      userDataFormState: userDataFormState,
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
        text: userDataFormState?.first_name,
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
          authControllers.logout();
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

          submit: async (evt: Event) => {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              formState: this.props.formState,
            });
            await userControllers.changeUserAvatar(this.props.formState);
            await userControllers.getCurrentUserAvatar(); // Получаем корректный аватар юзера
            this.setProps({ isAvatarChangeModal: false });
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

          submit: async (evt: Event) => { // Сабмит формы
            evt.preventDefault();
            if (!this.props.errorState.oldPassword?.error
              && !this.props.errorState.newPassword?.error
              && !this.props.errorState.confirmation_password?.error) {
              handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
                passwordFormState: this.props.formState,
              });
              // Обновляем пароль пользователя
              await userControllers.changeUserPassword(this.props.formState);
              this.setProps({ isPasswordChange: false });
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

          submit: async (evt: Event) => { // Сабмит формы
            evt.preventDefault();
            if (!this.props.errorState.email.error
              && !this.props.errorState.login.error
              && !this.props.errorState.first_name.error
              && !this.props.errorState.second_name.error
              && !this.props.errorState.display_name.error
              && !this.props.errorState.phone.error) {
              handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
                userDataFormState: this.props.formState,
              });
              // Обновляем данные пользователя
              await userControllers.changeUserData(this.props.formState);
              this.setProps({ isUserDataChange: false }); // Закрываем форму изменения данных юзера
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

  componentDidMount(): void {
    // Подгружаем аватар и данные юзера при монтировании
    this.getUserData();
  }

  componentDidUpdate(_oldProps: TBlockProps, _newProps: TBlockProps) {
    const user = store.getState().currentUser;
    this.children.ProfileUserInfo = this.updateUserInfo(user?.data);
    this.children.ProfileTitle = this.updateProfileTitle(user?.data);
    this.children.ProfileAvatar = this.updateProfileAvatar(user?.avatar_image);
    return true;
  }

  // Метод обновления блока данных юзера
  updateUserInfo(userData: TUser | undefined) {
    return new UserInfo({
      userInfo: userProfileInfoNames,
      userData: userData,
    });
  }

  // Метод обновления заголовка
  updateProfileTitle(userData: TUser | undefined) {
    return new Title({ text: userData?.first_name, size: 'size-m' });
  }

  // Метод обновления аватара
  updateProfileAvatar(userImg: string | undefined) {
    return new Avatar({
      avatarIcon: userImg,
      changeAvatarClick: () => {
        this.setProps({ isAvatarChangeModal: true });
      },
    });
  }

  getUserData = async () => {
    await userControllers.getCurrentUserAvatar(); // Получаем корректный аватар юзера
    const user = store.getState().currentUser;
    this.setPropsForChildren(this.children.ProfileAvatar, { avatarIcon: user?.avatar_image });
  };

  render(): string {
    return `
      <div class="profile">
        <div class="profile__avatar-wrap">
          {{{ ProfileAvatar }}}
          {{{ ProfileTitle }}}
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

const mapStateToProps = (state: StoreData) => ({
  currentUser: state.currentUser,
});

export default withStore(mapStateToProps)(ProfilePage);
