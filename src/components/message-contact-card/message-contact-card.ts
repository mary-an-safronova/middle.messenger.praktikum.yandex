/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Block } from '../../core';
import { Circle } from '../circle';
import { TMessageContactCardProps } from './types';
import { noAvatar } from '../../assets';
import store from '../../core/store';
import { formatDate } from '../../utils';

export default class MessageContactCard extends Block {
  constructor(props: TMessageContactCardProps) {
    const userEmail = store.getState().currentUser?.data?.email; // Состояние данных юзера

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
          const cardId = props.id!.toString();
          if (targetCard.closest('.message-contact-card__wrap')) {
            props.onSelect(cardId); // Вызываем функцию onSelect с id
            this.setProps({ isSelected: true }); // Устанавливаем состояние для текущей карточки
          }
        },
      },
    });
  }

  convertTime() {
    if (!this.props.last_message) {
      return '';
    }
    return formatDate(this.props.last_message?.time);
  }

  render(): string {
    const convertedTime = this.convertTime();

    return `
      <div class="message-contact-card__line"></div>
      <div class="message-contact-card__wrap {{#if isSelected}}message-contact-card__wrap_bg-active{{/if}}" onclick="{{click}}">
        <div class="message-contact-card__img-wrap">
            <img class="message-contact-card__img" src="${this.props.avatar ? this.props.avatar : noAvatar}" alt="Аватар контакта">
        </div>
        <div class="message-contact-card__text-wrap">
          <div class="message-contact-card__name-time-wrap">
              <p class="message-contact-card__bold-text message-contact-card__text">{{title}}</p>
              <p class="message-contact-card__text message-contact-card__time">${convertedTime}</p>
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
