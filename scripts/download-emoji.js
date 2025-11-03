const https = require('https');
const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve(__dirname, 'emoji-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/svg';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'images', 'emoji');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function sanitizeFilename(str) {
  return str.replace(/[\0\\]/g, '').trim();
}

function attemptsForCode(code) {
  const attempts = new Set([code]);
  if (code.includes('-fe0f')) {
    attempts.add(code.replace(/-fe0f/g, ''));
  }
  return Array.from(attempts);
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close(() => {
          fs.unlink(dest, () => reject(new Error(String(res.statusCode))));
        });
        res.resume();
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function ensureEmoji(entry) {
  const attempts = attemptsForCode(entry.code);
  const baseName = sanitizeFilename(`${entry.emoji} - ${entry.slug}`);
  const destPath = path.join(OUTPUT_DIR, `${baseName}.svg`);

  for (const code of attempts) {
    const url = `${BASE_URL}/${code}.svg`;
    try {
      await download(url, destPath);
      console.log(`Downloaded ${entry.emoji} (${entry.code}) -> ${path.basename(destPath)}`);
      return { destPath };
    } catch (err) {
      if (err.message === '404') {
        continue;
      }
      throw new Error(`Failed ${entry.emoji} (${code}): ${err.message}`);
    }
  }
  throw new Error(`No SVG found for ${entry.emoji} (${entry.code})`);
}

(async () => {
  let failed = false;
  for (const entry of manifest) {
    try {
      await ensureEmoji(entry);
    } catch (err) {
      console.error(err.message);
      failed = true;
    }
  }
  if (failed) process.exit(1);
})();
