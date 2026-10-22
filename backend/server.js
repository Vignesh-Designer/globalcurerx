const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Helper functions for JSON database
function readJson(filename, defaultValue) {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

function writeJson(filename, data) {
  const filePath = path.join(dataDir, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// Default Seed Data
const defaultCategories = [
  "Medicines",
  "Vitamins & Supplements",
  "Cosmetics & Personal Care",
  "Medical Equipment",
  "Surgical Products",
  "Medical Consumables",
  "Wellness Essentials",
  "Orthopedic Supports"
];

const defaultSettings = {
  storeName: "Global Cure RX Pharmacy LLC",
  phone: "+971 50 515 2391",
  whatsapp: "+971 50 515 2391",
  email: "Info@globalcurerx.com",
  address: "Global Healthcare Pharmacy LLC, Shop No: 02, Al Hudaiba, Dubai, UAE",
  poBox: "PO Box: 101892",
  currency: "AED",
  topAnnouncement: "Welcome to Global Healthcare",
  autoScrollInterval: 4000, // 4 seconds auto scroll for banners
  logoUrl: ""
};

const defaultBanners = [
  {
    id: "banner-1",
    title: "At Global Cure RX Pharmacy LLC",
    subtitle: "We believe access to quality healthcare products should be simple, reliable and convenient.",
    desktopImage: "/banners/banner1_desktop.png",
    mobileImage: "/banners/banner1_mobile.png",
    ctaText: "Shop Equipment",
    ctaLink: "#products",
    active: true,
    order: 1
  },
  {
    id: "banner-2",
    title: "Certified Medical Supplies & Equipment",
    subtitle: "Trusted by clinics, hospitals, and homes across UAE and worldwide.",
    desktopImage: "/banners/banner2_desktop.png",
    mobileImage: "/banners/banner2_mobile.png",
    ctaText: "Browse Supplies",
    ctaLink: "#products",
    active: true,
    order: 2
  },
  {
    id: "banner-3",
    title: "Fast Delivery & Instant WhatsApp Ordering",
    subtitle: "Order directly in seconds with our dedicated WhatsApp pharmacy helpline.",
    desktopImage: "/banners/banner3_desktop.png",
    mobileImage: "/banners/banner3_mobile.png",
    ctaText: "Order Now",
    ctaLink: "#products",
    active: true,
    order: 3
  }
];

const defaultProducts = [
  {
    id: "prod-1",
    title: "Celsius Meter",
    category: "Medical Equipment",
    offerPrice: 120,
    actualPrice: 160,
    badge: "OFF 45%",
    isSoldOut: false,
    stockQuantity: 25,
    image: "/products/celsius-meter.png",
    description: "Accurate clinical digital Celsius thermometer with protective storage case. Designed for oral, rectal, and axillary temperature readings in seconds."
  },
  {
    id: "prod-2",
    title: "Digital Thermometer",
    category: "Medical Equipment",
    offerPrice: 120,
    actualPrice: 150,
    badge: "SOLD OUT",
    isSoldOut: true,
    stockQuantity: 0,
    image: "/products/digital-thermometer.png",
    description: "Rapid reading electronic digital medical thermometer with LCD display and fever alarm indicator."
  },
  {
    id: "prod-3",
    title: "Lens Case Kit",
    category: "Cosmetics & Personal Care",
    offerPrice: 120,
    actualPrice: 170,
    badge: "OFF 54%",
    isSoldOut: false,
    stockQuantity: 40,
    image: "/products/lens-case.png",
    description: "Sterile dual-compartment contact lens storage case kit with leak-proof screw caps and hygienic application tools."
  },
  {
    id: "prod-4",
    title: "Ear Thermometer",
    category: "Medical Equipment",
    offerPrice: 120,
    actualPrice: 180,
    badge: "OFF 27%",
    isSoldOut: false,
    stockQuantity: 15,
    image: "/products/ear-thermometer.png",
    description: "Infrared tympanic ear thermometer featuring instant 1-second accurate readings, gentle probe tip, and memory recall."
  },
  {
    id: "prod-5",
    title: "Surgical Kit",
    category: "Surgical Products",
    offerPrice: 120,
    actualPrice: 200,
    badge: "OFF 39%",
    isSoldOut: false,
    stockQuantity: 18,
    image: "/products/surgical-kit.png",
    description: "Medical grade sterilized minor surgical kit including stainless steel instruments and sterile drape pack."
  },
  {
    id: "prod-6",
    title: "Stainless Scissors Blue",
    category: "Surgical Products",
    offerPrice: 120,
    actualPrice: 150,
    badge: "SOLD OUT",
    isSoldOut: true,
    stockQuantity: 0,
    image: "/products/scissors-blue.png",
    description: "Autoclavable stainless steel medical scissors with ergonomic blue coated handles for precision surgical cutting."
  },
  {
    id: "prod-7",
    title: "Stainless Kidney Tray",
    category: "Medical Equipment",
    offerPrice: 120,
    actualPrice: 165,
    badge: "OFF 45%",
    isSoldOut: false,
    stockQuantity: 30,
    image: "/products/kidney-tray.png",
    description: "Heavy-duty polished stainless steel emesis basin / kidney tray designed for medical procedures and surgical instruments."
  },
  {
    id: "prod-8",
    title: "Smart Mask",
    category: "Medical Consumables",
    offerPrice: 110,
    actualPrice: 150,
    badge: "OFF 35%",
    isSoldOut: false,
    stockQuantity: 120,
    image: "/products/smart-mask.png",
    description: "3-ply medical grade protective face masks with comfortable elastic earloops and high-efficiency bacterial filtration."
  },
  {
    id: "prod-9",
    title: "Sleeping Eye Mask",
    category: "Wellness Essentials",
    offerPrice: 120,
    actualPrice: 160,
    badge: "OFF 40%",
    isSoldOut: false,
    stockQuantity: 45,
    image: "/products/eye-mask.png",
    description: "Ultra-soft contoured blackout sleeping eye mask promoting restful sleep and recovery with breathable elastic strap."
  },
  {
    id: "prod-10",
    title: "Safety Goggles",
    category: "Medical Consumables",
    offerPrice: 120,
    actualPrice: 150,
    badge: "SOLD OUT",
    isSoldOut: true,
    stockQuantity: 0,
    image: "/products/safety-goggles.png",
    description: "Anti-fog protective laboratory and clinical safety eyewear shield with clear wide-view polycarbonate lenses."
  },
  {
    id: "prod-11",
    title: "Safe Disposable Gloves",
    category: "Medical Consumables",
    offerPrice: 120,
    actualPrice: 175,
    badge: "OFF 47%",
    isSoldOut: false,
    stockQuantity: 60,
    image: "/products/gloves.png",
    description: "Powder-free medical examination nitrile blue gloves offering superior puncture resistance, tactile sensitivity, and barrier protection."
  },
  {
    id: "prod-12",
    title: "Plaster Machine",
    category: "Medical Equipment",
    offerPrice: 110,
    actualPrice: 160,
    badge: "OFF 40%",
    isSoldOut: false,
    stockQuantity: 22,
    image: "/products/plaster-machine.png",
    description: "Medical surgical adhesive tape and plaster dispenser cutter machine for fast, sterile bandage application in clinics."
  },
  {
    id: "prod-13",
    title: "Alcohol Based Hand Sanitizer 500ml",
    category: "Medicines",
    offerPrice: 120,
    actualPrice: 150,
    badge: "OFF 20%",
    isSoldOut: false,
    stockQuantity: 80,
    image: "/products/sanitizer.png",
    description: "Hospital grade 75% isopropyl alcohol disinfectant sanitizer with moisturizers. Eliminates 99.99% of germs and pathogens without drying skin."
  },
  {
    id: "prod-14",
    title: "Multivitamin Active Defense 60s",
    category: "Vitamins & Supplements",
    offerPrice: 95,
    actualPrice: 130,
    badge: "OFF 27%",
    isSoldOut: false,
    stockQuantity: 50,
    image: "/products/vitamins.png",
    description: "Comprehensive daily multivitamin complex fortified with Vitamin C, Zinc, and Vitamin D3 to strengthen immune system function."
  }
];

const defaultBlogs = [
  {
    id: "blog-1",
    title: "The ENT specialist",
    date: "Jan 18",
    image: "/blog/ent-specialist.png",
    summary: "Essential diagnostic equipment every modern Ear, Nose, and Throat clinic needs for precision patient care.",
    content: "Modern ENT specialists rely on advanced illumination and endoscopy tools to diagnose complex conditions accurately. Global Cure RX supplies leading-edge diagnostic sets certified to international standards."
  },
  {
    id: "blog-2",
    title: "The blood sample",
    date: "Jan 18",
    image: "/blog/blood-sample.png",
    summary: "Best practices for sterile vacutainer tube handling, phlebotomy hygiene, and preventing sample contamination.",
    content: "Safe phlebotomy requires precision and adherence to strict sterile protocols. Our collection tubes and safety needles protect both the healthcare worker and patient integrity."
  },
  {
    id: "blog-3",
    title: "Stethoscope and notepad",
    date: "Jan 18",
    image: "/blog/stethoscope.png",
    summary: "Choosing the optimal acoustic stethoscope: high-frequency cardiac auscultation vs pediatric general practice.",
    content: "The iconic stethoscope remains the physician's first line of physical examination. Discover our range of acoustic and electronic amplification stethoscopes designed for crystal clear heart and lung sounds."
  }
];

// Initialize JSON data files if missing
readJson('settings.json', defaultSettings);
readJson('categories.json', defaultCategories);
readJson('banners.json', defaultBanners);
readJson('products.json', defaultProducts);
readJson('blogs.json', defaultBlogs);
readJson('orders.json', []);

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}_${basename}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, filename: req.file.filename });
});

