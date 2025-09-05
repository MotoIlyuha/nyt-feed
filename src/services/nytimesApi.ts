/**
 * RTK Query API сервис для работы с New York Times Archive API
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NYTimesResponse, FetchArticlesParams, NormalizedArticle } from '../types/nytimes';

// API ключ для NYT
const NYT_API_KEY = 'nQ4Zm6ufztAi3r6qbfi7UlQWZz7ZpN4o';

// Функция для нормализации URL изображений
const normalizeImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `https://www.nytimes.com/${url}`;
};

// Функция для нормализации статьи
const normalizeArticle = (article: any): NormalizedArticle => {
  // Находим первое доступное изображение
  const imageItem = article.multimedia?.find((item: any) => 
    item.type === 'image' && item.url
  );
  
  return {
    id: article._id,
    title: article.abstract || article.headline?.main || '',
    url: article.web_url,
    imageUrl: imageItem ? normalizeImageUrl(imageItem.url) : undefined,
    publishedDate: article.pub_date,
    source: article.source || 'The New York Times',
    snippet: article.snippet || '',
    wordCount: article.word_count || 0,
  };
};

// RTK Query API
export const nytimesApi = createApi({
  reducerPath: 'nytimesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/nyt', // Используем прокси из vite.config.ts
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    // Получение статей за определенный месяц/год
    getArchiveArticles: builder.query<NormalizedArticle[], FetchArticlesParams>({
      query: ({ year, month }) => ({
        url: `/${year}/${month}.json`,
        params: {
          'api-key': NYT_API_KEY,
        },
      }),
      transformResponse: (response: NYTimesResponse): NormalizedArticle[] => {
        return response.response.docs
          .map(normalizeArticle)
          .filter((article) => article.title && article.url) // Фильтруем статьи без заголовка или URL
          .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()) // Сортируем по дате убывания
          .slice(0, 50); // Ограничиваем количество статей для производительности
      },
      providesTags: (_result, _error, { year, month }) => [
        { type: 'Articles', id: `${year}-${month}` },
      ],
    }),
    
    // Получение последних статей (используем 2024 год, так как API поддерживает только до 2019)
    getLatestArticles: builder.query<NormalizedArticle[], void>({
      query: () => {
        // Используем последний доступный год (2019) и месяц (12)
        return {
          url: '/2019/12.json',
          params: {
            'api-key': NYT_API_KEY,
          },
        };
      },
      transformResponse: (response: NYTimesResponse): NormalizedArticle[] => {
        return response.response.docs
          .map(normalizeArticle)
          .filter((article) => article.title && article.url)
          .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
          .slice(0, 10); // Берем только первые 10 статей
      },
      providesTags: ['Articles'],
    }),
  }),
});

export const { 
  useGetArchiveArticlesQuery, 
  useGetLatestArticlesQuery,
  useLazyGetArchiveArticlesQuery 
} = nytimesApi;
