/* eslint-disable no-console */
import { Block } from './index';

export default function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';
    root.appendChild(block.getContent());
  } else {
    console.error(`Element with selector "${query}" not found`); // Обработка ошибки
  }
}
