# 🏥 Global Cure RX Pharmacy LLC — Online Store & Admin Panel

A full-stack, production-ready online medicine and medical equipment store designed specifically for **Global Cure RX Pharmacy LLC**. Built with **Next.js (React & Tailwind CSS)** on the frontend and **Node.js (Express)** on the backend.

---

## 🌟 Key Features & Design Implementation

1. **Exact Design Match**:
   - Clean, neat modern medical typography (**Plus Jakarta Sans**).
   - Equal spacing between sections with clear visual hierarchy.
   - Top announcement bar with **Welcome to Global Healthcare** and live **Call Us: +971 50 515 2391** button.
   - Header with **KURE** medical cross logo and navigation.
   - **Hero Carousel**: 3 auto-scrolling banners with smooth transitions, arrow controls, and dedicated support for **mobile responsive banner uploads**.
   - **Explore Healthcare Section**: Category filter dropdown and live instant search input.
   - **Product Cards**: Badges (*"OFF 45%"*, *"SOLD OUT"*), product imagery, pricing in AED with strikethrough actual price, and *"Add To Cart"* or *"Sold out"* buttons.
   - **Product Details Modal (Page 2)**: High-resolution product image, quantity selector `[ - ] [ 1 ] [ + ]`, instant Add to Cart button, and detailed product description.
   - **Right Slide-out Shopping Cart Drawer (Page 3)**:
     - Automatically slides out from the right when any product is added.
     - Displays items, image, title, price, quantity counter, and delete button.
     - Subtotal in AED with note *"Taxes and shipping calculated at checkout"*.
     - **Place order in whatsapp** button: Compiles all products, quantities, prices, and subtotal into a structured message and opens WhatsApp directly to your number (`+971 50 515 2391`).
     - **Call us** button: Instantly dials your phone number (`+971 50 515 2391`).
   - **From Our Blog Section**: Heartbeat ECG pulse wave icons with articles.
   - **Deep Navy Blue Footer**: Address in Al Hudaiba, Dubai, UAE, email, and phone contact details.
   - **Mobile & Tablet Responsive Sticky Bottom Bar**:
     - Sticky bottom bar visible on mobile and tablet screens.
     - Features **Call us** (with telephone icon) and **Whatsapp** (with official WhatsApp icon) for instant 1-tap customer conversion.

2. **Full Admin Control Panel (`/admin`)**:
   - **7 Pre-configured Categories**:
     1. Medicines
     2. Vitamins & Supplements
     3. Cosmetics & Personal Care
     4. Medical Equipment
     5. Surgical Products
     6. Medical Consumables
     7. Wellness Essentials
   - **Product Management**:
     - Add new products and edit existing ones.
     - Upload product images.
     - Set Actual Price, Offer Price, and Stock Quantity.
     - Set Discount Badges (or auto-calculate discount percentage).
     - 1-click **Sold Out** toggle.
   - **Banner Management**:
     - Manage 3 homepage carousel banners.
     - Upload **Desktop Banner** (wide 16:9) and separate **Mobile Responsive Banner** (vertical format) as requested!
   - **Store Settings & Phone Numbers**:
     - Change phone number and WhatsApp number with zero coding knowledge!
   - **WhatsApp Order Book & Management**:
     - Records customer orders and carts sent to WhatsApp with timestamps and subtotal.
     - **Delete Individual Logs**: Dedicated delete button on each order log.
     - **Bulk Delete**: Checkbox selection to delete multiple selected logs at once.
     - **Clear All Logs**: 1-click option to clear all order logs.
     - **Permanent Deletion Confirmation**: Shows *"It will not recover. Are you sure?"* warning with Yes/No buttons; permanently erases files without storing deleted logs.

---

## 🚀 How to Run the Website (Zero Coding Knowledge Required)

### Method 1: Double-Click (Easiest for Windows)
1. Double-click the file named **`START_STORE.bat`** in this folder.
2. It will launch both the backend and frontend servers automatically and open **http://localhost:3000** in your web browser.

---

### Method 2: Using the Command Line
Open PowerShell or Command Prompt in this folder and run:
```bash
npm run dev
```
- Frontend will open at: **http://localhost:3000**
- Backend API runs at: **http://localhost:5000**
- Admin Panel is accessible privately at: **http://localhost:3000/admin**
  - **Admin Password**: `admin$91`
  - (Hidden from public customers so only store administrators can access it)

---

## 📞 How to Change Your Phone Number & WhatsApp Number Later

You can change the phone number in two ways:

### Option A: Directly from the Admin Panel (No code editing!)
1. Open your browser and go to: **http://localhost:3000/admin**
2. Click on the tab **"Phone Numbers & Store Settings"**.
3. Update the:
   - **Call Us Phone Number** (e.g. `+971 50 515 2391`)
   - **WhatsApp Order Phone Number** (e.g. `+971 50 515 2391`)
