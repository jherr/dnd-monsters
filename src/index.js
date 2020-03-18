import React, { useState, useEffect, useDeferredValue } from 'react';
import ReactDOM from 'react-dom';
import {
  Grid,
} from '@material-ui/core';

import {
  labels,
  ranges,
  startItem,
  search,
  items,
  fields,
  findRanges,
} from './searchEngine';

import FieldSlider from './components/FieldSlider';
import ResultTable from './components/ResultTable';
import SearchBox from './components/SearchBox';

const App = () => {
  const [state, setState] = useState({
    currentItem: startItem,
    values: { ...startItem },
  });
  const [activeRanges, setActiveRanges] = useState({ ...ranges });
  const [found, setFound] = useState([]);
  const deferredState = useDeferredValue(state);

  const change = (evt, currentItem) => {
    setState({
      ...state,
      currentItem,
      values: {
        ...currentItem,
      }
    });
  }

  const setValue = (field, value) => {
    setState({
      ...state,
      values: {
        ...state.values,
        [field]: value,
      },
    });
  }

  useEffect(() => {
    const res = search(fields.map(f => deferredState.values[f]), 20);
    setActiveRanges(findRanges(res));
    setFound(res);
  }, [deferredState]);

  return (
    <Grid container spacing={3}>
      <Grid item md={3} xs={12}>
        <SearchBox
          value={state.currentItem}
          options={items}
          onChange={change}
        />
        {fields.map(f => (
          <FieldSlider
            field={f}
            label={labels[f]}
            value={state.values[f]}
            onChange={setValue}
            min={ranges[f].min}
            max={ranges[f].max}
            activeMin={activeRanges[f].min}
            activeMax={activeRanges[f].max}
            key={f}
          />
        ))}
      </Grid>
      <Grid item md={9} xs={12}>
        <ResultTable
          fields={fields}
          results={found}
          labels={labels}
        />
      </Grid>
    </Grid>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)