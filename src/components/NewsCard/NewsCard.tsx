/**
 * Компонент карточки новости
 */

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { NormalizedArticle } from '../../types/nytimes';
import './NewsCard.css';

// Настройка dayjs
dayjs.extend(relativeTime);
dayjs.locale('ru');

interface NewsCardProps {
  article: NormalizedArticle;
  onClick?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Открываем оригинальную статью на NYT
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Форматирование времени
  const timeAgo = dayjs(article.publishedDate).fromNow();
  const fullDate = dayjs(article.publishedDate).format('DD.MM.YYYY, HH:mm');

  return (
    <article
      className="news-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Читать статью: ${article.title}`}
    >
      <div className="news-card__content">
        <div className="news-card__text">
          <h3 className="news-card__title">
            {article.title}
          </h3>
          
          {article.snippet && (
            <p className="news-card__snippet">
              {article.snippet}
            </p>
          )}
          
          <div className="news-card__meta">
            <span className="news-card__source">
              {article.source}
            </span>
            <span className="news-card__separator">•</span>
            <time 
              className="news-card__time"
              dateTime={article.publishedDate}
              title={fullDate}
            >
              {timeAgo}
            </time>
            {article.wordCount > 0 && (
              <>
                <span className="news-card__separator">•</span>
                <span className="news-card__word-count">
                  {article.wordCount} слов
                </span>
              </>
            )}
          </div>
        </div>
        
        {article.imageUrl && (
          <div className="news-card__image-container">
            <img
              className="news-card__image"
              src={article.imageUrl}
              alt=""
              loading="lazy"
              onError={(e) => {
                // Скрываем изображение при ошибке загрузки
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
      
      {/* Индикатор внешней ссылки */}
      <div className="news-card__link-indicator">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
};
