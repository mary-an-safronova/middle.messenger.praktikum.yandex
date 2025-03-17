/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import sinon from 'sinon';
import Route from './route';
import Block from './block';

describe('Route', () => {
  const pathname = '/test';
  const props = { rootQuery: '#app' };
  let route: Route;

  beforeEach(() => {
    const appElement = document.createElement('div');
    appElement.id = 'app';
    document.body.appendChild(appElement);

    const blockClass = class TestBlock extends Block {
      constructor(props: any) {
        super('div', props);
      }

      render() {
        return `<span id="test-text">{{text}}</span>
          <button>{{text-button}}</button>`;
      }
    };

    route = new Route(pathname, blockClass, props);
  });

  afterEach(() => {
    const root = document.querySelector('#app');
    if (root) {
      root.innerHTML = '';
    }
    sinon.restore();
  });

  it('Должен корректно инициализироваться с заданными параметрами', () => {
    expect(route).to.exist;
    expect(route.match(pathname)).to.be.true;
    expect(route.match('/other')).to.be.false;
  });

  it('Должен корректно выполнять навигацию', () => {
    route.navigate('/test');
    expect(route.match('/test')).to.be.true;
  });

  it('Должен рендерить блок', () => {
    const renderSpy = sinon.spy(route, '_renderDOM');
    route.render();
    expect(renderSpy.calledOnce).to.be.true;
  });
});