// Multiple image upload endpoint (e.g. desktop + mobile banner)
app.post('/api/upload-banner-pair', upload.fields([
  { name: 'desktopImage', maxCount: 1 },
  { name: 'mobileImage', maxCount: 1 }
]), (req, res) => {
  const result = {};
  if (req.files && req.files.desktopImage && req.files.desktopImage[0]) {
    result.desktopImage = `/uploads/${req.files.desktopImage[0].filename}`;
  }
  if (req.files && req.files.mobileImage && req.files.mobileImage[0]) {
    result.mobileImage = `/uploads/${req.files.mobileImage[0].filename}`;
  }
  res.json(result);
});

// Settings API
app.get('/api/settings', (req, res) => {
  const settings = readJson('settings.json', defaultSettings);
  res.json(settings);
});

app.put('/api/settings', (req, res) => {
  const current = readJson('settings.json', defaultSettings);

  // Validate phone numbers: reject alphabetic characters
  if (req.body.phone !== undefined && /[a-zA-Z]/.test(req.body.phone)) {
    return res.status(400).json({ error: 'Phone number cannot contain alphabets. Only numbers and +, -, () are allowed.' });
  }
  if (req.body.whatsapp !== undefined && /[a-zA-Z]/.test(req.body.whatsapp)) {
    return res.status(400).json({ error: 'WhatsApp number cannot contain alphabets. Only numbers and +, -, () are allowed.' });
  }

  const updated = { ...current, ...req.body };
  writeJson('settings.json', updated);
  res.json({ message: 'Settings updated successfully', settings: updated });
});

