import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Loader from '../../common/Loader';
import { langs } from '../../../config/i18n';
import { changeLanguage } from '../../../actions';
import { FORM_CONTROL_MIN_WIDTH } from '../../../config/constants';
import { DEFAULT_LANG } from '../../../config/settings';

const styles = () => ({
  formControl: {
    minWidth: FORM_CONTROL_MIN_WIDTH,
    width: '100%',
  },
});

class LanguageSelect extends Component {
  static propTypes = {
    dispatchChangeLanguage: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func,
    }).isRequired,
    classes: PropTypes.shape({
      formControl: PropTypes.string.isRequired,
    }).isRequired,
    lang: PropTypes.oneOf(Object.keys(langs)).isRequired,
    activity: PropTypes.bool.isRequired,
  };

  handleChangeLanguage = (lang) => {
    const newLang = lang.target.value;
    const { dispatchChangeLanguage, i18n } = this.props;
    i18n.changeLanguage(newLang);
    dispatchChangeLanguage(newLang);
  };

  renderLanguageOptions = () =>
    Object.keys(langs).map((lang) => (
      <MenuItem value={lang} key={lang}>
        <em>{langs[lang]}</em>
      </MenuItem>
    ));

  render() {
    const { t, classes, lang, activity } = this.props;

    if (activity) {
      return <Loader />;
    }

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="lang">{t('Language')}</InputLabel>
        <Select
          value={lang}
          onChange={this.handleChangeLanguage}
          inputProps={{
            name: 'lang',
            id: 'lang',
          }}
        >
          {this.renderLanguageOptions()}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = ({ appInstance }) => ({
  lang: appInstance.content.settings?.lang || DEFAULT_LANG,
  activity: Boolean(appInstance.activity.length),
});

const mapDispatchToProps = {
  dispatchChangeLanguage: changeLanguage,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSelect);

const StyledComponent = withStyles(styles)(ConnectedComponent);

const TranslatedComponent = withTranslation()(StyledComponent);

export default TranslatedComponent;
