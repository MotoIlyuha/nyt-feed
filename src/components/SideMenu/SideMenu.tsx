/**
 * Компонент бокового меню (drawer)
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { closeSideMenu } from '../../store/newsSlice';
import './SideMenu.css';

export const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.news.sideMenuOpen);

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

  if (!isOpen) return null;

  return (
    <div className="side-menu-overlay" onClick={handleOverlayClick}>
      <div className="side-menu" onClick={handleMenuClick}>
        <div className="side-menu__header">
          <h2 className="side-menu__title">
            {/* TODO: Заменить на заголовок из макета */}
            Меню
          </h2>
          <button
            className="side-menu__close-button"
            onClick={handleOverlayClick}
            aria-label="Закрыть меню"
          >
            {/* TODO: Заменить на иконку закрытия из макета */}
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
          {/* TODO: Добавить пункты меню из макета Figma */}
          <ul className="side-menu__list">
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                Главная
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                Политика
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                Технологии
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                Спорт
              </a>
            </li>
            <li className="side-menu__item">
              <a href="#" className="side-menu__link">
                Культура
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="side-menu__footer">
          {/* TODO: Добавить футер меню из макета */}
          <p className="side-menu__version">
            Версия 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};
