import { useRouter } from 'next/router';
import * as i18nEnUs from './en-us';
import * as i18nDeDe from './de-de';
import * as i18nSkSk from './sk-sk';

const urlTranslations = {
  'en-US': i18nEnUs.url || {},
  'de-DE': i18nDeDe.url || {},
  'sk-SK': i18nSkSk.url || {},
};

const translations = {
  'en-US': {
    ...Object.values(i18nEnUs).reduce((a, b) => ({ ...a, ...b }), {}),
  },
  'de-DE': {
    ...Object.values(i18nDeDe).reduce((a, b) => ({ ...a, ...b }), {}),
  },
  'sk-SK': {
    ...Object.values(i18nSkSk).reduce((a, b) => ({ ...a, ...b }), {}),
  },
};

function replaceVars(string, vars) {
  const allVarsStrings = !Object.values(vars).find((x) => typeof x === 'object');

  // String Replacer
  if (allVarsStrings) {
    let str = string;
    Object.keys(vars).forEach((key) => {
      str = str.replaceAll(`{${key}}`, vars[key]);
    });
    return str;
  }

  // Element Replacer
  let partsArray = [string];
  Object.keys(vars).forEach((key) => {
    if (typeof vars[key] !== 'object') {
      partsArray[0] = partsArray[0].replaceAll(`{${key}}`, vars[key]);
    }
  });
  let copyArray = [];
  Object.keys(vars).forEach((key) => {
    if (typeof vars[key] === 'object') {
      partsArray.forEach((x) => {
        if (typeof x === 'string') {
          const splittedArray = [];

          x.split(`{${key}}`).forEach((y) => {
            splittedArray.push(y);
            splittedArray.push(vars[key]);
          });

          copyArray.push(...splittedArray.slice(0, -1));
        } else {
          copyArray.push(x);
        }
      });
      partsArray = copyArray;
      copyArray = [];
    }
  });
  return partsArray;
}

export const Languages = Object.keys(translations);

export function GetCurrentLocale() {
  const router = useRouter();
  return translations[router.locale] ? router.locale : 'en-US';
}

export function GetLocaleLink(locale) {
  // eslint-disable-next-line no-param-reassign
  locale = `${locale.split('-')[0]}-${locale.split('-')[1].toUpperCase()}`;

  const router = useRouter();
  const query = router.asPath.split('?').slice(1).join('?');
  let path = router.asPath.split('?')[0];
  path = `/${path.split('/').slice(3).join('/')}`;

  if (locale === router.defaultLocale) {
    return `${path}${query ? `?${query}` : ''}`;
  }

  return `/${locale}${path}${query ? `?${query}` : ''}`;
}

export default function GetTranslation(key, langOrVars = undefined, vars = undefined) {
  const router = useRouter();
  const translatedString = translations[router.locale][key]
    || translations['en-US'][key]
    || `{${key}}`;

  if (typeof langOrVars === 'string' && translations?.[langOrVars]?.[key]) {
    if (typeof vars === 'object') {
      return replaceVars(translations?.[langOrVars]?.[key] || translatedString, vars);
    }

    return translations?.[langOrVars]?.[key] || translatedString;
  }

  if (typeof langOrVars === 'object') {
    return replaceVars(translatedString, langOrVars);
  }

  return translatedString;
}

export function GetTranslatedLink(url, skipReverseSearch = false) {
  let normalizedUrl = decodeURIComponent(url);

  if (!normalizedUrl.startsWith('/')) {
    try {
      normalizedUrl = new URL(url);
    } catch (e) {
      throw new Error('Unsupported URL');
    }
  } else {
    try {
      normalizedUrl = new URL(`https://url${url}`);
    } catch (e) {
      throw new Error('Unsupported URL');
    }
  }

  let path = decodeURIComponent(normalizedUrl.pathname);
  let locale = path.match(/^\/([a-z]{2}-[A-Z]{2})\//)?.[1];

  if (!locale) {
    locale = 'en-US';
  } else {
    path = path.substr(locale.length + 1);
  }

  const prefix = locale === 'en-US' ? '' : `/${locale}`;
  let translatedPath = path;

  if (urlTranslations[locale]?.[path]) {
    // Translation found
    translatedPath = urlTranslations[locale]?.[path];
  } else if (urlTranslations['en-US']?.[path]) {
    // Translation not found, but it exists in US-english
    translatedPath = urlTranslations['en-US']?.[path];
  } else if (!skipReverseSearch) {
    // Translation not found, does not exist in English, try reverse search and
    // return current locale translation if found
    for (let i = 0; i < Object.keys(urlTranslations).length; i += 1) {
      const translationsValues = Object.values(urlTranslations)[i];

      for (let j = 0; j < Object.keys(translationsValues).length; j += 1) {
        if (Object.values(translationsValues)[j] === path) {
          return GetTranslatedLink(prefix + Object.keys(translationsValues)[j], true);
        }
      }
    }
  }

  normalizedUrl.pathname = `${prefix}${translatedPath}`;

  return normalizedUrl.pathname + normalizedUrl.search + normalizedUrl.hash;
}
