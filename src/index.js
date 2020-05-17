import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';
import { RecoilRoot, useRecoilState } from 'recoil';

import { labels, ranges, fields } from './searchEngine';

import FieldSlider from './components/FieldSlider';
import ResultTable from './components/ResultTable';
import SearchBox from './components/SearchBox';

import { fieldValuesAtom, rangesAtom } from './atoms';

const FieldSliders = () => {
  const [values, setValues] = useRecoilState(fieldValuesAtom);
  const [activeRanges] = useRecoilState(rangesAtom);

  return (
    <>
      {fields.map((f) => (
        <FieldSlider
          field={f}
          label={labels[f]}
          value={values[f]}
          onChange={(field, value) => {
            setValues({
              ...values,
              [field]: value,
            });
          }}
          min={ranges[f].min}
          max={ranges[f].max}
          activeMin={activeRanges[f].min}
          activeMax={activeRanges[f].max}
          key={f}
        />
      ))}
    </>
  );
};

const App = () => (
  <Grid container spacing={3}>
    <Grid item md={3} xs={12}>
      <SearchBox />
      <FieldSliders />
    </Grid>
    <Grid item md={9} xs={12}>
      <ResultTable />
    </Grid>
  </Grid>
);

const RootApp = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

ReactDOM.render(<RootApp />, document.getElementById('app'));
