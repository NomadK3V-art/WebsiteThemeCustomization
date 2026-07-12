const fs = require('fs');

async function go() {
  const res = await fetch('https://svelterx.com');
  const text = await res.text();
  fs.writeFileSync('svelterx.html', text);
  console.log("Saved svelterx.html");
}
go();
