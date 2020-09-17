import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getTranslationLocator, getContent } from '@plone/volto/actions';
import { flattenToAppURL, changeLanguage } from '@plone/volto/helpers';
import { settings } from '~/config';

let locales = {};

if (settings) {
  settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const CreateTranslation = (props) => {
  const dispatch = useDispatch();
  const { language, translationOf } = props.location.state;
  const [translationLocation, setTranslationLocation] = React.useState(null);
  const [translationObject, setTranslationObject] = React.useState(null);

  React.useEffect(() => {
    // Only on mount, we dispatch the locator query
    dispatch(getTranslationLocator(translationOf, language)).then((resp) => {
      setTranslationLocation(resp['@id']);
    });
    //and we load the translationObject
    dispatch(getContent(translationOf, null, 'translationObject')).then(
      (resp) => {
        setTranslationObject(resp);
      },
    );
    // On unmount we dispatch the language change
    return () => {
      dispatch(changeLanguage(language, locales));
    };
    // On mount only
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    translationLocation &&
    translationObject && (
      <Redirect
        to={{
          pathname: `${flattenToAppURL(translationLocation)}/add`,
          search: `?type=${props.location.state.type}`,
          state: {
            translationOf: props.location.state.translationOf,
            language: props.location.state.language,
            translationObject: translationObject,
          },
        }}
      />
    )
  );
};

export default CreateTranslation;
