import React from 'react';
import {
  Slider,
  withStyles,
} from '@material-ui/core';

export default withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 17,
    width: 2,
    marginTop: -5,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
