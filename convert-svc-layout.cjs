const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The user might mean the full horizontal layout. Let's make all .svc boxes full width like GLP-1.
// Let's change the class of all the regular services to match the GLP-1 structure exactly.
code = code.replace(/<div className="services">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/, (match, inner) => {
  // Convert each .svc into a .svc-featured style layout
  let newInner = inner.replace(/<div className="svc">([\s\S]*?)<\/div>\s*(?=<div className="svc">|$)/g, (match2, svcInner) => {
    // Extract pieces
    const iconMatch = svcInner.match(/<div className="ico">(.*?)<\/div>/);
    const titleMatch = svcInner.match(/<h3>(.*?)<\/h3>/);
    const descMatch = svcInner.match(/<p>(.*?)<\/p>/);
    const ptsMatch = svcInner.match(/<ul className="pts">([\s\S]*?)<\/ul>/);
    const moreMatch = svcInner.match(/<a className="more" href="[^"]+">.*?<\/a>/);
    
    // Extract resources
    let resourcesHtml = '';
    const resRegex = /<a className="svc-resource" href="([^"]+)">(.*?)<\/a>/g;
    let rMatch;
    while ((rMatch = resRegex.exec(svcInner)) !== null) {
      resourcesHtml += `\n        <a className="svc-resource" href="${rMatch[1]}">${rMatch[2]}</a>`;
    }

    if (!iconMatch || !titleMatch || !descMatch) return match2;

    return `
    <div className="svc-featured" style={{ marginTop: '22px' }}>
      <div className="fl">
        <div className="fhead"><span className="fico">${iconMatch[1]}</span><h3>${titleMatch[1]}</h3></div>
        <p>${descMatch[1]}</p>
        <ul className="pts">${ptsMatch ? ptsMatch[1] : ''}</ul>
      </div>
      <div className="fr">
${resourcesHtml}
        ${moreMatch ? moreMatch[0] : ''}
      </div>
    </div>`;
  });

  return `${newInner}\n  </div>\n</section>`;
});

fs.writeFileSync('src/pages/Home.tsx', code);
console.log("Converted all services to wide layout");
