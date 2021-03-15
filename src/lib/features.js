import deepmerge from 'deepmerge';
import markdownit from 'markdown-it';
import Cookies from 'js-cookie';

import { getBanner } from '@/lib/services/banner';

const markdown = markdownit({
  html: false,
  linkify: true,
  typographer: true,
  breaks: false,
});

export function shouldDisplay(data, key) {
  if (!data?.enabled) return false;

  // One time cookie/session mode
  const STORE_KEY = key ? `bannery_display_${key}` : 'bannery_display';
  let storeKeyValue;
  switch (data?.display?.mode) {
    case 'cookie':
      storeKeyValue = Cookies.get(STORE_KEY);
      break;
    case 'session':
      storeKeyValue = sessionStorage.getItem(STORE_KEY);
      break;
  }

  if (storeKeyValue) return false;

  // startDate - endDate
  const currentDate = new Date();
  const startDate = new Date(data?.display?.startDate);
  const endDate = new Date(data?.display?.endDate);

  if (startDate === 'Invalid date' || endDate === 'Invalid date') return false;
  if (startDate && endDate && (currentDate < startDate || currentDate > endDate)) return false;

  // Set one time cookie/session
  const date = new Date();
  switch (data?.display?.mode) {
    case 'cookie':
      Cookies.set(STORE_KEY, date);
      break;
    case 'session':
      sessionStorage.setItem(STORE_KEY, date);
      break;
  }

  return true;
}

export function injectCss(css, key) {
  let id = 'bannery-styles';
  if (key) id += `-${key}`;
  document.getElementById(id)?.remove();
  if (!css) return;
  const styleTag = document.createElement('style');
  styleTag.setAttribute('id', id);
  styleTag.appendChild(document.createTextNode(css));
  document.head.appendChild(styleTag);
}

export function transformMarkdown(md) {
  if (!md) return md;
  return markdown.render(md);
}

export async function getOptions({ url, key, options, hooks }) {
  const urlOptions = url ? (await getBanner(url, key)) || {} : {};

  // Composing options
  let finalOptions = deepmerge(options, urlOptions);
  if (hooks.onOptions) finalOptions = hooks.onOptions(finalOptions);

  // Consistent options
  finalOptions.animation =
    finalOptions.position === 'top' && !finalOptions.animation
      ? 'slide-down-fade'
      : finalOptions.animation || 'slide-up-fade';

  return finalOptions;
}
