const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Increase the sizes of the h3 elements (which are the neon blue headings for cards/sections)
css = css.replace(/\.news-head h3\{font-size:18px;/g, '.news-head h3{font-size:24px;');
css = css.replace(/\.why-item h3\{font-size:18px;/g, '.why-item h3{font-size:24px;');
css = css.replace(/\.step h3\{font-size:19px;/g, '.step h3{font-size:25px;');
css = css.replace(/\.dv-bar h3\{font-size:19px;/g, '.dv-bar h3{font-size:25px;');
css = css.replace(/\.svc h3\{font-size:21px;/g, '.svc h3{font-size:27px;');
css = css.replace(/\.formcard h3\{font-size:22px;/g, '.formcard h3{font-size:28px;');

fs.writeFileSync('src/index.css', css);
console.log("Increased h3 font sizes");