4. Click **"Save Store Settings"**.
5. Your entire website (top bar, footer, WhatsApp cart checkout, and mobile bottom bar) is updated instantly!

### Option B: In the Settings File
If you ever want to update it manually, open:
`backend/data/settings.json` and change the numbers:
```json
{
  "phone": "+971 50 515 2391",
  "whatsapp": "+971 50 515 2391"
}
```

---

## 🖼️ How to Change or Upload Your Own Logo

You have 3 easy ways to use your own logo:

### Method 1: Upload via Admin Panel (Easiest — No Coding Needed)
1. Open your browser and go to: **http://localhost:3000/admin**
2. Enter the admin password (`admin$91`).
3. Click on the tab **"Phone Numbers & Store Settings"**.
4. Under **"Store Identity & Details"**, you will see the **Store Logo (Shown in Header)** card with a preview.
5. Click the blue **"Upload Your Logo"** button and select your logo file (PNG, JPG, SVG, or WEBP).
6. Your new logo will instantly replace the default logo across the entire website!
7. *(Optional)* If you ever want to revert, simply click **"Reset to Default Logo"**.

### Method 2: Replace the Default File Directly
- Copy your logo image file and place it inside:
  `frontend/public/logo.png`
- Any transparent PNG around 200x50 px or 400x100 px looks perfect.

### Method 3: Send it here in Chat
- You can simply attach or drag-and-drop your logo image into this chat, and it will be configured and placed directly into your store!

---

## 🌐 Complete Guide: How to Host on Hostinger

Yes! This project is **100% production-ready and fully packaged to host**.

Because this is a modern full-stack web application (**Next.js Frontend + Node.js Express API Backend**), here are the exact step-by-step instructions for Hostinger:

---

### Option 1: Hostinger VPS (Recommended & Standard for Next.js)

If you have a **Hostinger VPS** (e.g., KVM 1 / KVM 2 running Ubuntu 22.04 or 24.04), this is the cleanest and fastest method:

#### Step 1: Connect to your Hostinger VPS via SSH
Open your terminal / PowerShell:
```bash
ssh root@YOUR_SERVER_IP
```

#### Step 2: Install Node.js (v18 or v20) and PM2
```bash
# Update server
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx

# Install PM2 (Process Manager to keep site running 24/7)
npm install -g pm2
```

#### Step 3: Upload the Project Folder
You can upload via **Git**, **FileZilla (SFTP)**, or Hostinger File Manager to `/var/www/global-cure`:
```bash
cd /var/www/global-cure
```

#### Step 4: Install Dependencies & Build
```bash
# Install root, backend and frontend dependencies
npm run install:all

# Build Next.js production bundle
npm run build
```

#### Step 5: Start with PM2
We have already created the production configuration file (`ecosystem.config.js`) for you! Simply run:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
This automatically runs both your backend (port 5000) and frontend (port 3000) and ensures they restart automatically if the server reboots!

#### Step 6: Configure Nginx & Connect Your Domain
Create an Nginx configuration file:
```bash
nano /etc/nginx/sites-available/yourdomain.com
```
Paste this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site and restart Nginx:
```bash
ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Step 7: Enable Free SSL (HTTPS)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Your store is now live at `https://yourdomain.com`!

---

### Option 2: Hostinger Web Hosting (Cloud / Business via hPanel Node.js)

If you have Hostinger **Business Web Hosting** or **Cloud Hosting** with **hPanel**:

1. Log into your **Hostinger hPanel**.
2. Go to **Websites** ➔ **Manage** ➔ **Node.js** (under the Advanced/Applications section).
3. Click **Create Application**:
   - **Node.js version**: Select `20.x` or `18.x`.
   - **Application root**: Select or create `/public_html`.
   - **Application startup file**: Enter `backend/server.js`.
4. Upload the project files using the **Hostinger File Manager** (make sure not to upload the local `node_modules` folder; use `.gitignore`).
5. In the hPanel terminal or Git deployment, run:
   ```bash
   npm run install:all
   npm run build
   ```
6. Start the Node.js application in hPanel.

---

### Option 3: The Easiest "Zero-Maintenance" Pro Strategy (Vercel + Hostinger Domain)

If you want the **fastest, simplest, and 100% free hosting for Next.js**:
1. **Frontend**: Push your code to GitHub and connect it to **[Vercel](https://vercel.com)** (1-click deploy, made by the creators of Next.js).
2. **Backend**: Host the `backend/` folder on **[Render.com](https://render.com)** or **Railway** (free tier available).
3. In **Hostinger DNS Zone**, point your domain to Vercel (add A-record `76.76.21.21`).
4. This gives you worldwide high-speed CDN delivery and zero server maintenance!
