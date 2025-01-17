function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Сегодняшняя дата без времени
  const dateDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Дата из строки без времени

  if (dateDate.getTime() === today.getTime()) {
    // Сегодня
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Начало недели (понедельник)

  if (startOfWeek <= date && date < today) {
    // На этой неделе
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1); // Заглавная первая буква
  }

  // Другие даты
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-RU', options);
  return formattedDate.replace(/г\.$/, ''); // убираем "г." в конце
}

export default formatDate;
