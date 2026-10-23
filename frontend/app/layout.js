import './globals.css';
import Script from 'next/script';
import { CartProvider } from '../components/CartContext';
import SchemaMarkup from '../components/SchemaMarkup';

export const metadata = {
  metadataBase: new URL('https://globalcurerx.com'),
  title: {
    default: 'Global Cure RX Pharmacy LLC | Online Pharmacy & Medical Supplies Dubai UAE',
    template: '%s | Global Cure RX Pharmacy LLC'
  },
  description: 'Licensed community and clinical pharmacy in Dubai, UAE. Order genuine prescription medicines, surgical instruments, medical consumables, wellness vitamins, and equipment online with express WhatsApp ordering and fast delivery across Dubai and UAE.',
  keywords: [
    'pharmacy dubai',
    'online pharmacy dubai',
    'online pharmacy uae',
    'global cure rx pharmacy',
    'global healthcare pharmacy llc',
    'buy medicines online dubai',
    'medical supplies dubai',
    'surgical products uae',
    'medical equipment dubai',
    'vitamins and supplements uae',
    'medical consumables dubai',
    'cosmetics and personal care dubai',
    'wellness essentials uae',
    'dubai pharmacy delivery',
    'warsan pharmacy dubai',
    'international city pharmacy dubai',
    'whatsapp medicine order dubai',
    'pharmacy near me dubai',
    'healthcare products uae'
  ],
  authors: [{ name: 'Global Cure RX Pharmacy LLC', url: 'https://globalcurerx.com' }],
  creator: 'Global Cure RX Pharmacy LLC',
  publisher: 'Global Cure RX Pharmacy LLC',
  alternates: {
    canonical: 'https://globalcurerx.com'
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'Global Cure RX Pharmacy LLC | Online Medicine & Medical Equipment Dubai',
    description: 'Licensed community & clinical pharmacy in Dubai, UAE. Fast WhatsApp ordering, genuine medical equipment, and pharmaceutical supplies delivered nationwide.',
    url: 'https://globalcurerx.com',
    siteName: 'Global Cure RX Pharmacy',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: '/banners/banner1_desktop.png',
        width: 1200,
        height: 630,
        alt: 'Global Cure RX Pharmacy LLC - Dubai UAE'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Cure RX Pharmacy LLC | Dubai UAE',
    description: 'Certified healthcare essentials, medical equipment, and pharmaceutical supplies in Dubai.',
    images: ['/banners/banner1_desktop.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  other: {
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai, UAE',
    'geo.position': '25.2415;55.2818',
    'ICBM': '25.2415, 55.2818',
    'theme-color': '#002b5c'
  },
  verification: {
    google: 'google0102730f994a18ac'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
        {/* Structured Data (JSON-LD Schema) for Google Search Engine Optimization */}
        <SchemaMarkup />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased selection:bg-[#004b93] selection:text-white">
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MQDY92VSTD"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MQDY92VSTD');
          `}
        </Script>

        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
