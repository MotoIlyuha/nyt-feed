/**
 * Компонент шапки приложения
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSideMenu } from '../../store/newsSlice';
import { useTranslation } from '../../hooks/useTranslation';
import './Header.css';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const t = useTranslation();

  const handleMenuClick = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <header className="header">
      <div className="header__content">
        <button
          className="header__menu-button"
          onClick={handleMenuClick}
          aria-label={t.header.menuButton}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12h18M3 6h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        
        <h1 className="header__title">
          {t.header.title}
        </h1>
        
        {/* Место для дополнительных элементов (поиск, фильтры и т.д.) */}
        <div className="header__actions">
          {/* TODO: Добавить элементы из макета */}
        </div>
      </div>
    </header>
  );
};
