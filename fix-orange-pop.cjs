const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The current variables are:
// --body: #FF5E00; (Deep vibrant orange)
// --muted: #E64A19; (Slightly darker burnt orange)

// Let's bump them up to a brighter, punchier orange that still feels like fire but isn't quite as dark/burnt
css = css.replace(/--body: #FF5E00;/g, '--body: #FF8833;'); // Brighter, softer melon/flame orange
css = css.replace(/--muted: #E64A19;/g, '--muted: #FF6600;'); // Punchier, true bright orange

// Update the shadow on the main body text so the core of the glow is a bit brighter yellow
css = css.replace(/text-shadow: 0 0 4px rgba\(255, 180, 0, 0\.8\), 0 0 10px rgba\(255, 69, 0, 0\.6\), 0 0 20px rgba\(255, 0, 0, 0\.4\) !important;/g, 
  'text-shadow: 0 0 3px rgba(255, 200, 50, 0.9), 0 0 8px rgba(255, 100, 0, 0.7), 0 0 16px rgba(255, 50, 0, 0.5) !important;');

// Update the shadow on the muted text to match the new brightness
css = css.replace(/text-shadow: 0 0 3px rgba\(255, 140, 0, 0\.6\), 0 0 8px rgba\(255, 69, 0, 0\.5\) !important;/g, 
  'text-shadow: 0 0 3px rgba(255, 160, 0, 0.7), 0 0 8px rgba(255, 80, 0, 0.6) !important;');

fs.writeFileSync('src/index.css', css);
console.log("Brightened the orange body text");
