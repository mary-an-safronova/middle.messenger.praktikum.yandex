/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import Handlebars, { HelperOptions } from 'handlebars';
import { Block } from './index';

// Интерфейс для конструктора блока, который принимает свойства типа P.
export interface BlockConstructable<P> {
  new (props: P): Block; // Конструктор, который создает новый экземпляр Block с заданными свойствами.
}

// Основная функция для регистрации компонента в Handlebars.
export default function registerComponent<Props>(
  Component: BlockConstructable<Props>, // Принимаем компонент, который будет зарегистрирован.
) {
  // Регистрируем новый хелпер в Handlebars с именем компонента.
  Handlebars.registerHelper(
    Component.name,

    // eslint-disable-next-line func-names
    function (
      this: Props, // Контекст, в котором будет выполняться хелпер, должен содержать свойства Props.
      { hash: { ref, ...hash }, data, fn }: HelperOptions, // Деструктурируем параметры хелпера.
    ) {
      // Проверяем, есть ли в корневых данных поле children2, если нет - создаем его.
      if (!data.root.children2) {
        data.root.children2 = {};
      }
      // Проверяем, есть ли в корневых данных поле refs, если нет - создаем его.
      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children2, refs } = data.root; // Извлекаем созданные объекты для дальнейшего использования.

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       * Это позволяет заменять шаблонные переменные значениями из контекста.
       */
      (Object.keys(hash) as Array<keyof Props>).forEach((key: keyof Props) => { // Проходим по всем ключам, переданным в hash.
        if (this[key] !== undefined) {
          hash[key] = this[key]; // Прямое присваивание
        }
      });

      // Обработка ошибок, чтобы предотвратить потенциальные проблемы при регистрации компонента
      if (!Component || typeof Component !== 'function') {
        throw new Error('Компонент должен быть функцией');
      }

      // Создаем новый экземпляр компонента с переданными свойствами.
      const component = new Component(hash);
      // Сохраняем созданный компонент в children2 по его уникальному идентификатору.
      children2[component._id] = component;

      // Если передан референс, сохраняем содержимое компонента в refs.
      if (ref) {
        refs[ref] = component.getContent(); // Сохраняем ссылку на элемент компонента.
      }

      // Получаем содержимое, если передан шаблонный блок (fn).
      const contents = fn ? fn(this) : ''; // Если fn существует, вызываем его с контекстом.

      // Возвращаем HTML-код с уникальным идентификатором компонента.
      return `<div data-id="${component._id}">${contents}</div>`;
    },
  );
}
