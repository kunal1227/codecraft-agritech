const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)" />
  <path d="M 256 390 C 256 220 120 180 120 110 C 220 110 256 220 256 390 Z" fill="#34d399" />
  <path d="M 256 390 C 256 220 392 160 392 90 C 270 90 256 220 256 390 Z" fill="#a7f3d0" />
  <circle cx="256" cy="410" r="28" fill="#fbbf24" />
</svg>`;

fs.writeFileSync(path.join(iconDir, 'icon.svg'), svg);

// 1x1 transparent/green pixel fallback for PNG requests
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
fs.writeFileSync(path.join(iconDir, 'icon-192.png'), Buffer.from(pngBase64, 'base64'));
fs.writeFileSync(path.join(iconDir, 'icon-512.png'), Buffer.from(pngBase64, 'base64'));

console.log('Icons written successfully to public/icons');
