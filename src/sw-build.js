const workboxBuild = require('workbox-build');

/* eslint-disable */
function formatBytes(a, b) {
  if (0 === a) return '0 Bytes';
  var c = 1024,
    d = b || 2,
    e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}
/* eslint-enable */

const buildSW = () =>
  workboxBuild
    .injectManifest({
      swSrc: 'src/sw.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globIgnores: ['node_modules/**/*', '**/*.{js,css,html,json,config}'],
      globPatterns: ['*']
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.log(
        `${count} files will be precached, totaling ${formatBytes(size)} bytes.`
      );
    });

buildSW();
