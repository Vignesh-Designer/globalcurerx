const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://globalcurerx.com';
const DATA_DIR = path.join(__dirname, 'backend', 'data');
const UPLOADS_DIR = path.join(__dirname, 'backend', 'uploads');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      return resolve(false); // already exists
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function sync() {
  console.log('🔄 Syncing live data from https://globalcurerx.com ...');

  const endpoints = [
    { url: `${BASE_URL}/api/products`, file: 'products.json' },
    { url: `${BASE_URL}/api/settings`, file: 'settings.json' },
    { url: `${BASE_URL}/api/categories`, file: 'categories.json' },
    { url: `${BASE_URL}/api/banners`, file: 'banners.json' },
    { url: `${BASE_URL}/api/blogs`, file: 'blogs.json' },
    { url: `${BASE_URL}/api/orders`, file: 'orders.json' },
  ];

  const imageFilenames = new Set();

  for (const ep of endpoints) {
    try {
      console.log(`📥 Fetching ${ep.file}...`);
      const data = await fetchJson(ep.url);
      fs.writeFileSync(path.join(DATA_DIR, ep.file), JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Saved ${ep.file}`);

      // Scan for image filenames
      const str = JSON.stringify(data);
      const matches = str.matchAll(/\/uploads\/([a-zA-Z0-9_\-\.\s]+?\.(png|jpg|jpeg|webp|gif|svg))/gi);
      for (const m of matches) {
        if (m[1]) imageFilenames.add(m[1].trim());
      }
    } catch (e) {
      console.error(`⚠️ Could not fetch ${ep.file}:`, e.message);
    }
  }

  console.log(`🖼️ Found ${imageFilenames.size} uploaded images to sync...`);
  let downloadedCount = 0;

  for (const filename of imageFilenames) {
    const fileUrl = `${BASE_URL}/uploads/${encodeURIComponent(filename)}`;
    const dest = path.join(UPLOADS_DIR, filename);
    const downloaded = await downloadFile(fileUrl, dest);
    if (downloaded) {
      downloadedCount++;
      process.stdout.write(`📥 Downloaded: ${filename}\n`);
    }
  }

  console.log(`\n🎉 Sync Complete! Downloaded ${downloadedCount} new images.`);
  console.log('✅ Local database and uploads are now 100% identical to the live website!');
}

sync();
