import { MessageCategory } from '../middleware/error.middleware';
import { en } from './en';
import { es } from './es';

type MessageStructure = {
  [key: string]: { [key: string]: string }
};

export type Language = 'en' | 'es';

export const messages: Record<Language, MessageStructure> = {
  en,
  es
} as const;

export type MessageKeys = keyof typeof messages.en;

export const getMessage = (
  lang: Language,
  category: MessageCategory,
  key: MessageKeys
): string => {
  return messages[lang]?.[category]?.[key] || messages.en[category][key];
}; 