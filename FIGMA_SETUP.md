# 🎨 Настройка дизайна по макету Figma

Этот файл содержит детальные инструкции по замене заглушек на реальные значения из макета Figma.

## 📋 Ссылки на макеты

- **Sidebar menu - light**: https://www.figma.com/design/c2nsKXdUDy8dDv5ICSSLXR/Besider---React-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5--Copy-?node-id=30-88&t=CbCQi69bfwsLRBUW-4
- **Search results - light**: https://www.figma.com/design/c2nsKXdUDy8dDv5ICSSLXR/Besider---React-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5--Copy-?node-id=34-336&t=CbCQi69bfwsLRBUW-4

## 🎯 Что нужно заменить

### 1. `/src/styles/variables.css` - Цветовая схема

```css
/* Заменить на реальные цвета из макета */
--color-primary: #007AFF; /* Основной синий цвет кнопок и акцентов */
--color-background: #FFFFFF; /* Фон приложения */
--color-surface: #F8F9FA; /* Фон карточек новостей */
--color-text-primary: #1A1A1A; /* Основной цвет текста */
--color-text-secondary: #8E8E93; /* Вторичный цвет текста */
--color-border: #E5E5EA; /* Цвет границ и разделителей */

/* Размеры шрифтов */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-md: 16px;
--font-size-lg: 18px;

/* Отступы */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;

/* Размеры компонентов */
--header-height: 60px;
--sidebar-width: 280px;
--news-card-border-radius: 12px;
```

### 2. `/src/components/Header/Header.tsx` - Шапка

**Заменить:**
- Иконку меню (гамбургер) на SVG из макета
- Текст "Новости" на логотип/название из макета
- Добавить дополнительные элементы (поиск, фильтры) если есть в макете

**Пример замены иконки:**
```tsx
// Вместо текущей SVG иконки меню
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  {/* Заменить на путь из макета Figma */}
  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
</svg>
```

### 3. `/src/components/SideMenu/SideMenu.tsx` - Боковое меню

**Заменить:**
- Список пунктов меню на реальные из макета
- Иконку закрытия на SVG из макета
- Заголовок меню
- Футер меню
- **Переключатель языка** - стилизовать согласно макету

**Пример структуры меню:**
```tsx
<ul className="side-menu__list">
  {/* Заменить на реальные пункты из макета */}
  <li className="side-menu__item">
    <a href="#" className="side-menu__link">
      <IconComponent /> {/* Добавить иконки из макета */}
      Название раздела
    </a>
  </li>
</ul>

{/* Переключатель языка - стилизовать согласно макету */}
<div className="side-menu__language-section">
  <h3 className="side-menu__language-title">
    {t.sideMenu.language}
  </h3>
  <div className="side-menu__language-selector">
    <button className="side-menu__language-button">
      🇺🇸 English
    </button>
    <button className="side-menu__language-button">
      🇷🇺 Русский
    </button>
  </div>
</div>
```

### 4. `/src/components/NewsCard/NewsCard.css` - Карточки новостей

**Основные параметры для настройки:**
- Размеры карточек
- Размеры изображений новостей
- Отступы внутри карточек
- Цвета текста и фона
- Радиусы закругления

**Пример настройки:**
```css
.news-card {
  /* Заменить размеры согласно макету */
  padding: var(--news-card-padding); /* 16px -> ? */
  border-radius: var(--news-card-border-radius); /* 12px -> ? */
  gap: var(--news-card-gap); /* 12px -> ? */
}

.news-card__image-container {
  /* Заменить размеры изображений */
  width: var(--news-image-width); /* 100px -> ? */
  height: var(--news-image-height); /* 72px -> ? */
}
```

### 5. `/src/components/SpinnerBlue/SpinnerBlue.css` - Синий спиннер

**Заменить:**
- Цвет спиннера на точный синий из макета
- Размер и толщину линий
- Анимацию если нужно

### 6. `/src/components/DateSeparator/DateSeparator.css` - Разделители дат

**Заменить:**
- Стиль разделительной линии
- Шрифт и цвет дат
- Отступы вокруг разделителя

## 🖼 Извлечение ресурсов из Figma

### Цвета:
1. Выделите элемент в Figma
2. В правой панели найдите Fill
3. Скопируйте HEX код цвета

### Размеры:
1. Выделите элемент
2. В правой панели посмотрите размеры W и H
3. Переведите px в CSS значения

### Иконки:
1. Выделите иконку
2. Кликните правой кнопкой → Copy → Copy as SVG
3. Вставьте SVG код в компонент

### Шрифты:
1. Выделите текст
2. В правой панели посмотрите:
   - Font family
   - Font weight
   - Font size
   - Line height

## 🔍 Проверочный список

- [ ] Замены все цвета в `variables.css`
- [ ] Обновлена иконка меню в Header
- [ ] Обновлена иконка закрытия в SideMenu
- [ ] Заменены пункты меню на реальные
- [ ] **Стилизован переключатель языка** согласно макету
- [ ] Настроены размеры карточек новостей
- [ ] Настроены размеры изображений в карточках
- [ ] Обновлен цвет спиннера загрузки
- [ ] Проверена адаптивность на мобильных устройствах
- [ ] Протестирована доступность (accessibility)
- [ ] **Протестировано переключение языков** (🇺🇸 English / 🇷🇺 Русский)

## 🚀 После настройки

После замены всех значений:
1. Запустите `npm run dev`
2. Сравните с макетом Figma
3. Протестируйте на разных размерах экрана
4. Проверьте все интерактивные элементы

---

💡 **Совет**: Используйте браузерные DevTools для точной настройки размеров и отступов в режиме реального времени.
