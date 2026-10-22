const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const frontendPublic = path.join(rootDir, 'frontend', 'public');
const backendUploads = path.join(__dirname, 'uploads');
const brainDir = 'C:/Users/rvvgn/.gemini/antigravity/brain/e57ced25-3ec0-4756-ac14-5ed7aadcd3a3';

const sourceImg1 = path.join(brainDir, '.user_uploaded', 'media_1791295101858.png');
const sourceImgModal = path.join(brainDir, '.user_uploaded', 'media_1791295101866.png');
const sourceImgCart = path.join(brainDir, '.user_uploaded', 'media_1791295101870.png');

// Ensure destination directories exist
[
  path.join(frontendPublic, 'products'),
  path.join(frontendPublic, 'banners'),
  path.join(frontendPublic, 'blog'),
  backendUploads
].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function run() {
  console.log('Processing assets...');

  // 1. Copy generated high-res AI banners
  const genDesktopBanner = path.join(brainDir, 'hero_banner_medical_1791295934311.jpg');
  const genMobileBanner = path.join(brainDir, 'hero_banner_mobile_1791296041975.jpg');

  if (fs.existsSync(genDesktopBanner)) {
    fs.copyFileSync(genDesktopBanner, path.join(frontendPublic, 'banners', 'banner1_desktop.png'));
    fs.copyFileSync(genDesktopBanner, path.join(backendUploads, 'banner1_desktop.png'));
    fs.copyFileSync(genDesktopBanner, path.join(frontendPublic, 'banners', 'banner2_desktop.png'));
    fs.copyFileSync(genDesktopBanner, path.join(frontendPublic, 'banners', 'banner3_desktop.png'));
  }

  if (fs.existsSync(genMobileBanner)) {
    fs.copyFileSync(genMobileBanner, path.join(frontendPublic, 'banners', 'banner1_mobile.png'));
    fs.copyFileSync(genMobileBanner, path.join(backendUploads, 'banner1_mobile.png'));
    fs.copyFileSync(genMobileBanner, path.join(frontendPublic, 'banners', 'banner2_mobile.png'));
    fs.copyFileSync(genMobileBanner, path.join(frontendPublic, 'banners', 'banner3_mobile.png'));
  }

  // 2. Extract original hero banner from media_1791295101858.png
  try {
    await sharp(sourceImg1)
      .extract({ left: 45, top: 43, width: 325, height: 125 })
      .toFile(path.join(frontendPublic, 'banners', 'banner_original.png'));
    fs.copyFileSync(
      path.join(frontendPublic, 'banners', 'banner_original.png'),
      path.join(backendUploads, 'banner_original.png')
    );
  } catch (err) {
    console.error('Error cropping banner:', err);
  }

  // 3. Extract items from product grid
  // Grid layout in media_1791295101858.png:
  // Cols: x = ~53, ~133, ~213, ~294; width ~ 72
  // Row 1: y = 230, height = 55
  // Row 2: y = 345, height = 55
  // Row 3: y = 465, height = 55
  // Row 4: y = 582, height = 55
  // Row 5: y = 705, height = 55
  const crops = [
    { name: 'celsius-meter.png', left: 52, top: 228, width: 73, height: 58 },
    { name: 'digital-thermometer.png', left: 133, top: 228, width: 73, height: 58 },
    { name: 'lens-case.png', left: 213, top: 228, width: 73, height: 58 },
    { name: 'ear-thermometer.png', left: 294, top: 228, width: 73, height: 58 },

    { name: 'surgical-kit.png', left: 52, top: 345, width: 73, height: 58 },
    { name: 'scissors-blue.png', left: 133, top: 345, width: 73, height: 58 },
    { name: 'kidney-tray.png', left: 213, top: 345, width: 73, height: 58 },
    { name: 'smart-mask.png', left: 294, top: 345, width: 73, height: 58 },

    { name: 'eye-mask.png', left: 52, top: 465, width: 73, height: 58 },
    { name: 'safety-goggles.png', left: 133, top: 465, width: 73, height: 58 },
    { name: 'gloves.png', left: 213, top: 465, width: 73, height: 58 },
    { name: 'plaster-machine.png', left: 294, top: 465, width: 73, height: 58 },

    // Blog images
    { name: '../blog/ent-specialist.png', left: 52, top: 875, width: 100, height: 65 },
    { name: '../blog/blood-sample.png', left: 158, top: 875, width: 100, height: 65 },
    { name: '../blog/stethoscope.png', left: 265, top: 875, width: 100, height: 65 }
  ];

  for (const item of crops) {
    try {
      const outPath = path.join(frontendPublic, 'products', item.name);
      await sharp(sourceImg1)
        .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
        .resize(300, 240, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toFile(outPath);
      // also copy to backend uploads
      const fileName = path.basename(item.name);
      fs.copyFileSync(outPath, path.join(backendUploads, fileName));
    } catch (e) {
      console.error('Crop error for', item.name, e.message);
    }
  }

  // Also crop high-res gloves from cart reference if available
  try {
    // In media_1791295101870.png, gloves are around top right box
    await sharp(sourceImgCart)
      .extract({ left: 590, top: 128, width: 100, height: 110 })
      .resize(300, 300, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toFile(path.join(frontendPublic, 'products', 'gloves-large.png'));
  } catch (e) {
    console.error('Gloves large crop error:', e.message);
  }

  // Also crop high-res thermometer from modal reference
  try {
    await sharp(sourceImgModal)
      .extract({ left: 50, top: 320, width: 190, height: 190 })
      .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toFile(path.join(frontendPublic, 'products', 'thermometer-large.png'));
  } catch (e) {
    console.error('Thermometer large crop error:', e.message);
  }

  console.log('All image assets extracted successfully!');
}

run();
