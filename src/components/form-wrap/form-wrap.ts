import { Title } from '..';
import { Block } from '../../core';
import { TFormWrapProps } from './types';

export default class FormWrap extends Block {
  constructor(props: TFormWrapProps) {
    super('div', {
      ...props,
      children: props.children,

      FormWrapTitle: new Title({
        size: props.titleSize,
        text: props.titleText,
        type: props.titleType,
      }),
    });
  }

  render(): string {
    return `
    <form class="form-wrap form-wrap_${this.props.titleSize}" id="{{formName}}" name="{{formName}}" onsubmit="{{submit}}" novalidate>
      <fieldset class="form-wrap__wrap">
        {{{ FormWrapTitle }}}
        {{{ children }}}
      </fieldset>
      </form>
    `;
  }
}
