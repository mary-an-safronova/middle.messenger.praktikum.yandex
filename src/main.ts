import './style.css';
import Handlebars from 'handlebars';

const template = Handlebars.compile("Hello {{name}}!");

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector<HTMLDivElement>('#app');
  root!.innerHTML = template({ name: 'world' });
})
