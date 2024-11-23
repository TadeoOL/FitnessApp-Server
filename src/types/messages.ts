import { messages } from '../locales';

export type Messages = typeof messages.en;
export type MessageCategory = keyof Messages;
export type MessageKeys = {
  [K in MessageCategory]: keyof Messages[K];
};

export type ValidMessageKeys<T extends MessageCategory> = MessageKeys[T]; 