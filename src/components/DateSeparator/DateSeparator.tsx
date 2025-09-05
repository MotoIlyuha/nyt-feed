/**
 * Компонент разделителя дат в ленте новостей
 */

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './DateSeparator.css';

// Настройка dayjs для русского языка
dayjs.locale('ru');

interface DateSeparatorProps {
  date: string; // Дата в формате YYYY-MM-DD
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  // Форматируем дату для отображения
  const formattedDate = dayjs(date).format('D MMMM YYYY');
  
  // Проверяем, является ли дата сегодняшней
  const isToday = dayjs(date).isSame(dayjs(), 'day');
  
  // Проверяем, является ли дата вчерашней
  const isYesterday = dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
  
  // Определяем текст для отображения
  let displayText = formattedDate;
  if (isToday) {
    displayText = `Сегодня, ${formattedDate}`;
  } else if (isYesterday) {
    displayText = `Вчера, ${formattedDate}`;
  }

  return (
    <div className="date-separator" role="separator" aria-label={`Новости за ${displayText}`}>
      <div className="date-separator__line"></div>
      <div className="date-separator__content">
        <time className="date-separator__text" dateTime={date}>
          {displayText}
        </time>
      </div>
      <div className="date-separator__line"></div>
    </div>
  );
};
