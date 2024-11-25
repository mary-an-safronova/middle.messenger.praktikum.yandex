/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './index';

// Нельзя создавать экземпляр данного класса
// Класс  Block  является основой для создания компонентов в приложении,
// Он управляет состоянием и событиями, а также предоставляет удобные методы для работы с DOM.
export default class Block {
  // Статические константы для событий жизненного цикла компонента
  static EVENTS = {
    INIT: 'init', // Инициализация
    FLOW_CDM: 'flow:component-did-mount', // Монтирование
    FLOW_RENDER: 'flow:render', // Рендеринг
    FLOW_CDU: 'flow:component-did-update', // Обновление
  };

  _element!: HTMLElement | null; // HTML-элемент, который будет создан для компонента

  _meta: { tagName: string; props: Record<string, any> }; // Метаданные компонента (тег и свойства)

  _id: string = nanoid(6); // Уникальный идентификатор компонента

  eventBus: () => EventBus; // Функция для получения экземпляра EventBus

  children: Record<string, any>; // Дочерние компоненты

  props: Record<string, any>; // Свойства компонента

  children2: Record<string, any>; // Дополнительные дочерние компоненты

  /** JSDoc
   * @param {string} tagName - HTML-тег для компонента
   * @param {Object} props - Свойства компонента, включая дочерние элементы
   *
   * @returns {void}
   */

  constructor(tagName: string = 'div', propsWithChildren: Record<string, any> = {}) {
    const eventBus = new EventBus(); // Создаем новый экземпляр EventBus
    this.eventBus = () => eventBus; // Присваиваем метод для получения EventBus

    const { props, children } = this._getChildrenAndProps(propsWithChildren); // Извлекаем свойства и дочерние компоненты
    this.children = children; // Сохраняем дочерние компоненты

    this._meta = { // Сохраняем метаданные
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props); // Создаем прокси для свойств

    this._registerEvents(eventBus); // Регистрируем события
    eventBus.emit(Block.EVENTS.INIT); // Генерируем событие инициализации
    this.children2 = {}; // Инициализируем дополнительное поле для дочерних компонентов
  }

