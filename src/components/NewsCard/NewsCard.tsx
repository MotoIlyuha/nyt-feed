/**
 * Компактная карточка новости под макет из скриншота
 */

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { NormalizedArticle } from '../../types/nytimes';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import './NewsCard.css';

interface NewsCardProps {
  article: NormalizedArticle;
  onClick?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const currentLanguage = useSelector((state: RootState) => state.news.language);

  const handleClick = () => {
    if (onClick) return onClick();
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Абсолютная дата как в макете: "Feb 26, 2023, 16.32 PM"
  // Используем английскую локаль для месяца, как на скриншоте.
  const publishedAbsolute = dayjs(article.publishedDate)
    .locale('en')
    .format('MMM D, YYYY, HH.mm A');

  return (
    <article
      className="news-card news-card--compact"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open article: ${article.title}`}
    >
      <div className="news-card__content">
        {article.imageUrl && (
          <div className="news-card__image-container news-card__image-container--compact">
            <img
              className="news-card__image"
              src={article.imageUrl}
              alt=""
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="news-card__text">
          <div className="news-card__brand">{article.source}</div>

          <h3 className="news-card__title news-card__title--compact">
            {article.title}
          </h3>

          <time
            className="news-card__date"
            dateTime={article.publishedDate}
            title={publishedAbsolute}
          >
            {publishedAbsolute}
          </time>
        </div>
      </div>
    </article>
  );
};
