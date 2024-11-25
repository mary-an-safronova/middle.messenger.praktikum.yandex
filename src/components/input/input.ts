import { Block } from '../../core';
import { TInputProps } from './types';

export default class Input extends Block {
  constructor(props: TInputProps) {
    super('div', {
      ...props,
      className: 'input',
      name: props.name,
      id: props.id,
      type: props.type,
      error: props.error,
      value: props.value,
      required: props.required,
      maxlength: props.maxlength,
      placeholder: props.placeholder,
      searchIcon: props.searchIcon,
      errorText: props.errorText,
      itemType: props.itemType,
    });
  }

  render(): string {
    return `
      <label class="input__label" for="{{name}}">
        <input class="input__element
          {{#if (and (eq type 'password') error)}}input__element_is-invalid{{/if}}
          {{#if (eq type 'file')}}input__element_type-file{{/if}}
          {{#if (eq type 'search')}}input__element_type-search{{/if}}
          {{#if itemType}}input__element_item-type{{/if}}"
          type="{{type}}"
          name="{{name}}"
          id="{{name}}"
          value="{{value}}"
          placeholder=" "
          required="{{required}}"
          maxlength="{{maxlength}}"
          autocomplete="off"
          accept="{{#if (eq type 'file')}}image/png, image/jpeg{{/if}}"
          onchange="{{onchange}}"
        >
        <span class="
          {{#if (eq type 'file')}}
            input__placeholder_type-file
          {{else if (eq type "search")}}
            input__placeholder_type-search
          {{else}}
            input__placeholder
          {{/if}}"
        >{{placeholder}}
        </span>
        {{#if (eq type "search")}}
          <img class="input__search-icon" src="{{searchIcon}}" alt="Поиск" />
        {{/if}}
      </label>
      {{#if errorText}}
        <p class="input__error-text">{{errorText}}</p>
      {{/if}}
    `;
  }
}
