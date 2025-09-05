/**
 * Типы для New York Times Archive API
 */

// Базовая структура ответа от NYT Archive API
export interface NYTimesResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTimesArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

// Структура отдельной статьи
export interface NYTimesArticle {
  _id: string;
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: MultimediaItem[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: KeywordItem[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name: string;
  byline: {
    original: string;
    person: PersonItem[];
    organization: string;
  };
  type_of_material: string;
  word_count: number;
  uri: string;
}

// Мультимедиа элементы (изображения, видео)
export interface MultimediaItem {
  rank: number;
  subtype: string;
  caption: string;
  credit: string;
  type: 'image' | 'video';
  url: string;
  height: number;
  width: number;
  legacy?: {
    xlarge?: string;
    xlargewidth?: number;
    xlargeheight?: number;
  };
  subType: string;
  crop_name: string;
}

// Ключевые слова
export interface KeywordItem {
  name: string;
  value: string;
  rank: number;
  major: string;
}

// Информация об авторах
export interface PersonItem {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
}

// Нормализованная структура статьи для Redux store
export interface NormalizedArticle {
  id: string;
  title: string; // abstract
  url: string; // web_url
  imageUrl?: string; // первое изображение из multimedia
  publishedDate: string; // pub_date
  source: string;
  snippet: string;
  wordCount: number;
}

// Группировка статей по датам
export interface ArticlesByDate {
  [date: string]: string[]; // date -> article IDs
}

// Состояние для хранения новостей
export interface NewsState {
  // Нормализованное хранение статей
  articles: {
    [id: string]: NormalizedArticle;
  };
  // Порядок статей
  articleOrder: string[];
  // Группировка по датам
  articlesByDate: ArticlesByDate;
  // UI состояние
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  // Текущая дата для пагинации
  currentYear: number;
  currentMonth: number;
  // Сайдбар
  sideMenuOpen: boolean;
}

// Параметры запроса для API
export interface FetchArticlesParams {
  year: number;
  month: number;
}