const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Fix JSX property casing
code = code.replace(/onclick=/gi, 'onClick=');
code = code.replace(/autocomplete=/gi, 'autoComplete=');

// Just in case, let's also fix tabindex if it exists, since it's another common one
code = code.replace(/tabindex=/gi, 'tabIndex=');
code = code.replace(/readonly=/gi, 'readOnly=');
code = code.replace(/maxlength=/gi, 'maxLength=');

fs.writeFileSync('src/pages/Home.tsx', code);
console.log("Fixed JSX properties");
