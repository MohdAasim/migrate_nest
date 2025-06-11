export const ALLOWED_CATEGORIES = [
  'electronics',
  'fashion',
  'books',
  'appliances',
  'furniture',
] as const;

export type AllowedCategory = (typeof ALLOWED_CATEGORIES)[number];
