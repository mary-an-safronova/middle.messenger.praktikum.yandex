// Функция клика на оверлей
export default function handleOverlayClick(event: MouseEvent, onClick: () => void): void {
  const target = event.target as HTMLElement;
  const overlay = target.closest('.overlay');

  // Проверяем, был ли клик на самом элементе overlay
  if (overlay && overlay === target) {
    onClick(); // Вызываем функцию закрытия модального окна
  }
}
