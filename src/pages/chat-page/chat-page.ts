/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import {
  AddChatModal,
  Button, FileUploadModal, Input, MessageBlock, MessageContactCard,
} from '../../components';
import { Block } from '../../core';
import {
  searchIcon, arrowRight, addWhiteIcon, noAvatar,
} from '../../assets';
import {
  baseURL, inputErrorProps, PATH, router,
} from '../../utils/constants';
import store, { StoreData, withStore } from '../../core/store';
import * as chatsControllers from '../../services/chats';
import * as authControllers from '../../services/auth';
import * as messagesController from '../../services/messeges';
import { TBlockProps } from '../../core/block';
import isEqual from '../../core/utils/is-equal';
import {
  TAvatarForm, TChat, TCurrentUser,
} from '../../utils/types';
import {
  handleFormSubmit, handleInputChange, handleOverlayClick,
} from '../../utils';
import { handleAvatarImg } from '../../utils/handle-chat-avatar';
import ChatsAPI from '../../api/chats-api';

class ChatPage extends Block {
  private selectedCardId: string | null = null; // Хранит ID выбранной карточки

  constructor() {
    const isSelected = false;
    const isAddChatModal = false;
    const addChatFormState = { title: '' };
    const errorState = { title: inputErrorProps };

    const { chatList } = store.state; // Состояние данных юзера

    const avatarFile = store.getState().currentChat?.avatar_image;
    const avatarFormState: TAvatarForm = { file: avatarFile }; // Состояние формы изменения аватара

    const { currentChat } = store.getState(); // Текущий чат

    super('div', {
      className: 'chat-page',
      isSelected: isSelected,
      isAddChatModal,
      addChatFormState,
      errorState,
      chatList: chatList,
      isOpenUploadAvatarModel: false,
      avatarFormState: avatarFormState,

      ChatMessageBlock: new MessageBlock({
        onAvatarImgClick: () => {
          this.setProps({ isOpenUploadAvatarModel: true });
        },
      }), // Инициализируем пустым блоком сообщений

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

      // Компонент - модальное окно с формой изменения аватара чата
      ChatAvatarFileUploadModal: new FileUploadModal({
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
            const chatId = currentChat?.chat?.id; // Id выбранного чата
            await chatsControllers.addChatAvatar(this.props.formState, chatId);
            this.getChatAvatar(); // Получаем аватар выбранного чата
            await chatsControllers.getChatList(); // Обновляем чаты
            this.setProps({ isOpenUploadAvatarModel: false });
          },

          click: (event: MouseEvent) => handleOverlayClick(event, () => {
            this.setProps({ isOpenUploadAvatarModel: false });
          }), // Клик на оверлей модального окна
        },
      }),
    });
  }

  componentDidMount() {
    Promise.all([
      chatsControllers.getChatList(),
      authControllers.getUser(),
    ]).then(async () => {
      const { chatList, currentUser } = store.getState();
      const updateChatList = await this.handleChatCardsAvatarImges(chatList, currentUser);
      store.set('chatList', updateChatList);
      this.children.ContactCards = this.updateContactCards(updateChatList);
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

      const { chatList, currentUser } = store.getState();

      this.handleChatCardsAvatarImges(chatList, currentUser).then((updatedChatList) => {
        this.children.ContactCards = this.updateContactCards(updatedChatList);
      });
    }
    if (oldProps.messages) {
      // Если изменился массив сообщений, обновляем компонент с чатами
      if (!isEqual(oldProps.messages, newProps.messages)) {
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

      await chatsControllers.getChatToken(chatId); // Получаем токен по id выбранного чата
      const chatToken = store.getState().currentChat?.chat_token;
      await messagesController.chatConnect(chatId, chatToken);

      this.getChatAvatar(); // Получаем аватар выбранного чата

      const messageBlock = this.children.ChatMessageBlock;

      // Передаем пропсы в блок чата
      this.setPropsForChildren(messageBlock, {
        chat: selectedChat,
        chatUsers: selectedChat.chat_users,
      });
    } else {
      console.error('Выбранный контакт не найден');
    }
  };

  // Обновление аватара чата
  getChatAvatar = async () => {
    await chatsControllers.getCurrentChatAvatar();
    const { currentChat, currentUser } = store.getState();

    const chatAvatar = handleAvatarImg(currentChat, currentUser);

    const messageBlock = this.children.ChatMessageBlock;
    this.setPropsForChildren((messageBlock as Block).children.ChatImageName, {
      chat: currentChat?.chat,
      avatarImage: chatAvatar,
    });
  };

  async handleChatCardsAvatarImges(chatList?: TChat[] | undefined, currentUser?: TCurrentUser) {
    const chatsApi = new ChatsAPI();
    if (!chatList || !currentUser) {
      return Promise.resolve(chatList); // Возвращаем промис, если данные отсутствуют
    }

    const chatPromises = chatList.map(async (chat: TChat) => {
      const response = await chatsApi.readChatUsers(chat.id);
      chat.chat_users = response;
      const chatUsersLength = chat.chat_users?.length;
      if (chatUsersLength === 2) {
        const chatPartner = chat.chat_users.filter((user) => user?.id !== currentUser?.data?.id);
        if ((chat.avatar === '' || chat.avatar === null) && chatPartner[0]?.avatar) {
          chat.avatar_image = `${baseURL}/resources${chatPartner[0].avatar}`;
        } else if (chat.avatar === '' || chat.avatar === null) {
          chat.avatar_image = noAvatar;
        }
      }
    });
    // Ждем завершения всех промисов
    await Promise.all(chatPromises);
    return chatList; // Возвращаем обновленный массив chatList
  }

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

        {{#if isOpenUploadAvatarModel}}
          {{{ ChatAvatarFileUploadModal }}}
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
