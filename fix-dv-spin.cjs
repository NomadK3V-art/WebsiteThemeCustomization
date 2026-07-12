const fs = require('fs');

let main = fs.readFileSync('src/main.tsx', 'utf8');

// The current spin logic only targets `.svc` and `.svc-featured`. The Dental & Vision section is a `.dv-bar`.
// Let's add `.dv-bar` to the target list, and include its `.dv-btn` in the trigger list.

main = main.replace(
  /const box = link\.closest\('\.svc, \.svc-featured'\);/g, 
  "const box = link.closest('.svc, .svc-featured, .dv-bar');"
);

main = main.replace(
  /link\.classList\.contains\('svc-resource'\) \|\| link\.classList\.contains\('more'\) \|\| link\.classList\.contains\('qualify-btn'\)/g, 
  "link.classList.contains('svc-resource') || link.classList.contains('more') || link.classList.contains('qualify-btn') || link.classList.contains('dv-btn')"
);

fs.writeFileSync('src/main.tsx', main);

// Ensure .dv-bar has a solid background during spin so it doesn't look weird when rotating in 3D
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('transform-style: preserve-3d')) {
  // Adding some 3D perspective to the container of the boxes makes the spin look even more grounded
  css = css.replace(/\.svc, \.formcard, \.why-item, \.step, \.oe-card, \.news-card, \.dv-bar \{/g, `.svc, .formcard, .why-item, .step, .oe-card, .news-card, .dv-bar {\n  transform-style: preserve-3d;`);
  css = css.replace(/\.svc-featured \{/g, `.svc-featured {\n  transform-style: preserve-3d;`);
  fs.writeFileSync('src/index.css', css);
}

console.log("Added 3D spin physics to the Dental and Vision bar");
