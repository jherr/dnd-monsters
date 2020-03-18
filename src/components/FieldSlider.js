import React from 'react';
import {
  Typography
} from '@material-ui/core';
import GreenSlider from './GreenSlider';

export default ({ field, label, value, onChange, min, max, activeMin, activeMax }) => (
  <>
    <Typography id="discrete-slider" gutterBottom>
      {label}
    </Typography>
    <GreenSlider
      value={value}
      onChange={(evt, value) => onChange(field, value)}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      min={min}
      max={max}
      marks={[{value: activeMin}, {value: activeMax}]}
    />
  </>
);
