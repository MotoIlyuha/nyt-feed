/**
 * Redux slice для управления состоянием новостей
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { NewsState, NormalizedArticle, ArticlesByDate } from '../types/nytimes';

// Функция для группировки статей по датам
const groupArticlesByDate = (articles: NormalizedArticle[]): ArticlesByDate => {
  return articles.reduce((acc, article) => {
    const date = dayjs(article.publishedDate).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(article.id);
    return acc;
  }, {} as ArticlesByDate);
};

// Начальное состояние
const initialState: NewsState = {
  articles: {},
  articleOrder: [],
  articlesByDate: {},
  loading: false,
  loadingMore: false,
  hasMore: true,
  error: null,
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  sideMenuOpen: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // Управление загрузкой
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.loadingMore = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Установка статей (для начальной загрузки)
    setArticles: (state, action: PayloadAction<NormalizedArticle[]>) => {
      const articles = action.payload;
      
      // Нормализуем статьи в объект
      const normalizedArticles = articles.reduce((acc, article) => {
        acc[article.id] = article;
        return acc;
      }, {} as { [id: string]: NormalizedArticle });
      
      state.articles = normalizedArticles;
      state.articleOrder = articles.map(article => article.id);
      state.articlesByDate = groupArticlesByDate(articles);
      state.loading = false;
      state.error = null;
    },
    
    // Добавление новых статей (для infinite scroll)
    appendArticles: (state, action: PayloadAction<NormalizedArticle[]>) => {
      const newArticles = action.payload;
      
      // Добавляем новые статьи, избегая дубликатов
      const existingIds = new Set(state.articleOrder);
      const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.id));
      
      // Добавляем в нормализованное хранилище
      uniqueNewArticles.forEach(article => {
        state.articles[article.id] = article;
        state.articleOrder.push(article.id);
      });
      
      // Перегруппируем по датам
      const allArticles = state.articleOrder.map(id => state.articles[id]);
      state.articlesByDate = groupArticlesByDate(allArticles);
      
      state.loadingMore = false;
      state.hasMore = uniqueNewArticles.length > 0;
    },
    
    // Обновление статей сверху (для поллинга каждые 30 секунд)
    prependArticles: (state, action: PayloadAction<NormalizedArticle[]>) => {
      const newArticles = action.payload;
      
      // Фильтруем только действительно новые статьи
      const existingIds = new Set(state.articleOrder);
      const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.id));
      
      if (uniqueNewArticles.length === 0) return;
      
      // Добавляем новые статьи в начало
      uniqueNewArticles.forEach(article => {
        state.articles[article.id] = article;
      });
      
      // Добавляем ID в начало массива
      const newIds = uniqueNewArticles.map(article => article.id);
      state.articleOrder = [...newIds, ...state.articleOrder];
      
      // Перегруппируем по датам
      const allArticles = state.articleOrder.map(id => state.articles[id]);
      state.articlesByDate = groupArticlesByDate(allArticles);
    },
    
    // Переход к следующему месяцу для пагинации
    goToPreviousMonth: (state) => {
      if (state.currentMonth === 1) {
        state.currentMonth = 12;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
    },
    
    // Управление боковым меню
    toggleSideMenu: (state) => {
      state.sideMenuOpen = !state.sideMenuOpen;
    },
    
    closeSideMenu: (state) => {
      state.sideMenuOpen = false;
    },
    
    // Сброс состояния
    resetNews: (state) => {
      return initialState;
    },
  },
});

export const {
  setLoading,
  setLoadingMore,
  setError,
  setArticles,
  appendArticles,
  prependArticles,
  goToPreviousMonth,
  toggleSideMenu,
  closeSideMenu,
  resetNews,
} = newsSlice.actions;

export default newsSlice.reducer;
