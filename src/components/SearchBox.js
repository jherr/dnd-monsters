import React from 'react';
import {
  TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default ({ value, options, onChange }) => (
  <Autocomplete
    value={value}
    options={options}
    getOptionLabel={option => option.name}
    onChange={onChange}
    renderInput={params => (
      <TextField {...params} label="Item" fullWidth />
    )}
  />
);
