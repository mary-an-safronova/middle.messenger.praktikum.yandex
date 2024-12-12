/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import Block from './block';
import renderDOM from './render-dom';

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
}

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}

export default class Route implements RouteInterface {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | null;

  private _props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  _renderDOM(query: string, block: Block) {
    renderDOM(query, block);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    this._renderDOM(this._props.rootQuery, this._block);
    this._block.componentDidMount();
  }
}
