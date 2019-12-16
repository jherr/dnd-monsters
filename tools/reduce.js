const fs = require('fs');
const { parse } = require('roll-parser');

const out = [];
JSON.parse(fs.readFileSync('./data/5e-SRD-Monsters.json').toString()).forEach(({
  name,
  hit_points,
  hit_dice,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  challenge_rating,
}) => {
  const roll = parse(hit_dice);
  out.push({
    name,
    hit_points,
    max_damage: (roll.dice * roll.count) + roll.modifier,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    challenge_rating,
  });
});

console.log(`${out.length} monsters`);
console.log(`${Object.keys(out[0]).length - 1} dimensions`);

fs.writeFileSync('./data/monsters.json', JSON.stringify(out, null, 2));
