import cookie from 'react-cookie';
import { updateIntl } from 'react-intl-redux';
import { settings } from '~/config';

export let languageLocales = {};

if (settings) {
  settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      languageLocales = { ...languageLocales, [lang]: locale.default };
    });
  });
}

/**
 * Change language.
 * How to use: dispatch(changeLanguage(language));
 */
export function changeLanguage(language) {
  cookie.save('lang', language, {
    expires: new Date((2 ** 31 - 1) * 1000),
    path: '/',
  });

  return updateIntl({
    locale: language,
    messages: languageLocales[language],
  });
}
