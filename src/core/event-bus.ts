/* eslint-disable @typescript-eslint/no-explicit-any */

// Класс EventBus реализует паттерн "Шина событий", позволяющий компонентам
// подписываться на события и реагировать на них.
export default class EventBus {
  // Хранит слушателей событий. Ключом является название события, а значением - массив функций-обработчиков.
  private listeners: { [event: string]: Array<(...args: any[]) => void> };

  // Конструктор класса, инициализирует объект listeners как пустой объект.
  constructor() {
    this.listeners = {};
  }

  // Метод для подписки на событие.
  // Принимает название события и функцию-обработчик (callback).
  on(event: string, callback: (...args: any[]) => void): void {
    // Если для данного события еще не создан массив слушателей, создаем его.
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // Добавляем переданную функцию-обработчик в массив слушателей для данного события.
    this.listeners[event].push(callback);
  }

  // Метод для отписки от события.
  // Принимает название события и функцию-обработчик, которую нужно удалить.
  off(event: string, callback: (...args: any[]) => void): void {
    // Если нет слушателей для данного события, выбрасываем ошибку.
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    // Фильтруем массив слушателей, убирая переданную функцию-обработчик.
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  // Метод для вызова всех слушателей, подписанных на событие.
  // Принимает название события и любые дополнительные аргументы, которые будут переданы обработчикам.
  emit(event: string, ...args: any[]): void {
    // Если нет слушателей для данного события, выбрасываем ошибку.
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    // Вызываем каждый обработчик, передавая ему аргументы.
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
