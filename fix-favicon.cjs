const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (!html.includes('link rel="icon"')) {
  html = html.replace('</title>', '</title>\n    <link rel="icon" type="image/png" href="/favicon.png" />');
  fs.writeFileSync('index.html', html);
  console.log('Favicon added to index.html');
}
