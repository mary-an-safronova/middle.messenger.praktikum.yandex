/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, MessageBlock, MessageContactCard } from '../../components';
import { Block } from '../../core';
import { searchIcon, arrowRight } from '../../assets';
import { messageContactsData } from '../../utils';

export default class ChatPage extends Block {
  private selectedCardId: string | null = null; // Хранит ID выбранной карточки

  constructor(props: Record<string, any>) {
    const isSelected: boolean = false;

    super('div', {
      ...props,
      className: 'chat-page',
      isSelected,
      ChatMessageBlock: new MessageBlock({}), // Инициализируем пустым блоком сообщений

      SearchInput: new Input({
        name: 'search-input',
        type: 'search',
        value: '',
        placeholder: 'Поиск',
        searchIcon: searchIcon,
      }),

      ContactCards: messageContactsData.map((contactCardProps) => new MessageContactCard({
        ...contactCardProps,
        isSelected: isSelected,

        onSelect: (selectedId: string) => {
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
          const selectedContact = messageContactsData.find((contact) => contact.id.toString() === this.selectedCardId);
          if (selectedContact) {
            this.setProps({ isSelected: true });
            this.setPropsForChildren(this.children.ChatMessageBlock, { messageData: selectedContact });
          } else {
            console.error('Выбранный контакт не найден');
          }
        },
      })),
    });
  }

  render(): string {
    return `
        <div class="chat-page__contacts-block">

          <button class="chat-page__contacts-block__profile-btn">Профиль
            <img src=${arrowRight} alt="Стрелка вправо">
          </button>

          <div class="chat-page__contacts-block__input-wrap">
            {{{ SearchInput }}}
          </div>

          <div class="chat-page__contacts-list">
            <ul class="chat-page__contacts-list__scroll">
              {{#each ContactCards}}
                {{{ this }}}
              {{/each}}
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
    `;
  }
}
