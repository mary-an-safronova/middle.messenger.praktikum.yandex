import { Block } from '../../core';
import { Circle } from '../circle';
import { userProfileInfoData } from '../../utils/fakeData';
import { TMessageContactCardProps } from './types';

export default class MessageContactCard extends Block {
  constructor(props: TMessageContactCardProps) {
    const userEmail = userProfileInfoData.email;

    super('li', {
      ...props,
      className: 'message-contact-card',
      userEmail,
      isSelected: props.isSelected,

      CountCircle: new Circle({
        circleNumber: props.unread_count,
      }),

      events: {
        click: (evt: Event) => {
          evt.stopPropagation();
          const targetCard = evt.target as HTMLElement;
          const cardId = props.id.toString();
          if (targetCard.closest('.message-contact-card__wrap')) {
            props.onSelect(cardId); // Вызываем функцию onSelect с id
            this.setProps({ isSelected: true }); // Устанавливаем состояние для текущей карточки
          }
        },
      },
    });
  }

  render(): string {
    return `
      <div class="message-contact-card__line"></div>
      <div class="message-contact-card__wrap {{#if isSelected}}message-contact-card__wrap_bg-active{{/if}}" onclick="{{click}}">
        <div class="message-contact-card__img-wrap">
          {{#if avatar}}
              <img class="message-contact-card__img" src={{avatar}} alt="Аватар контакта">
          {{/if}}
        </div>
        <div class="message-contact-card__text-wrap">
          <div class="message-contact-card__name-time-wrap">
              <p class="message-contact-card__bold-text message-contact-card__text">{{title}}</p>
              <p class="message-contact-card__text message-contact-card__time">{{last_message.time}}</p>
          </div>
          <div class="message-contact-card__name-time-wrap message-contact-card__text-count-wrap">
            <p class="message-contact-card__text message-contact-card__text-message">
                {{#if (eq last_message.user.email this.props.userEmail)}}
                    <span class="message-contact-card__bold-text">Вы:&nbsp;</span>
                {{/if}}
                {{last_message.content}}
            </p>
            {{#if unread_count}}
              {{{ Circle circleNumber=unread_count }}}
            {{/if}}
          </div>
        </div>
      </div>
    `;
  }
}
