const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The Concierge Medicine box already had an old class on it "svc-purple" from the template. Let's swap it out to our custom one.
code = code.replace(/<div className="svc svc-purple">(\s*<div className="ico">🩺<\/div>\s*<h3>Concierge Medicine<\/h3>)/, '<div className="svc svc-con">$1');
// Just in case it was a plain .svc
code = code.replace(/<div className="svc">(\s*<div className="ico">🩺<\/div>\s*<h3>Concierge Medicine<\/h3>)/, '<div className="svc svc-con">$1');

fs.writeFileSync('src/pages/Home.tsx', code);

let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Concierge Medicine specific background using Con.jpg */
.svc.svc-con {
  background: linear-gradient(rgba(13, 0, 37, 0.7), rgba(13, 0, 37, 0.7)), url('./imports/Con.jpg') center/cover no-repeat !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log("Updated Concierge Medicine background");
