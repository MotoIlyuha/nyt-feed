# NYT Feed - Мобильное новостное приложение

Мобильное приложение для просмотра новостей New York Times с бесконечной прокруткой и группировкой по датам.

## 🚀 Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизированный JavaScript
- **Redux Toolkit** - управление состоянием
- **RTK Query** - запросы к API
- **react-window** - виртуализация списка
- **dayjs** - работа с датами
- **Vite** - сборщик модулей

## 📱 Функциональность

- ✅ Мобильная адаптивная верстка по макету Figma
- ✅ Бесконечная прокрутка с загрузкой предыдущих месяцев
- ✅ Группировка новостей по датам с разделителями
- ✅ Обновление новостей каждые 30 секунд
- ✅ Боковое меню (drawer)
- ✅ Виртуализация списка для производительности
- ✅ Скелетоны при загрузке
- ✅ Переход к оригинальным статьям на NYT

## 🛠 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🎨 Настройка стилей под макет Figma

В файлах необходимо заменить значения на реальные из макета:

### `/src/styles/variables.css`
```css
/* TODO: Заменить цвета из макета Figma */
--color-primary: #007AFF; /* Основной синий цвет */
--color-background: #FFFFFF; /* Фон приложения */
--color-surface: #F8F9FA; /* Фон карточек */
/* ... другие переменные */
```

### Компоненты требующие стилизации:
- `/src/components/Header/Header.css` - шапка приложения
- `/src/components/SideMenu/SideMenu.css` - боковое меню
- `/src/components/NewsCard/NewsCard.css` - карточки новостей
- `/src/components/DateSeparator/DateSeparator.css` - разделители дат
- `/src/components/SpinnerBlue/SpinnerBlue.css` - синий спиннер

## 📡 API конфигурация

API Key для NYT уже встроен в код. Прокси настроен в `vite.config.ts`:

```typescript
proxy: {
  '/nyt': {
    target: 'https://api.nytimes.com/svc/archive/v1',
    changeOrigin: true,
    rewrite: p => p.replace(/^\/nyt/, '')
  }
}
```

## 📂 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Header/          # Шапка приложения
│   ├── SideMenu/        # Боковое меню
│   ├── NewsCard/        # Карточка новости
│   ├── DateSeparator/   # Разделитель дат
│   ├── SpinnerBlue/     # Синий спиннер
│   └── NewsList/        # Виртуализированный список
├── hooks/               # Кастомные хуки
│   └── useInfiniteScroll.ts
├── services/            # API сервисы
│   └── nytimesApi.ts    # NYT API с RTK Query
├── store/               # Redux store
│   ├── index.ts         # Конфигурация store
│   └── newsSlice.ts     # Slice для новостей
├── styles/              # Глобальные стили
│   ├── variables.css    # CSS переменные
│   └── base.css         # Базовые стили
└── types/               # TypeScript типы
    └── nytimes.ts       # Типы для NYT API
```

## 🔧 Основные компоненты

### `<NewsList />`
Виртуализированный список новостей с:
- Бесконечной прокруткой
- Группировкой по датам
- Скелетонами при загрузке
- Обновлением каждые 30 секунд

### `<NewsCard />`
Карточка новости с:
- Заголовком и кратким описанием
- Изображением (если есть)
- Метаданными (источник, дата, количество слов)
- Переходом к оригинальной статье

### `<Header />` и `<SideMenu />`
Шапка приложения с кнопкой меню и выдвигающееся боковое меню.

## 📊 Управление состоянием

Состояние приложения управляется через Redux Toolkit:
- **Нормализованное хранение** статей по ID
- **Группировка по датам** для отображения разделителей
- **Пагинация** через год/месяц для infinite scroll
- **UI состояние** (loading, сайдбар, ошибки)

## 🎯 Следующие шаги

1. **Стилизация**: заменить TODO комментарии на реальные значения из макета Figma
2. **Иконки**: добавить правильные иконки для меню, закрытия и внешних ссылок
3. **Тестирование**: добавить unit и integration тесты
4. **SEO**: добавить meta теги и structured data
5. **PWA**: превратить в прогрессивное веб-приложение

## 🐛 Известные ограничения

- NYT Archive API предоставляет данные только за полные месяцы
- Некоторые статьи могут не содержать изображения
- Rate limiting API может потребовать обработки ошибок

## 📝 Лицензия

<<<<<<< Current (Your changes)
You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
MIT License
>>>>>>> Incoming (Background Agent changes)
