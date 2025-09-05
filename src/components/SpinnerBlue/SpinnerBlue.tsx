/**
 * Синий спиннер для индикации загрузки (по макету Figma)
 */

import React from 'react';
import './SpinnerBlue.css';

interface SpinnerBlueProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const SpinnerBlue: React.FC<SpinnerBlueProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  return (
    <div 
      className={`spinner-blue spinner-blue--${size} ${className}`}
      role="status"
      aria-label="Загрузка"
    >
      <div className="spinner-blue__circle">
        <div className="spinner-blue__path"></div>
      </div>
      <span className="visually-hidden">Загружаются новости...</span>
    </div>
  );
};