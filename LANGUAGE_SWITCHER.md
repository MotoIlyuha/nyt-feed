# 🌐 Переключатель языка

Добавлен переключатель языка в боковое меню с поддержкой английского и русского языков.

## ✨ Функциональность

- **🇺🇸 English** - язык по умолчанию (соответствует макету Figma)
- **🇷🇺 Русский** - полная локализация интерфейса
- **Автосохранение** выбранного языка в localStorage
- **Динамическое обновление** всех текстов без перезагрузки
- **Локализация дат** с помощью dayjs

## 🎯 Где используется

### Компоненты с переводами:
- **Header** - заголовок и aria-label кнопки меню
- **SideMenu** - все пункты меню, переключатель языка, версия
- **NewsCard** - aria-label, текст "слов"
- **DateSeparator** - "Сегодня", "Вчера", форматирование дат
- **NewsList** - сообщения об ошибках, загрузке, конце архива
- **SpinnerBlue** - aria-label и скрытый текст

### Файлы переводов:
- `src/i18n/index.ts` - все переводы и настройки
- `src/hooks/useTranslation.ts` - хук для использования переводов

## 🔧 Техническая реализация

### Redux состояние:
```typescript
interface NewsState {
  // ... другие поля
  language: 'en' | 'ru'; // Язык интерфейса
}
```

### Использование в компонентах:
```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const t = useTranslation();
  
  return <h1>{t.header.title}</h1>;
};
```

### Переключение языка:
```tsx
import { setLanguage } from '../../store/newsSlice';
import { setCurrentLanguage } from '../../i18n';

const handleLanguageChange = (language: Language) => {
  dispatch(setLanguage(language));
  setCurrentLanguage(language);
};
```

## 🎨 Стилизация

Переключатель языка находится в `.side-menu__language-section`:

```css
.side-menu__language-section {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.side-menu__language-selector {
  display: flex;
  gap: var(--spacing-xs);
}

.side-menu__language-button {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  /* ... остальные стили */
}

.side-menu__language-button--active {
  background: var(--color-primary);
  color: white;
}
```

## 📱 Соответствие макету

Переключатель языка размещен в боковом меню согласно макету Figma:
- [Sidebar menu - light](https://www.figma.com/design/c2nsKXdUDy8dDv5ICSSLXR/Besider---React-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5--Copy-?node-id=30-88&t=CbCQi69bfwsLRBUW-4)

## 🚀 Добавление новых языков

1. Добавить язык в `Language` тип в `src/i18n/index.ts`
2. Добавить переводы в объект `translations`
3. Обновить `getCurrentLanguage()` и `setCurrentLanguage()`
4. Добавить кнопку в `SideMenu.tsx`
5. Обновить стили в `SideMenu.css`

## 🔍 Тестирование

- [ ] Переключение между языками работает
- [ ] Выбранный язык сохраняется после перезагрузки
- [ ] Все тексты обновляются динамически
- [ ] Даты отображаются в правильной локали
- [ ] Aria-labels обновляются для доступности
