import { Input } from '..';
import { Block } from '../../core';
import { TUserInfoItemProps } from './types';

export default class UserInfoItem extends Block {
  constructor(props: TUserInfoItemProps) {
    super('li', {
      ...props,

      className: 'user-info-item',

      name: props.name,
      value: props.value,
      inputItemType: props.inputItemType,

      InputItem: new Input({
        name: props.inputName,
        id: props.inputName,
        type: props.inputType,
        value: props.inputValue,
        required: props.required,
        styleType: 'infoitem',
      }),
    });
  }

  render(): string {
    return `
      <p class="user-info-item__part user-info-item__part_name">{{name}}</p>
      {{#if inputItemType}}
        {{{ InputItem }}}
      {{else}}
        <p class="user-info-item__part user-info-item__part_value">{{value}}</p>
      {{/if}}

    `;
  }
}
