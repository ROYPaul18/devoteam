const fs = require('fs');
const path = require('path');

function getUniqueEntryAges() {
  const filePath = path.join(__dirname, '../data/data_v4.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(rawData);

  const entryAges = new Set();

  for (const key in data) {
    let entryAge = data[key].entry_age;
    if (entryAge) {
      entryAge = entryAge.replace('Age', '');
      entryAges.add(entryAge);
    }
  }

  const uniqueEntryAges = Array.from(entryAges);
  uniqueEntryAges.sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;

    const aNum = parseInt(a.split('-')[0], 10);
    const bNum = parseInt(b.split('-')[0], 10);

    return aNum - bNum;
  });
  return uniqueEntryAges;
}

module.exports = {
  getUniqueEntryAges,
};
