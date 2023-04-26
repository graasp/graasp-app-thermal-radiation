import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Context, PermissionLevel } from '@graasp/sdk';
import { useSelector } from 'react-redux';
import { useLocalContext } from '@graasp/apps-query-client';
import StudentMode from './modes/student/StudentMode';
import { DEFAULT_LANG } from '../config/settings';
import TeacherMode from './modes/teacher/TeacherMode';

export const App = () => {
  const lang = useSelector((state) => state.context.lang);
  const { i18n } = useTranslation();
  const context = useLocalContext();

  // eslint-disable-next-line no-console
  console.log(context);

  const handleChangeLang = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const newLang = lang || context?.lang || DEFAULT_LANG;
    // set the language on first load
    if (newLang !== i18n.language) {
      handleChangeLang(newLang);
    }
  }, [context, lang]);

  // eslint-disable-next-line react/destructuring-assignment
  const view = context?.context;
  // eslint-disable-next-line react/destructuring-assignment
  const permission = context?.permission;
  switch (view) {
    // show teacher view when in producer (educator) mode
    case Context.BUILDER:
      if (
        permission === PermissionLevel.Admin ||
        permission === PermissionLevel.Write
      ) {
        return <TeacherMode view={view} />;
      }
      return <StudentMode />;

    default:
      return <StudentMode />;
  }
};

export default App;
