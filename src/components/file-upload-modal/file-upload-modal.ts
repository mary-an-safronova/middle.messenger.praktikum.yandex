import { Form, FormWrap } from '..';
import { handleFormSubmit, handleInputChange, handleOverlayClick } from '../../utils';
import { Block } from '../../core';
import { TFileUploadModalProps } from './types';

export default class FileUploadModal extends Block {
  constructor(props: TFileUploadModalProps) {
    super('div', {
      ...props,

      formState: props.avatarFormState,
      onclick: props.onModalClose,

      events: {
        submit: (evt: Event) => {
          handleFormSubmit(evt, this.props.formState, this.setProps.bind(this), {
            formState: this.props.formState,
          });
          props.onModalClose();
        },

        change: (evt: Event) => { // Отслеживание изменения инпутов
          handleInputChange(evt, this.props.formState, this.setProps.bind(this));
        },

        click: (event: MouseEvent) => handleOverlayClick(event, props.onModalClose), // Клик на оверлей модального окна
      },

      FileUploadFormWrap: new FormWrap({
        id: 'file-upload-form',
        name: 'file-upload-form',
        titleSize: 'size-s',
        titleText: 'Загрузите файл',
        titleType: 'default',

        children: new Form({
          formElInCenter: true,
          buttonText: 'Поменять',
          inputType: 'file',
          inputName: 'file',
          value: props.avatarFormState.file,
          placeholder: 'Выбрать файл на компьютере',
          required: true,
          inputError: false,
          errorText: '',
          formErrorText: '',
        }),
      }),
    });
  }

  render(): string {
    return `
      {{#> ModalOverlay onclick="{{onclick}}"}}
        {{#> Modal size="size-l"}}
          {{{ FileUploadFormWrap }}}
        {{/Modal}}
      {{/ModalOverlay}}
    `;
  }
}
