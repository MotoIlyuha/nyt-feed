/**
 * Компонент бокового меню (drawer)
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { closeSideMenu, setLanguage } from '../../store/newsSlice';
import { useTranslation } from '../../hooks/useTranslation';
import { setCurrentLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import './SideMenu.css';

export const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.news.sideMenuOpen);
  const currentLanguage = useSelector((state: RootState) => state.news.language);
  const t = useTranslation();

  // Закрытие меню по клавише Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        dispatch(closeSideMenu());
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Предотвращаем скролл фона
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, dispatch]);

  const handleOverlayClick = () => {
    dispatch(closeSideMenu());
  };

  const handleMenuClick = (event: React.MouseEvent) => {
    // Предотвращаем закрытие при клике внутри меню
    event.stopPropagation();
  };

  const handleLanguageChange = (language: Language) => {
    dispatch(setLanguage(language));
    setCurrentLanguage(language);
  };

  if (!isOpen) return null;

  return (
    <div className="side-menu-overlay" onClick={handleOverlayClick}>
      <div className="side-menu" onClick={handleMenuClick}>
        <div className="side-menu__header">
          <h2 className="side-menu__title">
            {t.sideMenu.title}
          </h2>
          <button
            className="side-menu__close-button"
            onClick={handleOverlayClick}
            aria-label={t.sideMenu.closeButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="side-menu__nav">
          <ul className="side-menu__list">
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.science}
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.general}
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.entertainment}
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.technology}
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.business}
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.health}
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                {t.sideMenu.menuItems.sports}
              </a>
            </li>
          </ul>

          {/* Переключатель языка */}
          <div className="side-menu__language-section">
            <h3 className="side-menu__language-title">
              {t.sideMenu.language}
            </h3>
            <div className="side-menu__language-selector">
              <button
                className={`side-menu__language-button ${
                  currentLanguage === 'en' ? 'side-menu__language-button--active' : ''
                }`}
                onClick={() => handleLanguageChange('en')}
                aria-label={`${t.sideMenu.languageSelector} - English`}
              >
                🇺🇸 English
              </button>
              <button
                className={`side-menu__language-button ${
                  currentLanguage === 'ru' ? 'side-menu__language-button--active' : ''
                }`}
                onClick={() => handleLanguageChange('ru')}
                aria-label={`${t.sideMenu.languageSelector} - Русский`}
              >
                🇷🇺 Русский
              </button>
            </div>
          </div>
        </nav>

        <div className="side-menu__footer">
          <p className="side-menu__version">
            {t.sideMenu.version}
          </p>
        </div>
      </div>
    </div>
  );
};
