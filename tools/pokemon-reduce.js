const fs = require('fs');

const out = [];
JSON.parse(fs.readFileSync('./data/pokemon/original.json').toString()).forEach(({
  name: { english },
  base,
}) => {
  out.push({
    name: english,
    ...base,
  });
});

console.log(`${out.length} pokemon`);
console.log(`${Object.keys(out[0]).length - 1} dimensions`);

fs.writeFileSync('./data/pokemon/items.json', JSON.stringify(out, null, 2));
