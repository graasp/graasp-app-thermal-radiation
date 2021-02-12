import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LatticeRow from './LatticeRow';
import {
  IONS_OSCILLATION_RADIUS,
  IONS_OSCILLATION_SPEED_FACTOR,
  NUMBER_OF_ROWS_IN_LATTICE,
  SET_INTERVAL_TIME,
  IONS_OSCILLATION_OFFSET,
} from '../../config/constants';

class Lattice extends Component {
  static propTypes = {
    stageDimensions: PropTypes.shape({
      stageWidth: PropTypes.number.isRequired,
      stageHeight: PropTypes.number.isRequired,
    }).isRequired,
    temperature: PropTypes.number.isRequired,
    scales: PropTypes.shape({
      from: PropTypes.number.isRequired,
      to: PropTypes.string.isRequired,
    }).isRequired,
    isPaused: PropTypes.bool.isRequired,
  };

  state = {
    oscillation: 0,
    angle: 0,
  };

  componentDidMount() {
    const { isPaused } = this.props;
    if (!isPaused) {
      this.beginInterval();
    }
  }

  componentDidUpdate({ isPaused: prevIsPaused }) {
    const { isPaused } = this.props;
    if (isPaused !== prevIsPaused && isPaused) {
      clearInterval(this.interval);
      this.interval = null;
    } else if (isPaused !== prevIsPaused && !isPaused) {
      this.beginInterval();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  beginInterval = () => {
    if (!this.interval) {
      // set up general animation for positive ions
      this.interval = setInterval(() => {
        const {
          temperature,
          scales: { from, to },
        } = this.props;
        const { angle } = this.state;
        const oscillation = IONS_OSCILLATION_RADIUS * Math.sin(angle);

        this.setState({
          oscillation,
          angle:
            // transform from scale to float
            // add an offset to allow oscillation even at minumum temperature
            angle +
            (((temperature + IONS_OSCILLATION_OFFSET - from) * 1.0) / to) *
              IONS_OSCILLATION_SPEED_FACTOR,
        });
      }, SET_INTERVAL_TIME);
    }
  };

  render() {
    const { stageDimensions } = this.props;
    const { oscillation } = this.state;
    // create an array to map onto LatticeRow components
    const rows = [...Array(NUMBER_OF_ROWS_IN_LATTICE).keys()];

    return rows.map((row) => (
      <LatticeRow
        key={row}
        rowIndex={row}
        stageDimensions={stageDimensions}
        oscillation={oscillation}
      />
    ));
  }
}

const mapStateToProps = ({ lab }) => ({
  temperature: lab.temperature,
  scales: lab.scales,
  isPaused: lab.isPaused,
});

const ConnectedComponent = connect(mapStateToProps)(Lattice);

export default ConnectedComponent;