// Categories API
app.get('/api/categories', (req, res) => {
  const categories = readJson('categories.json', defaultCategories);
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Valid category name is required' });
  }
  const categories = readJson('categories.json', defaultCategories);
  if (!categories.includes(name.trim())) {
    categories.push(name.trim());
    writeJson('categories.json', categories);
  }
  res.json(categories);
});

// Banners API
app.get('/api/banners', (req, res) => {
  const banners = readJson('banners.json', defaultBanners);
  res.json(banners);
});

app.post('/api/banners', (req, res) => {
  const banners = readJson('banners.json', defaultBanners);
  const newBanner = {
    id: `banner-${Date.now()}`,
    title: req.body.title || 'Special Promotion',
    subtitle: req.body.subtitle || '',
    desktopImage: req.body.desktopImage || '',
    mobileImage: req.body.mobileImage || req.body.desktopImage || '',
    ctaText: req.body.ctaText || 'Shop Now',
    ctaLink: req.body.ctaLink || '#products',
    active: req.body.active !== undefined ? req.body.active : true,
    order: banners.length + 1
  };
  banners.push(newBanner);
  writeJson('banners.json', banners);
  res.status(201).json(newBanner);
});

app.put('/api/banners/:id', (req, res) => {
  const banners = readJson('banners.json', defaultBanners);
  const index = banners.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Banner not found' });
  }
  banners[index] = { ...banners[index], ...req.body };
  writeJson('banners.json', banners);
  res.json(banners[index]);
});

app.delete('/api/banners/:id', (req, res) => {
  let banners = readJson('banners.json', defaultBanners);
  banners = banners.filter(b => b.id !== req.params.id);
  writeJson('banners.json', banners);
  res.json({ message: 'Banner deleted successfully' });
});

