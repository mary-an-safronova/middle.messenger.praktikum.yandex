import { Block } from './index';

export default function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
