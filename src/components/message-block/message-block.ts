/* eslint-disable no-console */
/* eslint-disable no-unneeded-ternary */
import { Block } from '../../core';
import { menuIcon, clipIcon, noAvatar } from '../../assets';
import {
  AddUserModal,
  Button, Circle, DeleteUserModal, Input, Message, MessageModal,
} from '..';
import {
  fileMessageModalItems, menuModalItems, handleFormSubmit, handleInputChange, toggleModal,
  inputErrorProps,
} from '../../utils';
import { TMessageForm } from '../../utils/types';
import { TFormErrorState, TMessageBlockProps } from './types';
import { clickOnModalItem } from './utils';
import { handleEmptyInputValidate } from '../../utils/handle-validate';

export default class MessageBlock extends Block {
  constructor(props: TMessageBlockProps) {
    const formState: TMessageForm = props.formState || { message: '' };
    const errorState: TFormErrorState = props.errorState || { message: inputErrorProps };

    super('div', {
      ...props,
      className: 'message-block',
      formState,
      errorState,
      isOpenMessageMenuModal: false,
      isOpenMessageFileModal: false,
      isOpenAddUserModal: false,
      isOpenDeleteUserModal: false,
      messageData: props.messageData,

      MessageItem: new Message({ position: 'left', type: 'text' }),
      MyMessageItem: new Message({ position: 'right', type: 'text' }),

      events: {
        submit: (evt: Event) => { // Сабмит формы
          evt.preventDefault();
          if (this.props.formState.message !== '') {
            handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
              message: this.props.formState.message,
            });

            this.setPropsForChildren(this.children.MyMessageItem, {
              ...props,
              content: this.props.formState.message,
            });
            // Сброс состояния формы после сабмита
            this.setPropsForChildren(this.children.MessageInput, { value: '' });
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

      DotsButton: new Button({
        type: 'button',
        variant: 'image',
        imgIcon: menuIcon,
        imgIconAlt: 'Меню',
        onClick: () => toggleModal('isOpenMessageMenuModal', this.setProps.bind(this), this.props),
      }),

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
              }
            }
          });
        },
      }),

      ClipButton: new Button({
        type: 'button',
        variant: 'image',
        imgIcon: clipIcon,
        imgIconAlt: 'Скрепка',
        onClick: () => toggleModal('isOpenMessageFileModal', this.setProps.bind(this), this.props),
      }),

      MessageBottomModal: new MessageModal({
        position: 'bottom',
        modalItems: fileMessageModalItems,
        onClick: (evt: MouseEvent) => clickOnModalItem(evt, fileMessageModalItems),
      }),

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

      SubmitButton: new Button({
        type: 'submit',
        variant: 'btnWithChildren',
        children: new Circle({ direction: 'right' }),
      }),

      MessageAddUserModal: new AddUserModal({
        onModalClose: () => toggleModal('isOpenAddUserModal', this.setProps.bind(this), this.props),
      }),

      MessageDeleteUserModal: new DeleteUserModal({
        onModalClose: () => toggleModal('isOpenDeleteUserModal', this.setProps.bind(this), this.props),
      }),
    });
  }

  render(): string {
    this.setPropsForChildren(this.children.MessageItem, {
      position: 'left',
      content: this.props.messageData?.last_message.content,
      type: 'text',
    });

    return `
      <div class="message-block__head">
        <div class="message-block__img-name-wrap">
          <div class="message-block__img-wrap">
              <img class="message-block__img" src="${this.props.messageData?.avatar ? this.props.messageData?.avatar : noAvatar}" alt="Аватар контакта">
          </div>
          <p class="message-block__bold-text">${this.props.messageData?.title}</p>
        </div>
        {{{ DotsButton }}}
      </div>

      <div class="message-block__content">
        {{{ MessageItem }}}
        {{{ MyMessageItem }}}
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
      {{/if}}

      {{#if isOpenAddUserModal}}
        {{{ MessageAddUserModal }}}
      {{/if}}

      {{#if isOpenDeleteUserModal}}
        {{{ MessageDeleteUserModal }}}
      {{/if}}
    `;
  }
}
