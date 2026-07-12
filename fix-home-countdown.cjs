const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Add import
if (!home.includes("import Countdown from '../components/Countdown'")) {
  home = home.replace("import React from 'react';", "import React from 'react';\nimport Countdown from '../components/Countdown';");
}

// Replace oe-clock empty div with the new component
home = home.replace(/<div className="oe-label" id="oeLabel">[^<]*<\/div>[\s\n]*<div className="oe-clock" id="oeClock"><\/div>/, '<Countdown />');

fs.writeFileSync('src/pages/Home.tsx', home);
console.log("Updated Home.tsx to include the Countdown component");
