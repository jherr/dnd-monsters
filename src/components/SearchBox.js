/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropType from 'prop-types';

const SearchBox = ({ value, options, onChange }) => (
  <Autocomplete
    value={value}
    options={options}
    getOptionLabel={(option) => option.name}
    onChange={onChange}
    renderInput={(params) => <TextField {...params} label="Item" fullWidth />}
  />
);

SearchBox.propTypes = {
  value: PropType.string.isRequired,
  options: PropType.arrayOf(PropType.any).isRequired,
  onChange: PropType.func.isRequired,
};

export default SearchBox;
