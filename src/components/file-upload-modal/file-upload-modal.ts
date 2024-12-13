import { Form, FormWrap } from '..';
import { Block } from '../../core';
import { TFileUploadModalProps } from './types';

export default class FileUploadModal extends Block {
  constructor(props: TFileUploadModalProps) {
    super('div', {
      ...props,

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
          placeholder: props.placeholder,
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
