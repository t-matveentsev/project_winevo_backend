export const escapeRegex = (str = '') =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
