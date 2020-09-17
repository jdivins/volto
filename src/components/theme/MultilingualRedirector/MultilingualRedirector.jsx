import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import cookie from 'react-cookie';
import { settings } from '~/config';

import { languageLocales } from '@plone/volto/helpers';

const MultilingualRedirector = (props) => {
  const { pathname, children } = props;
  const currentLanguage = cookie.load('lang') || settings.defaultLanguage;
  const redirectToLanguage = settings.supportedLanguages.includes(
    currentLanguage,
  )
    ? currentLanguage
    : settings.defaultLanguage;
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ToDo: Add means to support language negotiation (with config)
    // const detectedLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    if (settings.isMultilingual && pathname === '/') {
      dispatch(
        updateIntl({
          locale: redirectToLanguage,
          messages: languageLocales[redirectToLanguage],
        }),
      );
    }
  }, [pathname, dispatch, redirectToLanguage]);

  return pathname === '/' && settings.isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
