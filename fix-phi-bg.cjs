const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Add a specific class to the Private Health Insurance box
code = code.replace(/<div className="svc">(\s*<div className="ico">🛡️<\/div>\s*<h3>Private Health Insurance<\/h3>)/, '<div className="svc svc-phi">$1');

fs.writeFileSync('src/pages/Home.tsx', code);

let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Private Health Insurance specific background using Lettering-1.jpg */
.svc.svc-phi {
  background: linear-gradient(rgba(13, 0, 37, 0.7), rgba(13, 0, 37, 0.7)), url('./imports/Lettering-1.jpg') center/cover no-repeat !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated Private Health Insurance background");
