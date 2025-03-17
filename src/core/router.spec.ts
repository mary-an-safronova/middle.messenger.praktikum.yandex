/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */

import { expect } from 'chai';
import sinon from 'sinon';
import Router from './router';
import Block from './block';

describe('Router', () => {
  const rootQuery = '#app';
  let router: Router;
  let PageComponent: any;

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

    PageComponent = blockClass;

    router = new Router(rootQuery);
  });

  afterEach(() => {
    const root = document.querySelector('#app');
    if (root) {
      root.innerHTML = '';
    }
    sinon.restore();
  });

  it('Должен корректно инициализироваться как синглтон', () => {
    const anotherRouter = new Router(rootQuery);
    expect(router).to.equal(anotherRouter);
  });

  it('Должен добавлять маршруты', () => {
    router.use('/test', PageComponent);
    expect(router.routes.length).to.equal(1);
    expect(router.routes[0].match('/test')).to.be.true;
  });

  it('Должен вызывать метод start', () => {
    const onRouteSpy = sinon.spy(router, '_onRoute');
    router.start();
    expect(onRouteSpy.calledOnce).to.be.true;
  });

  it('Должен переходить по заданному маршруту', () => {
    router.use('/test', PageComponent);
    const renderSpy = sinon.spy(router.routes[0], 'render');
    router.go('/test');
    expect(renderSpy.calledOnce).to.be.true;
    expect(router.getRoute('/test')).to.equal(router.routes[0]);
  });

  it('Должен переходить назад', () => {
    router.use('/test1', PageComponent);
    router.use('/test2', PageComponent);
    router.go('/test1');
    router.go('/test2');
    const backSpy = sinon.spy(router.history, 'back');
    router.back();
    expect(backSpy.calledOnce).to.be.true;
  });

  it('Должен переходить вперед', () => {
    router.use('/test1', PageComponent);
    router.use('/test2', PageComponent);
    router.go('/test1');
    router.go('/test2');
    const forwardSpy = sinon.spy(router.history, 'forward');
    router.forward();
    expect(forwardSpy.calledOnce).to.be.true;
  });

  it('Должен возвращать текущий маршрут', () => {
    router.use('/test', PageComponent);
    router.go('/test');
    expect(router.getRoute('/test')).to.equal(router.routes[0]);
  });
});
