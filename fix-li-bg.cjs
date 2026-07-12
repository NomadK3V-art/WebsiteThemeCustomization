const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Add a specific class to the Life Insurance box
code = code.replace(/<div className="svc">(\s*<div className="ico">❤️<\/div>\s*<h3>Life Insurance<\/h3>)/, '<div className="svc svc-li">$1');

fs.writeFileSync('src/pages/Home.tsx', code);

let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Life Insurance specific background using LI_pic.jpg */
.svc.svc-li {
  background: linear-gradient(rgba(13, 0, 37, 0.7), rgba(13, 0, 37, 0.7)), url('./imports/LI_pic.jpg') center/cover no-repeat !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated Life Insurance background");
