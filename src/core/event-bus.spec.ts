/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import sinon from 'sinon';
import EventBus from './event-bus';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('Должен корректно подписываться на событие', () => {
    const callback = sinon.spy();
    eventBus.on('testEvent', callback);
    eventBus.emit('testEvent');
    expect(callback.calledOnce).to.be.true;
  });

  it('Должен корректно вызывать подписанные обработчики', () => {
    const callback = sinon.spy();
    eventBus.on('testEvent', callback);
    eventBus.emit('testEvent', 'arg1', 'arg2');
    expect(callback.calledOnce).to.be.true;
    expect(callback.calledWith('arg1', 'arg2')).to.be.true;
  });

  it('Должен выбрасывать ошибку при вызове несуществующего события', () => {
    expect(() => eventBus.emit('nonExistentEvent')).to.throw('Нет события: nonExistentEvent');
  });

  it('Должен корректно отписываться от события', () => {
    const callback = sinon.spy();
    eventBus.on('testEvent', callback);
    eventBus.off('testEvent', callback);

    eventBus.emit('testEvent');
    expect(callback.called).to.be.false;
  });

  it('Должен выбрасывать ошибку при отписке от несуществующего события', () => {
    const callback = sinon.spy();
    expect(() => eventBus.off('nonExistentEvent', callback)).to.throw('Нет события: nonExistentEvent');
  });

  it('Должен корректно обрабатывать несколько подписчиков на одно событие', () => {
    const callback1 = sinon.spy();
    const callback2 = sinon.spy();
    eventBus.on('testEvent', callback1);
    eventBus.on('testEvent', callback2);
    eventBus.emit('testEvent');
    expect(callback1.calledOnce).to.be.true;
    expect(callback2.calledOnce).to.be.true;
  });
});
