import { Block } from '../../core';
import { TLinkProps } from './types';

export default class Link extends Block {
  constructor(props: TLinkProps) {
    super('a', {
      ...props,
      className: `link link_${props.type} link_${props.size}`,
      text: props.text,
    });
  }

  render(): string {
    return `
      {{text}}
    `;
  }
}
