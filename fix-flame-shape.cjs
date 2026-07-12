const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The current flame has border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
// To make it more pointy at the top and less round, we stretch the vertical radii at the top (e.g. 85%) 
// and narrow the horizontal spread at the top if possible, but adjusting the vertical to 85% and bottom to 15% 
// makes a much sharper teardrop shape.
css = css.replace(
  /border-radius: 50% 50% 50% 50% \/ 60% 60% 40% 40%;/g, 
  'border-radius: 50% 50% 50% 50% / 85% 85% 25% 25%;'
);

fs.writeFileSync('src/index.css', css);
console.log("Updated flame shape to be pointier at the top");
