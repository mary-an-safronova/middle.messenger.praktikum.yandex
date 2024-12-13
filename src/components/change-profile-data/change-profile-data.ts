import { Button } from '..';
import { Block } from '../../core';
import { TChangeProfileDataProps } from './types';

export default class ChangeProfileData extends Block {
  constructor(props: TChangeProfileDataProps) {
    super('div', {
      ...props,

      children: props.children,

      SubmitButton: new Button({
        type: 'submit',
        text: 'Сохранить',
        styleType: 'active',
        variant: 'text',
      }),
    });
  }

  render(): string {
    return `
      <form class="change-profile-data" id="{{formName}}" name="{{formName}}" onsubmit={{submit}}>
        <div class="change-profile-data__info-wrap">
          {{{ children }}}
        </div>
        {{{ SubmitButton }}}
      </form>
    `;
  }
}
