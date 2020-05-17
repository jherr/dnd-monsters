/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { items, fields } from '../searchEngine';
import { currentItemAtom, allFields } from '../atoms';

const SearchBox = () => {
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const setAllFields = useSetRecoilState(allFields);

  return (
    <Autocomplete
      value={currentItem}
      options={items}
      getOptionLabel={(option) => option.name}
      onChange={(_, cur) => {
        setCurrentItem(cur);
        setAllFields(cur);
      }}
      renderInput={(params) => <TextField {...params} label="Item" fullWidth />}
    />
  );
};

export default SearchBox;
