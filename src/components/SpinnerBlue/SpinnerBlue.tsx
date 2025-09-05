/**
 * Синий спиннер для индикации загрузки (по макету Figma)
 */

import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './SpinnerBlue.css';

interface SpinnerBlueProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const SpinnerBlue: React.FC<SpinnerBlueProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const t = useTranslation();
  
  return (
    <div 
      className={`spinner-blue spinner-blue--${size} ${className}`}
      role="status"
      aria-label={t.common.loading}
    >
      <div className="spinner-blue__circle">
        <div className="spinner-blue__path"></div>
      </div>
      <span className="visually-hidden">{t.newsList.loading}</span>
    </div>
  );
};
