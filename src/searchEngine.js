import createKDTree from 'static-kdtree';

import itemList from '../data/pokemon/items.json';
import labelData from '../data/pokemon/labels.json';
import startingItemName from '../data/pokemon/start-item.json';

export const labels = { ...labelData };
export const items = [ ...itemList ];

export const fields = Object.keys(items[0])
  .filter(k => k !== 'name');

export const findRanges = (selection) => {
  const out = {};
  fields.forEach(k => { out[k] = { min: 10000, max: 0 }; });
  selection.forEach(item => {
    fields.forEach(k => {
      out[k].min = Math.min(item[k], out[k].min);
      out[k].max = Math.max(item[k], out[k].max);
    });
  });
  return out;
}

export const ranges = findRanges(itemList);

export const startItem = 
  (itemList.filter(({ name }) => name === startingItemName) || itemList)[0];

const tree = createKDTree(
  itemList.map(item => fields.map(f => item[f]))
);

export const search = (params) => tree.knn(params, 20).map(i => items[i]);
