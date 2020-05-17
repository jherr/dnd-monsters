/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRecoilState } from 'recoil';

import { items } from '../searchEngine';
import { currentItemAtom, fieldValuesAtom } from '../atoms';

const SearchBox = () => {
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  // const [_, setValues] = useRecoilState(fieldValuesAtom);
  return (
    <Autocomplete
      value={currentItem}
      options={items}
      getOptionLabel={(option) => option.name}
      onChange={(_, cur) => {
        setCurrentItem(cur);
        // setValues({ ...cur });
      }}
      renderInput={(params) => <TextField {...params} label="Item" fullWidth />}
    />
  );
};

export default SearchBox;
