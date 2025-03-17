/* eslint-disable quotes */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { expect } from 'chai';
import sinon from 'sinon';
import Block from './block';

describe('Block', () => {
  let PageComponent: any;
  let ChildComponent: any;

  before(() => {
    class Child extends Block {
      constructor(props: any) {
        super('div', props);
      }

      render() {
        return `<div>{{childText}}</div>`;
      }
    }
    class Page extends Block {
      constructor(props: any) {
        super('div', props);
      }

      render() {
        return `
          <span id="test-text">{{text}}</span>
          <button>{{text-button}}</button>
        `;
      }
    }
    PageComponent = Page;
    ChildComponent = Child;
  });

  it('Должен быть экземпляром Block', () => {
    const pageComponent = new PageComponent({ text: 'Hello' });
    expect(pageComponent).to.be.instanceOf(Block);
  });

  it('Должен создать компонент с состоянием из конструктора', () => {
    const text = 'Hello';
    const pageComponent = new PageComponent({ text });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('Компонент должен иметь реактивное поведение', () => {
    const newValue = 'New value';
    const pageComponent = new PageComponent({ text: 'Hello' });
    pageComponent.setProps({ text: newValue });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.eq(newValue);
  });

  it('Компонент должен установить события на элемент', () => {
    const clickHandlerStub = sinon.stub();
    const pageComponent = new PageComponent({
      events: {
        click: clickHandlerStub,
      },
    });
    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);
    expect(clickHandlerStub.calledOnce).to.be.true;
  });

  it('Должен корректно монтироваться и размонтироваться', () => {
    const pageComponent = new PageComponent({ text: 'Hello' });
    const componentDidMountSpy = sinon.spy(pageComponent, 'componentDidMount');
    const componentWillUnmountSpy = sinon.spy(pageComponent, 'componentWillUnmount');

    pageComponent.dispatchComponentDidMount();
    expect(componentDidMountSpy.calledOnce).to.be.true;

    pageComponent._componentWillUnmount();
    expect(componentWillUnmountSpy.calledOnce).to.be.true;
  });

  it('Должен корректно обновляться при изменении свойств', () => {
    const pageComponent = new PageComponent({ text: 'Initial' });
    expect(pageComponent.element?.querySelector('#test-text')?.innerHTML).to.be.eq('Initial');

    pageComponent.setProps({ text: 'Updated' });
    expect(pageComponent.element?.querySelector('#test-text')?.innerHTML).to.be.eq('Updated');
  });

  it('Должен корректно обновлять свойства дочерних компонентов', () => {
    const child1 = new ChildComponent({ childText: 'Child 1' });
    const child2 = new ChildComponent({ childText: 'Child 2' });
    const parentComponent = new PageComponent({
      children: {
        child1,
        child2,
      },
    });

    parentComponent.setPropsForChildren([child1, child2], { childText: 'Updated Child' });
    const child1Text = child1.element?.querySelector('div')?.innerHTML;
    const child2Text = child2.element?.querySelector('div')?.innerHTML;
    expect(child1Text).to.be.eq('Updated Child');
    expect(child2Text).to.be.eq('Updated Child');
  });

  it('Не должен обновлять дочерние компоненты, если не переданы новые свойства', () => {
    const child = new ChildComponent({ childText: 'Child' });
    const parentComponent = new PageComponent({
      children: child,
    });

    const oldText = child.element?.innerHTML;

    parentComponent.setPropsForChildren(child, {});
    expect(child.element?.innerHTML).to.be.eq(oldText);
  });

  it('Не должен вызывать ошибку при отсутствии дочерних компонентов', () => {
    const parentComponent = new PageComponent({});
    expect(() => parentComponent.setPropsForChildren([], { childText: 'Updated Child' })).to.not.throw();
  });

  it('Должен скрывать и показывать компонент', () => {
    const pageComponent = new PageComponent({ text: 'Hello' });
    const content = pageComponent.getContent();

    pageComponent.show();
    expect(content.style.display).to.be.eq('block');

    pageComponent.hide();
    expect(content.style.display).to.be.eq('none');
  });
});
