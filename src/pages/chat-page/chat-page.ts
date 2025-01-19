/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import {
  AddChatModal,
  Button, Input, MessageBlock, MessageContactCard,
} from '../../components';
import { Block } from '../../core';
import { searchIcon, arrowRight, addWhiteIcon } from '../../assets';
import { inputErrorProps, PATH, router } from '../../utils/constants';
import store, { StoreData, withStore } from '../../core/store';
import * as chatsControllers from '../../services/chats';
import * as messagesController from '../../services/messeges';
import { TBlockProps } from '../../core/block';
import isEqual from '../../core/utils/is-equal';
import { TChat } from '../../utils/types';

class ChatPage extends Block {
  private selectedCardId: string | null = null; // Хранит ID выбранной карточки

  constructor() {
    const isSelected = false;
    const isAddChatModal = false;
    const addChatFormState = { title: '' };
    const errorState = { title: inputErrorProps };

    const { chatList } = store.state; // Состояние данных юзера

    super('div', {
      className: 'chat-page',
      isSelected: isSelected,
      isAddChatModal,
      addChatFormState,
      errorState,
      chatList: chatList,

      ChatMessageBlock: new MessageBlock({}), // Инициализируем пустым блоком сообщений

      // Переход на страницу профиля
      ProfileButton: new Button({
        type: 'button',
        onClick: () => router.go(PATH.settings),
        variant: 'textAndImg',
        text: 'Профиль',
        imgIcon: arrowRight,
        imgIconAlt: 'Стрелка вправо',
        extraClass: 'chat-page__contacts-profile-btn',
      }),

      // Поиск чата
      SearchInput: new Input({
        name: 'search-input',
        type: 'search',
        value: '',
        placeholder: 'Поиск',
        searchIcon: searchIcon,
      }),

      // Список чатов
      ContactCards: chatList?.map((contactCardProps) => new MessageContactCard({
        ...contactCardProps,
        isSelected: isSelected,

        onSelect: async (selectedId: string | null) => {
          this.handleSelectContact(selectedId, chatList);
        },
      })),

      // Кнопка добавления нового чата
      AddChatButton: new Button({
        type: 'button',
        onClick: () => {
          this.setProps({ isAddChatModal: true });
        },
        variant: 'image',
        imgIcon: addWhiteIcon,
        imgIconAlt: 'Добавить чат',
        extraClass: 'chat-page__add-chat-btn',
      }),

      // Модальное окно с формой создания нового чата
      AddNewChatModal: new AddChatModal({
        formState: addChatFormState,
        errorState: errorState,
        onModalClose: async () => {
          this.setProps({ isAddChatModal: false });
        },
      }),
    });
  }

  componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps) {
    // Если массив чатов изменился
    if (!isEqual(oldProps.chatList, newProps.chatList)) {
      // Если создаем новый чат, выбираем новый чат
      if (oldProps.chatList?.length < newProps.chatList?.length) {
        this.selectedCardId = newProps.chatList[0].id.toString();
        // Очищаем блок сообщений в стор
        store.set('currentChat.messages', []);
        // Если удаляем чат, убираем выбор с чатов
      } else if (oldProps.chatList?.length > newProps.chatList?.length) {
        this.selectedCardId = null;
        this.setProps({ isSelected: false });
        // Очищаем блок сообщений в стор
        store.set('currentChat.messages', []);
      }
      // Обновляем компонент с чатами
      this.children.ContactCards = this.updateContactCards(newProps.chatList);
    }
    if (oldProps.messages) {
      // Если изменился массив сообщений, обновляем компонент с чатами
      if (!isEqual(oldProps.messages, newProps.messages)) {
        chatsControllers.getChatList();
        this.children.ContactCards = this.updateContactCards(newProps.chatList);
      }
    }
    return true;
  }

  // Метод обновления блока карточек чата
  updateContactCards(chatList: TChat[] | undefined = []) {
    return chatList.map((contactCardProps) => new MessageContactCard({
      ...contactCardProps,
      isSelected: this.selectedCardId === contactCardProps.id?.toString(),

      onSelect: async (selectedId: string | null) => {
        this.handleSelectContact(selectedId, chatList);
      },
    }));
  }

  // Метод выбора карточки чата
  handleSelectContact = async (
    selectedId: string | null,
    chatList: TChat[] | undefined = [],
  ): Promise<void> => {
    // Если кликнули на уже выбранный, ничего не делаем
    if (selectedId === this.selectedCardId) {
      return;
    }

    // Если есть выбранная карточка, сбрасываем ее состояние
    if (this.selectedCardId) {
      const previousCard = (this.children.ContactCards as any).find((card: MessageContactCard) => card.props.id.toString() === this.selectedCardId);
      if (previousCard) {
        previousCard.setProps({ isSelected: false });
      }
    }

    // Устанавливаем новую выбранную карточку
    this.selectedCardId = selectedId;

    // Обновляем ChatMessageBlock с данными выбранной карточки
    const selectedChat = chatList.find((contact) => contact.id?.toString() === this.selectedCardId);
    if (selectedChat) {
      this.setProps({ isSelected: true });
      store.set('currentChat.chat', selectedChat);

      // Получаем из стора выбранный чат
      const { currentChat } = store.getState();
      const chatId = currentChat?.chat?.id; // Id выбранного чата

      // Получаем пользователей выбранного чата
      await chatsControllers.getChatUsers(chatId);
      // Запрашиваем пользователей выбранного чата из стора
      const chatUsers = store.getState().currentChat?.chat_users;
      await chatsControllers.getChatToken(chatId); // Получаем токен по id выбранного чата
      const chatToken = store.getState().currentChat?.chat_token;
      await messagesController.chatConnect(chatId, chatToken);

      // Передаем пропсы в блок чата
      this.setPropsForChildren(this.children.ChatMessageBlock, {
        chat: selectedChat,
        chatUsers: chatUsers,
      });
    } else {
      console.error('Выбранный контакт не найден');
    }
  };

  render(): string {
    return `
        <div class="chat-page__contacts-block">
          {{{ ProfileButton }}}
          <div class="chat-page__contacts-input-wrap">
            {{{ SearchInput }}}
          </div>

          <div class="chat-page__contacts-list">
            <ul class="chat-page__contacts-list-scroll">
              {{#each ContactCards}}
                {{{ this }}}
              {{/each}}
              {{{ AddChatButton }}}
            </ul>
          </div>
        </div>

        <div class="chat-page__message-block">
          {{#if isSelected}}
            {{{ ChatMessageBlock }}}
          {{else}}
            <div class="chat-page__no-select-contact">
              <p class="chat-page__no-select-contact-text">Выберите чат чтобы отправить сообщение</p>
            </div>
          {{/if}}
        </div>

        {{#if isAddChatModal}}
          {{{ AddNewChatModal }}}
        {{/if}}
    `;
  }
}

const mapStateToProps = (state: StoreData) => ({
  currentUser: state.currentUser,
  chatList: state.chatList,
  currentChat: state.currentChat,
  messages: state.currentChat?.messages,
});

export default withStore(mapStateToProps)(ChatPage);