// Products API
app.get('/api/products', (req, res) => {
  let products = readJson('products.json', defaultProducts);
  const { category, search } = req.query;

  if (category && category !== 'All' && category !== 'All Categories') {
    products = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase().trim();
    products = products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }

  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const products = readJson('products.json', defaultProducts);
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const products = readJson('products.json', defaultProducts);
  const {
    title,
    category,
    offerPrice,
    actualPrice,
    badge,
    isSoldOut,
    stockQuantity,
    image,
    description
  } = req.body;

  if (!title || offerPrice === undefined) {
    return res.status(400).json({ error: 'Title and offerPrice are required' });
  }

  // Set badge only if admin set a value or product is sold out
  let calculatedBadge = isSoldOut ? 'SOLD OUT' : (badge ? badge.trim() : '');

  const newProduct = {
    id: `prod-${Date.now()}`,
    title: title.trim(),
    category: category || 'Medical Equipment',
    offerPrice: Number(offerPrice) || 0,
    actualPrice: Number(actualPrice) || Number(offerPrice) || 0,
    badge: calculatedBadge,
    isSoldOut: Boolean(isSoldOut),
    stockQuantity: Number(stockQuantity) || (isSoldOut ? 0 : 50),
    image: image || '/placeholder-product.png',
    description: description || ''
  };

  products.unshift(newProduct);
  writeJson('products.json', products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const products = readJson('products.json', defaultProducts);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  let updated = { ...products[index], ...req.body };
  if (req.body.offerPrice !== undefined) updated.offerPrice = Number(req.body.offerPrice);
  if (req.body.actualPrice !== undefined) updated.actualPrice = Number(req.body.actualPrice);
  if (req.body.stockQuantity !== undefined) updated.stockQuantity = Number(req.body.stockQuantity);
  if (req.body.isSoldOut !== undefined) updated.isSoldOut = Boolean(req.body.isSoldOut);
  if (req.body.badge !== undefined) {
    updated.badge = req.body.badge ? req.body.badge.trim() : '';
  }

  // If sold out is set to true, reflect in badge; if un-marked, restore custom badge or empty
  if (updated.isSoldOut) {
    updated.badge = 'SOLD OUT';
  } else if (updated.badge === 'SOLD OUT') {
    updated.badge = (req.body.badge !== undefined && req.body.badge) ? req.body.badge.trim() : '';
  }

  products[index] = updated;
  writeJson('products.json', products);
  res.json(updated);
});

app.delete('/api/products/:id', (req, res) => {
  let products = readJson('products.json', defaultProducts);
  products = products.filter(p => p.id !== req.params.id);
  writeJson('products.json', products);
  res.json({ message: 'Product deleted successfully' });
});

// Blogs API
app.get('/api/blogs', (req, res) => {
  const blogs = readJson('blogs.json', defaultBlogs);
  res.json(blogs);
});

app.post('/api/blogs', (req, res) => {
  const blogs = readJson('blogs.json', defaultBlogs);
  const { title, date, image, summary, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Blog title is required' });
  }

  const newBlog = {
    id: `blog-${Date.now()}`,
    title: title.trim(),
    date: date ? date.trim() : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    image: image || '/blog/ent-specialist.png',
    summary: summary ? summary.trim() : '',
    content: content ? content.trim() : (summary ? summary.trim() : '')
  };

  blogs.unshift(newBlog);
  writeJson('blogs.json', blogs);
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
  const blogs = readJson('blogs.json', defaultBlogs);
  const index = blogs.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  blogs[index] = { ...blogs[index], ...req.body };
  writeJson('blogs.json', blogs);
  res.json(blogs[index]);
});

app.delete('/api/blogs/:id', (req, res) => {
  let blogs = readJson('blogs.json', defaultBlogs);
  const initialLen = blogs.length;
  blogs = blogs.filter(b => b.id !== req.params.id);
  if (blogs.length === initialLen) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  writeJson('blogs.json', blogs);
  res.json({ message: 'Blog deleted successfully' });
});

// Orders / WhatsApp Log API
app.get('/api/orders', (req, res) => {
  const orders = readJson('orders.json', []);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const orders = readJson('orders.json', []);
  const newOrder = {
    id: `ord-${Date.now()}`,
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    totalItems: req.body.totalItems || 0,
    whatsappUrl: req.body.whatsappUrl || '',
    phone: req.body.phone || '',
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder);
  writeJson('orders.json', orders);
  res.status(201).json(newOrder);
});

// Delete single order log permanently
app.delete('/api/orders/:id', (req, res) => {
  let orders = readJson('orders.json', []);
  const initialLength = orders.length;
  orders = orders.filter(o => o.id !== req.params.id);
  if (orders.length === initialLength) {
    return res.status(404).json({ error: 'Order log not found' });
  }
  writeJson('orders.json', orders);
  res.json({ message: 'Order log deleted permanently' });
});

// Bulk delete selected or all order logs permanently
app.post('/api/orders/bulk-delete', (req, res) => {
  const { ids, all } = req.body;
  let orders = readJson('orders.json', []);
  if (all) {
    orders = [];
  } else if (Array.isArray(ids)) {
    const idSet = new Set(ids);
    orders = orders.filter(o => !idSet.has(o.id));
  }
  writeJson('orders.json', orders);
  res.json({ message: 'Order logs deleted permanently', remaining: orders.length });
});

// Reset demo data API (handy for admin reset)
app.post('/api/reset-data', (req, res) => {
  writeJson('settings.json', defaultSettings);
  writeJson('categories.json', defaultCategories);
  writeJson('banners.json', defaultBanners);
  writeJson('products.json', defaultProducts);
  writeJson('blogs.json', defaultBlogs);
  res.json({ message: 'Database reset to default store data' });
});

app.listen(PORT, () => {
  console.log(`Global Cure RX Pharmacy Backend API running on http://localhost:${PORT}`);
});