  // Метод для регистрации событий в EventBus
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  // Метод для создания ресурсов компонента (HTML-элемента)
  _createResources(): void {
    const { tagName, props }: { tagName: string; props: Record<string, any>; } = this._meta; // Извлекаем метаданные
    this._element = this._createDocumentElement(tagName); // Создаем HTML-элемент

    if (typeof props.className === 'string') { // Если есть класс
      const classes = props.className.split(' '); // Разделяем классы
      this._element?.classList.add(...classes); // Добавляем классы к элементу
    }

    if (typeof props.attrs === 'object') { // Если есть атрибуты
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => { // Проходим по атрибутам
        this._element?.setAttribute(attrName, attrValue as string); // Устанавливаем атрибуты
      });
    }
  }

  // Метод инициализации компонента
  init(): void {
    this._createResources(); // Создаем ресурсы
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER); // Генерируем событие рендеринга
  }

  // Метод для извлечения дочерних компонентов и свойств
  // eslint-disable-next-line class-methods-use-this
  _getChildrenAndProps(propsAndChildren: Record<string, any>): { props: Record<string, any>; children: Record<string, Block | Block[]>; } {
    const children: Record<string, any> = {}; // Объект для хранения дочерних компонентов
    const props: Record<string, any> = {}; // Объект для хранения свойств

    Object.entries(propsAndChildren).forEach(([key, value]) => { // Проходим по всем свойствам
      if (Array.isArray(value)) { // Если значение - массив
        value.forEach((obj) => { // Проходим по элементам массива
          if (obj instanceof Block) { // Если элемент - экземпляр Block
            children[key] = value; // Сохраняем дочерние компоненты
          } else {
            props[key] = value; // Сохраняем свойства
          }
        });
        props[key] = value; // Сохраняем значение в свойства
        return;
      }
      if (value instanceof Block) { // Если значение - экземпляр Block
        children[key] = value; // Сохраняем дочерние компоненты
      } else {
        props[key] = value; // Сохраняем свойства
      }
    });

    return { children, props }; // Возвращаем объект с дочерними компонентами и свойствами
  }

  // Метод, вызываемый при монтировании компонента
  _componentDidMount(): void {
    this.componentDidMount();
  }

  // Метод жизненного цикла, может переопределяться пользователем
  componentDidMount(_oldProps?: Record<string, any>): void {}

  // Метод для вызова события монтирования компонента
  // eslint-disable-next-line class-methods-use-this
  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // Метод, вызываемый при обновлении компонента
  _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (!shouldUpdate) {
      return; // Если не нужно обновлять компонент, выходим
    }
    this._render(); // Рендерим компонент
  }

  // Метод жизненного цикла, может переопределяться пользователем
  componentDidUpdate(_oldProps: Record<string, any>, _newProps: Record<string, any>): boolean {
    return true; // По умолчанию возвращаем true, что значит, что обновление происходит
  }

  // Метод для установки новых свойств
  setProps = (nextProps: Record<string, any>): void => {
    if (!nextProps) {
      return; // Если нет новых свойств, выходим
    }

    Object.assign(this.props, nextProps); // Обновляем свойства
  };

  // Геттер для получения элемента
  get element(): HTMLElement | null {
    return this._element; // Возвращаем HTML-элемент
  }

  // Метод для добавления событий к элементу
  _addEvents(): void {
    const { events = {} } = this.props; // Извлекаем события из свойств

    Object.keys(events).forEach((eventName) => { // Проходим по всем событиям
      this._element?.addEventListener(eventName, events[eventName]); // Добавляем обработчики событий
    });
  }

  // Метод для удаления событий с элемента
  _removeEvents(): void {
    const { events = {} } = this.props; // Извлекаем события из свойств

    Object.keys(events).forEach((eventName) => { // Проходим по всем событиям
      this._element?.removeEventListener(eventName, events[eventName]); // Удаляем обработчики событий
    });
  }

  // Метод для компиляции шаблона с использованием Handlebars
  // eslint-disable-next-line class-methods-use-this
  _compile(): DocumentFragment {
    const propsAndStubs: Record<string, any> = { ...this.props, children2: this.children2 || {} }; // Создаем объект с свойствами и дочерними компонентами

    Object.entries(this.children).forEach(([key, child]) => { // Проходим по дочерним компонентам
      if (Array.isArray(child)) { // Если дочерних компонентов несколько
        propsAndStubs[key] = child.map( // Создаем заглушки для каждого дочернего компонента
          (component: Block) => `<div data-id="${component._id}"></div>`,
        );
      } else {
        propsAndStubs[key] = `<div data-id="${(child as Block)._id}"></div>`; // Создаем заглушку для одного дочернего компонента
      }
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement('template'); // Создаем временный фрагмент
    const template = Handlebars.compile(this.render()); // Компилируем шаблон с помощью Handlebars
    fragment.innerHTML = template(propsAndStubs); // Заполняем фрагмент скомпилированным шаблоном

    Object.values(this.children).forEach((child) => { // Проходим по дочерним компонентам
      if (Array.isArray(child)) { // Если дочерних компонентов несколько
        child.forEach((component: Block) => { // Проходим по каждому дочернему компоненту
          const stub = fragment.content.querySelector( // Ищем заглушку по id
            `[data-id="${component._id}"]`,
          );

          stub?.replaceWith(component.getContent()); // Заменяем заглушку на содержимое дочернего компонента
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${(child as Block)._id}"]`); // Ищем заглушку для одного дочернего компонента

        stub?.replaceWith((child as Block).getContent()); // Заменяем заглушку на содержимое дочернего компонента
      }
    });

    Object.entries(propsAndStubs.children2 || {}).forEach(([id, component]) => { // Проходим по дочерним компонентам
      const stub = fragment.content.querySelector(`[data-id="${id}"]`); // Ищем заглушку

      if (!stub) {
        return; // Если не нашли, выходим
      }

      const content = (component as Block).getContent(); // Получаем содержимое компонента
      stub.replaceWith(content); // Заменяем заглушку на содержимое компонента
    });

    return fragment.content; // Возвращаем заполненный фрагмент
  }

  // Метод для рендеринга компонента
  _render(): void {
    this._removeEvents(); // Удаляем старые обработчики событий
    const block = this._compile(); // Компилируем шаблон

    if (this._element?.children.length === 0) { // Если элемент пустой
      this._element.appendChild(block); // Добавляем новый контент
    } else {
      this._element?.replaceChildren(block); // Заменяем старый контент новым
    }

    this._addEvents(); // Добавляем новые обработчики событий
  }

  // Метод, который может переопределяться пользователем для рендеринга
  render(): string { return ''; }

  // Метод для получения содержимого компонента
  getContent(): HTMLElement {
    return this.element as HTMLElement;
  }

  // Метод для создания прокси для свойств
  // eslint-disable-next-line class-methods-use-this
  _makePropsProxy(props: Record<string, any>): Record<string, any> {
    const eventBus = this.eventBus(); // Получаем экземпляр EventBus
    const emitBind = eventBus.emit.bind(eventBus); // Привязываем метод emit к текущему контексту

    return new Proxy(props as any, { // Создаем прокси для свойств
      get(target, prop) { // Перехватываем доступ к свойствам
        const value = target[prop]; // Получаем значение свойства
        return typeof value === 'function' ? value.bind(target) : value; // Если это функция, привязываем ее к текущему контексту
      },
      set(target, prop: string, value: any): boolean { // Перехватываем установку свойств
        const oldTarget = { ...target }; // Копируем старые свойства
        // eslint-disable-next-line no-param-reassign
        target[prop] = value; // Устанавливаем новое значение

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target); // Генерируем событие обновления
        return true; // Возвращаем true, чтобы указать, что установка прошла успешно
      },
      deleteProperty() { // Перехватываем удаление свойств
        throw new Error('Нет доступа');
      },
    });
  }

  // Метод для создания HTML-элемента по тегу
  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string): any {
    return document.createElement(tagName);
  }

  // Метод для показа компонента
  show(): void {
    this.getContent()!.style.display = 'block';
  }

  // Метод для скрытия компонента
  hide(): void {
    this.getContent()!.style.display = 'none';
  }
}
