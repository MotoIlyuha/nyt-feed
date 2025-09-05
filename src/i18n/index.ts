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
      science: string;
      general: string;
      entertainment: string;
      home: string;
      technology: string;
      business: string;
      health: string;
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
      title: 'BESIDER',
      menuButton: 'Open menu',
    },
    sideMenu: {
      title: 'Menu',
      closeButton: 'Close menu',
      language: 'Language',
      languageSelector: 'Select language',
      menuItems: {
        science: 'Science',
        general: 'General',
        entertainment: 'Entertainment',
        technology: 'Technology',
        business: 'Business',
        health: 'Health',
        sports: 'Sports',
        culture: 'Culture',
        home: 'Home',
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
        science: 'Наука',
        general: 'Общее',
        entertainment: 'Развлечения',
        technology: 'Технологии',
        business: 'Бизнес',
        health: 'Здоровье',
        sports: 'Спорт',
        culture: 'Культура',
        home: 'Главная',
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
