/**
 * Виртуализированный компонент списка новостей
 */

import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { 
  useGetArchiveArticlesQuery, 
  useLazyGetArchiveArticlesQuery 
} from '../../services/nytimesApi';
import { 
  setArticles, 
  appendArticles, 
  setLoadingMore,
  goToPreviousMonth
} from '../../store/newsSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useTranslation } from '../../hooks/useTranslation';
import { NewsCard } from '../NewsCard';
import { DateSeparator } from '../DateSeparator';
import { SpinnerBlue } from '../SpinnerBlue';
import './NewsList.css';

// Высота элементов списка
const ITEM_HEIGHT = 180; // Примерная высота карточки
const DATE_SEPARATOR_HEIGHT = 60; // Высота разделителя дат

interface ListItemData {
  type: 'date' | 'article' | 'skeleton';
  data?: any;
  date?: string;
}

// Компонент элемента виртуализированного списка
const ListItem: React.FC<{
  index: number;
  style: React.CSSProperties;
  data: ListItemData[];
}> = ({ index, style, data }) => {
  const item = data[index];
  const t = useTranslation();
  
  if (!item) {
    return <div style={style}></div>;
  }

  return (
    <div style={style}>
      {item.type === 'date' && (
        <DateSeparator date={item.date!} />
      )}
      {item.type === 'article' && (
        <NewsCard article={item.data} />
      )}
      {item.type === 'skeleton' && (
        <NewsCard article={{
          id: `skeleton-${index}`,
          title: t.common.loading,
          url: '',
          publishedDate: new Date().toISOString(),
          source: t.common.loading,
          snippet: t.newsList.loading,
          wordCount: 0,
        }} />
      )}
    </div>
  );
};

export const NewsList: React.FC = () => {
  const dispatch = useDispatch();
  const t = useTranslation();
  const { 
    articles, 
    articleOrder, 
    articlesByDate, 
    loading, 
    loadingMore,
    hasMore,
    currentYear,
    currentMonth 
  } = useSelector((state: RootState) => state.news);
  
  const hasInitialized = useRef(false);

  // Запрос для получения архива (начальная загрузка)
  const { data: initialArticles, error: initialError, isLoading: isInitialLoading } = 
    useGetArchiveArticlesQuery({ year: currentYear, month: currentMonth });

  // Запрос для получения свежих новостей (отключен для стабильности)
  // const { data: latestArticles } = useGetLatestArticlesQuery();

  // Ленивый запрос для infinite scroll
  const [fetchMoreArticles] = useLazyGetArchiveArticlesQuery();

  // Обработка начальной загрузки
  useEffect(() => {
    if (initialArticles && !loading && initialArticles.length > 0 && !hasInitialized.current) {
      dispatch(setArticles(initialArticles));
      hasInitialized.current = true;
    }
  }, [initialArticles, dispatch]);

  // Обработка свежих новостей (отключено для стабильности)
  // useEffect(() => {
  //   if (latestArticles && latestArticles.length > 0) {
  //     dispatch(prependArticles(latestArticles));
  //   }
  // }, [latestArticles]);

  // Загрузка дополнительных статей для infinite scroll
  const loadMoreArticles = useCallback(async () => {
    if (loadingMore) return;
    
    dispatch(setLoadingMore(true));
    
    try {
      // Получаем предыдущий месяц
      let nextYear = currentYear;
      let nextMonth = currentMonth - 1;
      
      if (nextMonth === 0) {
        nextMonth = 12;
        nextYear -= 1;
      }
      
      // Проверяем, что не запрашиваем неподдерживаемые годы
      if (nextYear > 2019 || nextYear < 2019) {
        console.warn('Достигнут лимит доступных данных (2019 год)');
        dispatch(setLoadingMore(false));
        return;
      }
      
      const result = await fetchMoreArticles({ year: nextYear, month: nextMonth });
      
      if (result.data && result.data.length > 0) {
        dispatch(appendArticles(result.data));
        dispatch(goToPreviousMonth());
      } else {
        console.warn('Нет данных для загрузки');
        dispatch(setLoadingMore(false));
      }
    } catch (error) {
      console.error('Ошибка загрузки дополнительных статей:', error);
      dispatch(setLoadingMore(false));
    }
  }, [loadingMore, currentYear, currentMonth, dispatch]);

  // Подготовка данных для виртуализированного списка
  const listData = useMemo(() => {
    const items: ListItemData[] = [];
    
    if (isInitialLoading) {
      // Показываем скелетоны при начальной загрузке
      for (let i = 0; i < 10; i++) {
        items.push({ type: 'skeleton' });
      }
      return items;
    }

    // Группируем статьи по датам
    const sortedDates = Object.keys(articlesByDate).sort((a, b) => b.localeCompare(a));
    
    sortedDates.forEach(date => {
      // Добавляем разделитель даты
      items.push({ type: 'date', date });
      
      // Добавляем статьи за эту дату
      const articleIds = articlesByDate[date] || [];
      articleIds.forEach(articleId => {
        const article = articles[articleId];
        if (article) {
          items.push({ type: 'article', data: article });
        }
      });
    });

    return items;
  }, [articles, articlesByDate, isInitialLoading]);

  // Настройка infinite scroll
  const infiniteScrollRef = useInfiniteScroll({
    hasMore: hasMore && currentMonth > 1, // Останавливаем на январе 2019
    loading: loadingMore,
    onLoadMore: loadMoreArticles,
  });

  // Вычисляем высоту элементов с учетом типа
  const getItemSize = (index: number) => {
    const item = listData[index];
    if (item?.type === 'date') {
      return DATE_SEPARATOR_HEIGHT;
    }
    return ITEM_HEIGHT;
  };

  if (initialError) {
    return (
      <div className="news-list__error">
        <p>{t.newsList.loadingError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="news-list__retry-button"
        >
          {t.newsList.retryButton}
        </button>
      </div>
    );
  }

  return (
    <div className="news-list">
      <div className="news-list__container">
        {listData.length > 0 && (
          <List
            height={window.innerHeight - 60} // Высота минус шапка
            width="100%"
            itemCount={listData.length}
            itemSize={getItemSize}
            itemData={listData}
            overscanCount={5}
          >
            {ListItem}
          </List>
        )}
        
        {/* Элемент для infinite scroll */}
        <div ref={infiniteScrollRef} className="news-list__infinite-trigger">
          {loadingMore && (
            <SpinnerBlue size="medium" className="inline" />
          )}
        </div>
        
        {!hasMore && articleOrder.length > 0 && (
          <div className="news-list__end-message">
            <p>{t.newsList.endOfArchive}</p>
          </div>
        )}
      </div>
    </div>
  );
};
