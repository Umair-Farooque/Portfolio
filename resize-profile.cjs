const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('public/profile.jpg').then(img => {
  console.log('Original:', img.width, 'x', img.height);
  const canvas = createCanvas(112, 112);
  const ctx = canvas.getContext('2d');
  const scale = 112 / Math.min(img.width, img.height);
  const sw = 112 / scale;
  const sh = 112 / scale;
  const sx = (img.width - sw) / 2;
  const sy = 0;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 112, 112);
  const buf = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync('public/profile.jpg', buf);
  console.log('Resized to 112x112');
}).catch(console.error);