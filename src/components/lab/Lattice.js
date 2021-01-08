import React from 'react';
import PropTypes from 'prop-types';
import LatticeRow from './LatticeRow';
import { NUMBER_OF_ROWS_IN_LATTICE } from '../../config/constants';

const Lattice = ({ stageDimensions }) => {
  // create an array to map onto LatticeRow components
  const rows = [...Array(NUMBER_OF_ROWS_IN_LATTICE).keys()];

  return rows.map((row) => (
    <LatticeRow key={row} rowIndex={row} stageDimensions={stageDimensions} />
  ));
};

Lattice.propTypes = {
  stageDimensions: PropTypes.shape({
    stageWidth: PropTypes.number.isRequired,
    stageHeight: PropTypes.number.isRequired,
  }).isRequired,
};

export default Lattice;
