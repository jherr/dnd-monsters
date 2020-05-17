import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import GreenSlider from './GreenSlider';

const Slider = ({ field, label, value, onChange, min, max, activeMin, activeMax }) => (
  <>
    <Typography id="discrete-slider" gutterBottom>
      {label}
    </Typography>
    <GreenSlider
      value={value}
      onChange={(_, val) => onChange(field, val)}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      min={min}
      max={max}
      marks={[{ value: activeMin }, { value: activeMax }]}
    />
  </>
);

Slider.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  activeMin: PropTypes.number.isRequired,
  activeMax: PropTypes.number.isRequired,
};

export default Slider;
