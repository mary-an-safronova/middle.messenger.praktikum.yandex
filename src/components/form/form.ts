import { Block } from '../../core';
import { Button, Input } from '../index';
import { TForm } from './types';

export default class Form extends Block {
  constructor(props: TForm) {
    super('div', {
      ...props,

      formElInCenter: props.formElInCenter,
      buttonText: props.buttonText,
      inputType: props.inputType,
      inputName: props.inputName,
      value: props.value,
      placeholder: props.placeholder,
      required: props.required,
      inputError: props.inputError,
      errorText: props.errorText,
      formErrorText: props.formErrorText,

      FormInput: new Input({
        name: props.inputName,
        type: props.inputType,
        error: props.inputError,
        value: props.value,
        required: true,
        placeholder: props.placeholder,
        errorText: props.errorText,
      }),

      SubmitButton: new Button({
        styleType: 'active',
        type: 'submit',
        text: props.buttonText,
        variant: 'text',
      }),
    });
  }

  render(): string {
    return `
        <div class="form__elements {{#if formElInCenter}}form__elements_position-center{{/if}}">
          {{{ FormInput }}}
          {{{ SubmitButton }}}
        </div>
        {{#if formErrorText}}
          <p class="form__error-text">{{formErrorText}}</p>
        {{/if}}
    `;
  }
}
