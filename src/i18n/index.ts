/**
 * Система интернационализации
 */

export type Language = 'en' | 'ru';

export interface Translations {
  // Header
  header: {
    title: string;
    menuButton: string;
  };
  
  // SideMenu
  sideMenu: {
    title: string;
    closeButton: string;
    language: string;
    languageSelector: string;
    menuItems: {
      home: string;
      politics: string;
      technology: string;
      sports: string;
      culture: string;
    };
    version: string;
  };
  
  // NewsCard
  newsCard: {
    readArticle: string;
    words: string;
  };
  
  // DateSeparator
  dateSeparator: {
    today: string;
    yesterday: string;
  };
  
  // NewsList
  newsList: {
    loadingError: string;
    retryButton: string;
    endOfArchive: string;
    loading: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: 'News',
      menuButton: 'Open menu',
    },
    sideMenu: {
      title: 'Menu',
      closeButton: 'Close menu',
      language: 'Language',
      languageSelector: 'Select language',
      menuItems: {
        home: 'Home',
        politics: 'Politics',
        technology: 'Technology',
        sports: 'Sports',
        culture: 'Culture',
      },
      version: 'Version 1.0.0',
    },
    newsCard: {
      readArticle: 'Read article',
      words: 'words',
    },
    dateSeparator: {
      today: 'Today',
      yesterday: 'Yesterday',
    },
    newsList: {
      loadingError: 'An error occurred while loading news',
      retryButton: 'Try again',
      endOfArchive: 'You have reached the beginning of the news archive',
      loading: 'Loading news...',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
    },
  },
  ru: {
    header: {
      title: 'Новости',
      menuButton: 'Открыть меню',
    },
    sideMenu: {
      title: 'Меню',
      closeButton: 'Закрыть меню',
      language: 'Язык',
      languageSelector: 'Выберите язык',
      menuItems: {
        home: 'Главная',
        politics: 'Политика',
        technology: 'Технологии',
        sports: 'Спорт',
        culture: 'Культура',
      },
      version: 'Версия 1.0.0',
    },
    newsCard: {
      readArticle: 'Читать статью',
      words: 'слов',
    },
    dateSeparator: {
      today: 'Сегодня',
      yesterday: 'Вчера',
    },
    newsList: {
      loadingError: 'Произошла ошибка при загрузке новостей',
      retryButton: 'Попробовать снова',
      endOfArchive: 'Вы достигли начала архива новостей',
      loading: 'Загружаются новости...',
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
    },
  },
};

// Функция для получения перевода
export const getTranslation = (language: Language): Translations => {
  return translations[language];
};

// Функция для получения текущего языка из localStorage
export const getCurrentLanguage = (): Language => {
  const saved = localStorage.getItem('nyt-feed-language') as Language;
  return saved && translations[saved] ? saved : 'en';
};

// Функция для сохранения языка в localStorage
export const setCurrentLanguage = (language: Language): void => {
  localStorage.setItem('nyt-feed-language', language);
};
