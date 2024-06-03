const fs = require('fs');

function getUniqueOsPartners(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    const uniquePartners = new Set();

    for (const key in data) {
        if (data[key]['os_partner'] !== null) {
            uniquePartners.add(data[key]['os_partner']);
        }
    }

    return [Array.from(uniquePartners), uniquePartners.size];
}

const filePath = 'server/data/data_v4.json';
const [uniquePartners, totalUniqueCount] = getUniqueOsPartners(filePath);
console.log(uniquePartners);
console.log(totalUniqueCount);