import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';
import { RecoilRoot } from 'recoil';

import { fields } from './searchEngine';

import FieldSlider from './components/FieldSlider';
import ResultTable from './components/ResultTable';
import SearchBox from './components/SearchBox';

const App = () => (
  <Grid container spacing={3}>
    <Grid item md={3} xs={12}>
      <SearchBox />
      {fields.map((f) => (
        <FieldSlider field={f} />
      ))}
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
