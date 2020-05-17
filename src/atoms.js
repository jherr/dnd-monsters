import { atom, selector } from 'recoil';
import { search, ranges, fields, startItem, findRanges } from './searchEngine';

export const currentItemAtom = atom({
  key: 'currentItem',
  default: startItem,
});

export const fieldValuesAtom = atom({
  key: 'fieldValues',
  default: { ...startItem },
});

export const foundAtom = selector({
  key: 'found',
  get: ({ get }) => {
    const values = get(fieldValuesAtom);
    return search(
      fields.map((f) => values[f]),
      20
    );
  },
});

export const rangesAtom = selector({
  key: 'ranges',
  get: ({ get }) => {
    return findRanges(get(foundAtom));
  },
});
