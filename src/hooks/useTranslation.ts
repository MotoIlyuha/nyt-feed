/**
 * Хук для работы с переводами
 */

import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { getTranslation, type Translations } from '../i18n';

export const useTranslation = (): Translations => {
  const language = useSelector((state: RootState) => state.news.language);
  return getTranslation(language);
};
