import React from 'react';
import { Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';

import { fieldValuesAtom, rangesAtom } from '../atoms';
import { labels, ranges } from '../searchEngine';

import GreenSlider from './GreenSlider';

const Slider = ({ field }) => {
  const [value, setValue] = useRecoilState(fieldValuesAtom(field));
  const [activeRanges] = useRecoilState(rangesAtom);
  return (
    <>
      <Typography id="discrete-slider" gutterBottom>
        {labels[field]}
      </Typography>
      <GreenSlider
        value={value}
        onChange={(_, value) => setValue(value)}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={ranges[field].min}
        max={ranges[field].max}
        marks={[{ value: activeRanges[field].min }, { value: activeRanges[field].max }]}
      />
    </>
  );
};

export default Slider;
