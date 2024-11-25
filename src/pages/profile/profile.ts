/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar, BackButton, ChangeProfileData, ChangePasswordDataBlock,
  Title, UserInfo, UserInfoButtons,
  ChangeProfileDataBlock,
  FileUploadModal,
} from '../../components';
import { handleFormSubmit, handleInputChange } from '../../components/utils';
import { Block } from '../../core';
import { userProfileInfoNames } from '../../utils/constants';
import { userProfileInfoData, userProfilePasswordData } from '../../utils/fakeData';
import { navigate } from '../../utils/navigate';
import { TFile, TUser, TUserPassword } from '../../utils/types';

export default class ProfilePage extends Block {
  constructor(props: Record<string, any>) {
    const isAvatarChangeModal: boolean = false;
    const isPasswordChange: boolean = false;
    const isUserDataChange: boolean = false;

    const avatarFormState: TFile = props.formState || { file: '' }; // Состояние формы изменения аватара

    const passwordFormState: TUserPassword = props.passwordFormState || { // Состояние формы изменения пароля юзера
      oldPassword: userProfilePasswordData.oldPassword,
      newPassword: userProfilePasswordData.newPassword,
      confirmation_password: userProfilePasswordData.newPassword,
    };

    const userDataFormState: TUser = props.userDataFormState || { // Состояние формы изменения данных юзера
      email: userProfileInfoData.email,
      login: userProfileInfoData.login,
      first_name: userProfileInfoData.first_name,
      second_name: userProfileInfoData.second_name,
      display_name: userProfileInfoData.display_name,
      phone: userProfileInfoData.phone,
      avatar: userProfileInfoData.avatar,
    };

    super('div', {
      ...props,

      isAvatarChangeModal,
      isPasswordChange,
      isUserDataChange,
      avatarFormState,
      passwordFormState,
      userDataFormState,

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
          },

          submit: (evt: Event) => { // Сабмит формы
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              passwordFormState: this.props.formState,
              isPasswordChange: false,
            });
          },
        },

        children: new ChangePasswordDataBlock({
          userData: passwordFormState,
        }),
      }),

      // Компонент с формой изменения данных пользователя
      ChangeUserDataWrap: new ChangeProfileData({
        avatarIcon: userDataFormState.avatar,

        events: {
          change: (evt: Event) => { // Отслеживание изменения инпутов
            handleInputChange(evt, this.props.formState, this.setProps.bind(this));
          },

          submit: (evt: Event) => { // Сабмит формы
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              userDataFormState: this.props.formState,
              isUserDataChange: false,
            });
          },
        },

        children: new ChangeProfileDataBlock({
          userInfo: userProfileInfoNames,
          userData: userDataFormState,
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
