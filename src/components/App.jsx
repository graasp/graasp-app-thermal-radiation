import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DEFAULT_LANG } from '../config/settings';
import TeacherMode from './modes/teacher/TeacherMode';

export const App = () => {
  const lang = useSelector((state) => state.context.lang);
  const { i18n } = useTranslation();

  const handleChangeLang = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  // useEffect(() => {
  //   const newLang = lang || context?.lang;
  //   // set the language on first load
  //   if (newLang !== i18n.language) {
  //     handleChangeLang(newLang || DEFAULT_LANG);
  //   }
  // }, [context]);

  return <TeacherMode />;
};

export default App;
