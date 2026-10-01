// Rend index.html 100% autonome : police Great Vibes (latin) embarquée en base64,
// polices externes remplacées par des fallbacks système. Sortie = mariage-falencie-martin.html
const fs = require('fs');
const b64 = fs.readFileSync('gv_5.woff2').toString('base64'); // latin (couvre é â ï œ…)
const range = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const face = `@font-face{font-family:'Great Vibes';font-style:normal;font-weight:400;font-display:swap;` +
  `src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${range}}`;

let html = fs.readFileSync('index.html', 'utf8');

// 1) retirer les liens Google Fonts (preconnect + css2)
html = html.replace(/\s*<link rel="preconnect"[^>]*>/g, '');
html = html.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, '');

// 2) injecter le @font-face en tête de <style>
html = html.replace('<style>', '<style>\n  ' + face + '\n');

// 3) remplacer les polices externes par des fallbacks système (Great Vibes reste embarqué)
html = html.replace(/'Cormorant Garamond',serif/g, "Georgia,'Times New Roman',serif");
html = html.replace(/'Montserrat',sans-serif/g, "-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif");

fs.writeFileSync('mariage-falencie-martin.html', html);
console.log('OK → mariage-falencie-martin.html (' + Math.round(html.length/1024) + ' Ko), police embarquée ' + Math.round(b64.length/1024) + ' Ko base64');
