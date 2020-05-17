import { atom, selector } from 'recoil';
import { search, fields, startItem, findRanges } from './searchEngine';

export const currentItemAtom = atom({
  key: 'currentItem',
  default: startItem,
});

const fieldValues = {};

export const fieldValuesAtom = (key) => {
  if (fieldValues[key] === undefined) {
    fieldValues[key] = atom({
      key: `value:${key}`,
      default: startItem[key],
    });
  }
  return fieldValues[key];
};

export const allFields = selector({
  set: ({ set }, value) => {
    Object.keys(value).forEach((key) => {
      set(fieldValuesAtom(key), value[key]);
    });
  },
});

export const foundAtom = selector({
  key: 'found',
  get: ({ get }) => {
    return search(
      fields.map((f) => get(fieldValuesAtom(f))),
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
