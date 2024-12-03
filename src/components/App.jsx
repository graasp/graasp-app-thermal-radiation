import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TeacherMode from './modes/teacher/TeacherMode';
import { DEFAULT_LANG } from '../config/settings';

export const App = () => {
  const lang = useSelector((state) => state.context.lang);
  const { i18n } = useTranslation();

  const handleChangeLang = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (lang !== i18n.language) {
      handleChangeLang(lang || DEFAULT_LANG);
    }
  }, [lang]);

  return <TeacherMode />;
};

export default App;
