import { Title } from '..';
import { Block } from '../../core';
import { TFormWrapProps } from './types';

export default class FormWrap extends Block {
  constructor(props: TFormWrapProps) {
    super('form', {
      ...props,
      className: `form-wrap form-wrap_${props.titleSize}`,

      titleSize: props.titleSize,
      id: props.formName,
      name: props.formName,
      onsubmit: props.onSubmit,

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
      <fieldset class="form-wrap__wrap">
        {{{ FormWrapTitle }}}
        {{{ children }}}
      </fieldset>
    `;
  }
}
