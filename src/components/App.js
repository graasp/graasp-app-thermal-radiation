import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import StudentMode from './modes/student/StudentMode';
import { getContext } from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE, MODES } from '../config/settings';
import { DEFAULT_VIEW } from '../config/views';
import TeacherMode from './modes/teacher/TeacherMode';
import ProgressScreen from './common/LoadingScreen';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
      changeLanguage: PropTypes.func,
    }).isRequired,
    dispatchGetContext: PropTypes.func.isRequired,
    lang: PropTypes.string,
    mode: PropTypes.string,
    view: PropTypes.string,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
    view: DEFAULT_VIEW,
    loading: true,
  };

  constructor(props) {
    super(props);
    // first thing to do is get the context
    props.dispatchGetContext();
  }

  componentDidMount() {
    const { lang } = this.props;
    // set the language on first load
    this.handleChangeLang(lang);
  }

  componentDidUpdate({ lang: prevLang }) {
    const { lang } = this.props;
    // handle a change of language
    if (lang !== prevLang) {
      this.handleChangeLang(lang);
    }
  }

  handleChangeLang = (lang) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const { mode, view, loading } = this.props;

    if (loading) {
      return <ProgressScreen />;
    }

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case MODES.TEACHER:
      case MODES.PRODUCER:
      case MODES.EDUCATOR:
      case MODES.ADMIN:
        return <TeacherMode view={view} />;

      // by default go with the consumer (learner) mode
      case MODES.STUDENT:
      case MODES.CONSUMER:
      case MODES.LEARNER:
      default:
        return <StudentMode />;
    }
  }
}

const mapStateToProps = ({ context, layout }) => ({
  lang: context.lang,
  mode: context.mode,
  view: context.view,
  standalone: context.standalone,
  loading: layout.showLoader,
});

const mapDispatchToProps = {
  dispatchGetContext: getContext,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withTranslation()(ConnectedApp);
