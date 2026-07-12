const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// The durations array is currently: const durations = [8000, 10000, 15000];
const oldDurationsRegex = /const durations = \[8000, 10000, 15000\];/;
const newDurations = `const durations = [8000, 10000, 15000, 20000, 30000];`;

main = main.replace(oldDurationsRegex, newDurations);

fs.writeFileSync('src/main.tsx', main);
console.log("Added 20s and 30s lifespans to smoke rings");
