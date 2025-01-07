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

const mapStateToProps = ({ currentUser, chatList, currentChat }: StoreData) => ({
  currentUser,
  chatList,
  currentChat,
});

class ChatPage extends Block {
  private selectedCardId: string | null = null; // Хранит ID выбранной карточки

  constructor() {
    const isSelected = false;
    const isAddChatModal = false;
    const addChatFormState = { title: '' };
    const errorState = { title: inputErrorProps };

    const messageContactsList = store.getState().chatList; // Состояние данных юзера

    super('div', {
      className: 'chat-page',
      isSelected,
      isAddChatModal,
      addChatFormState,
      errorState,

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
      ContactCards: messageContactsList?.map((contactCardProps) => new MessageContactCard({
        ...contactCardProps,
        isSelected: isSelected,

        onSelect: async (selectedId: string | null) => {
          // Если есть выбранная карточка, сбрасываем ее состояние
          if (this.selectedCardId) {
            const previousCard = this.props.ContactCards.find((card: MessageContactCard) => card.props.id.toString() === this.selectedCardId);
            if (previousCard) {
              previousCard.setProps({ isSelected: false });
            }
          }

          // Устанавливаем новую выбранную карточку
          this.selectedCardId = selectedId;

          // Обновляем ChatMessageBlock с данными выбранной карточки
          const selectedContact = messageContactsList.find((contact) => contact.id?.toString() === this.selectedCardId);
          if (selectedContact) {
            this.setProps({ isSelected: true });
            store.set('currentChat.chat', selectedContact);
            const { currentChat } = store.getState(); // Выбранный чат
            console.log('currentChat.id: ', currentChat?.chat?.id);
            await chatsControllers.getChatUsers(currentChat?.chat?.id); // Получаем пользователей чата
            const chatUsers = store.getState().currentChat?.chat_users; // Выбранный чат
            console.log('chatUsers in CHAT PAGE: ', chatUsers);
            this.setPropsForChildren(this.children.ChatMessageBlock, { messageData: selectedContact, chatUsers: chatUsers });
          } else {
            console.error('Выбранный контакт не найден');
          }
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

export default withStore(mapStateToProps)(ChatPage);
