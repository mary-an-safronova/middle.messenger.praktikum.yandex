/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable no-unneeded-ternary */
import { Block } from '../../core';
import {
  menuIcon, clipIcon,
} from '../../assets';
import {
  AddUserModal,
  Button, Circle, DeleteChatModal, DeleteUserModal, ImgName, Input, Message, MessageModal,
} from '..';
import {
  handleFormSubmit, handleInputChange, toggleModal,
} from '../../utils';
import { fileMessageModalItems, menuModalItems, inputErrorProps } from '../../utils/constants';
import { TMessageForm } from '../../utils/types';
import { TFormErrorState, TMessageBlockProps } from './types';
import { clickOnModalItem } from './utils';
import { handleEmptyInputValidate } from '../../utils/handle-validate';
import store, { StoreData, withStore } from '../../core/store';
import * as chatsControllers from '../../services/chats';
import * as usersControllers from '../../services/user';
import { TLogin } from '../../utils/types/types';
import * as messagesController from '../../services/messeges';
import { TBlockProps } from '../../core/block';
import isEqual from '../../core/utils/is-equal';

class MessageBlock extends Block {
  constructor(props: TMessageBlockProps) {
    const formState: TMessageForm = props.formState || { message: '' };
    const errorState: TFormErrorState = props.errorState || { message: inputErrorProps };

    const { currentChat } = store.getState(); // Текущий чат

    const messages = currentChat?.messages; // Получаем массив сообщений из стора
    const currentUserId = store.getState().currentUser?.data?.id; // Текущий юзер

    super('div', {
      ...props,
      className: 'message-block',
      formState,
      errorState,
      isOpenMessageMenuModal: false,
      isOpenMessageFileModal: false,
      isOpenAddUserModal: false,
      isOpenDeleteUserModal: false,
      isOpenDeleteChatModal: false,
      isOpenChatUsersModal: false,
      chat: props.chat,
      chatUsers: props.chatUsers,
      onAvatarImgClick: props.onAvatarImgClick,

      // Компонент сообщений в чате
      ChatMessages: messages?.map((message) => new Message({
        ...message,
        position: message.user_id === currentUserId ? 'right' : 'left',
        type: 'text',
        content: message.content,
      })),

      events: {
        submit: async (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          if (this.props.formState.message !== '') {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              message: this.props.formState.message,
            });

            const chatId = currentChat?.chat?.id; // Id выбранного чата
            messagesController.sendMessage(this.props.formState.message, chatId);

            // Сброс состояния формы после сабмита
            this.setPropsForChildren(this.children.MessageInput, { value: '' });

            this.scrollToBottom();
          } else {
            handleEmptyInputValidate(
              evt,
              'message',
              this.props.formState.message,
              this.children.MessageInput,
              this.props.errorState,
              this.setProps.bind(this),
              this.setPropsForChildren.bind(this),
            );
          }
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));
          handleEmptyInputValidate(
            evt,
            'message',
            this.props.formState.message,
            this.children.MessageInput,
            this.props.errorState,
            this.setProps.bind(this),
            this.setPropsForChildren.bind(this),
          );
        },
      },

      // Компонент аватара и названия чата
      ChatImageName: new ImgName({
        chat: props.chat,
        onClick: props.onAvatarImgClick,
      }),

      // Компонент меню
      DotsButton: new Button({
        type: 'button',
        variant: 'image',
        imgIcon: menuIcon,
        imgIconAlt: 'Меню',
        onClick: () => toggleModal('isOpenMessageMenuModal', this.setProps.bind(this), this.props),
      }),

      // Модальное окно, открывающееся по нажатию на кнопку меню
      MessageTopModal: new MessageModal({
        position: 'top',
        modalItems: menuModalItems,
        onClick: (evt: MouseEvent) => {
          evt.stopPropagation();
          const targetItem = (evt.target as HTMLElement);
          const itemText = targetItem.innerText;
          const itemClass = targetItem.closest('.icon-text__wrap');

          menuModalItems.forEach((item) => {
            if (itemText === item.text && itemClass) {
              if (item.text === 'Добавить пользователя') {
                toggleModal('isOpenAddUserModal', this.setProps.bind(this), this.props);
              } else if (item.text === 'Удалить пользователя') {
                toggleModal('isOpenDeleteUserModal', this.setProps.bind(this), this.props);
              } else if (item.text === 'Удалить чат') {
                toggleModal('isOpenDeleteChatModal', this.setProps.bind(this), this.props);
              } else if (item.text === 'Участники чата') {
                toggleModal('isOpenChatUsersModal', this.setProps.bind(this), this.props);
              }
            }
          });
        },
      }),

      // Кнопка-скрепка, прикрепление файла к сообщению
      ClipButton: new Button({
        type: 'button',
        variant: 'image',
        imgIcon: clipIcon,
        imgIconAlt: 'Скрепка',
        onClick: () => toggleModal('isOpenMessageFileModal', this.setProps.bind(this), this.props),
      }),

      // Модальное окно, открывающееся по нажатию на кнопку-скрепку
      MessageBottomModal: new MessageModal({
        position: 'bottom',
        modalItems: fileMessageModalItems,
        onClick: (evt: MouseEvent) => clickOnModalItem(evt, fileMessageModalItems),
      }),

      // Поле сообщения
      MessageInput: new Input({
        name: 'message',
        id: 'message',
        type: 'text',
        error: errorState.message.error,
        errorText: errorState.message.errorText,
        value: formState.message,
        required: true,
        styleType: 'message',
        standartPlaceholder: 'Сообщение',
      }),

      // Сабмит отправки сообщения
      SubmitButton: new Button({
        type: 'submit',
        variant: 'btnWithChildren',
        children: new Circle({ direction: 'right' }),
      }),

      // Модальное окно с формой добавления юзера в чат
      MessageAddUserModal: new AddUserModal({
        onModalClose: () => toggleModal('isOpenAddUserModal', this.setProps.bind(this), this.props),
        formSubmit: async () => {
          await usersControllers.searchUserByLogin(this.props.formState);
          const foundUser = store.getState().foundUsers![0]; // Найденный по логину юзер
          const data = {
            users: [
              foundUser.id,
            ],
            chatId: this.props.chat?.id,
          };
          await chatsControllers.addUserToChat(data); // Добавляем юзера в чат
        },
      }),

      // Модальное окно с формой удаления юзера из чата
      MessageDeleteUserModal: new DeleteUserModal({
        onModalClose: () => toggleModal('isOpenDeleteUserModal', this.setProps.bind(this), this.props),
        formSubmit: async () => {
          await usersControllers.searchUserByLogin(this.props.formState);
          const foundUser = store.getState().foundUsers![0]; // Найденный по логину юзер
          const data = {
            users: [
              foundUser.id,
            ],
            chatId: this.props.chat?.id,
          };
          await chatsControllers.deleteUserFromChat(data); // Удаляем юзера из чата
        },
      }),

      // Модальное окно удаления чата по id
      MessageDeleteChatModal: new DeleteChatModal({
        formSubmit: async () => {
          const chat: { chatId?: number | null } = {
            chatId: this.props.chat?.id,
          };
          await chatsControllers.deleteChat(chat);
        },
        onModalClose: () => toggleModal('isOpenDeleteChatModal', this.setProps.bind(this), this.props),
      }),
    });
    // Прокрутка вниз при инициализации
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  // Функция для установки скролла внизу
  scrollToBottom(): void {
    // Получаем элемент контейнера сообщений
    const scrollContainer = document.querySelector('.message-block__scroll');
    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
    }
  }

  componentDidMount(): void {
    // Вызываем scrollToBottom после загрузки сообщений
    this.scrollToBottom();
  }

  componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps) {
    if (!isEqual(oldProps.messages, newProps.messages)) {
      this.children.ChatMessages = this.updateChatMessages(newProps.messages);
      // Используем setTimeout для отложенной прокрутки
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    }
    return true;
  }

  // Метод обновления блока сообщений чата
  updateChatMessages(messages: {
    content?: string;
    id?: number;
    time?: string;
    type?: string;
    user_id?: number;
  }[] | undefined = []) {
    return messages?.map((message) => new Message({
      ...message,
      position: message.user_id === store.getState().currentUser?.data?.id ? 'right' : 'left',
      type: 'text',
      content: message.content,
    }));
  }

  render(): string {
    return `
      <div class="message-block__head">
        {{{ ChatImageName }}}
        {{{ DotsButton }}}
      </div>

      <div class="message-block__scroll-wrap">
        <ul class="message-block__content message-block__scroll">
          {{#each ChatMessages}}
            {{{ this }}}
          {{/each}}
        </ul>
      </div>

      <form id="{{message-form}}" name="{{message-form}}" class="message-block__interaction" onsubmit="{{submit}}" novalidate>
        {{{ ClipButton }}}
        {{{ MessageInput }}}
        {{{ SubmitButton }}}
        {{#if isOpenMessageFileModal}}
          {{{ MessageBottomModal }}}
        {{/if}}
      </form>

      {{#if isOpenMessageMenuModal}}
        {{{ MessageTopModal }}}

        {{#if isOpenChatUsersModal}}
          <div class="message-block__users-modal">
            <div class="message-block__chat-users-wrap">
              ${this.props.chatUsers?.map((item: TLogin) => (`<p class="message-block__chat-user">${item.login}</>`))}
            </div>
          </div>
        {{/if}}
      {{/if}}

      {{#if isOpenAddUserModal}}
        {{{ MessageAddUserModal }}}
      {{/if}}

      {{#if isOpenDeleteUserModal}}
        {{{ MessageDeleteUserModal }}}
      {{/if}}

      {{#if isOpenDeleteChatModal}}
        {{{ MessageDeleteChatModal }}}
      {{/if}}
    `;
  }
}

const mapStateToProps = (state: StoreData) => ({
  currentUser: state.currentUser,
  currentChat: state.currentChat,
  messages: state.currentChat?.messages,
});

export default withStore(mapStateToProps)(MessageBlock);
