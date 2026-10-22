import React from 'react';

/**
 * ============================================================================
 * 🔍 SEO SCHEMA MARKUP (JSON-LD Structured Data)
 * ============================================================================
 * WHERE TO UPLOAD / EDIT SCHEMA:
 * File Location: frontend/components/SchemaMarkup.jsx
 *
 * Your SEO specialist can edit the schema objects below or paste any additional
 * schemas (Product schemas, MedicalWebPage, FAQ, Review schemas, etc.) inside
 * this component.
 * ============================================================================
 */
export default function SchemaMarkup() {
  // 1. Local Business & Pharmacy Schema
  const pharmacySchema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": "https://globalcurerx.com/#pharmacy",
    "name": "Global Cure RX Pharmacy LLC",
    "alternateName": "Global Healthcare Pharmacy LLC",
    "url": "https://globalcurerx.com",
    "logo": "https://globalcurerx.com/logo.png",
    "image": "https://globalcurerx.com/banners/banner_original.png",
    "description": "Licensed community & clinical pharmacy in Dubai, UAE offering genuine prescription medicines, surgical instruments, medical consumables, wellness vitamins, and equipment.",
    "telephone": "+971 50 515 2391",
    "email": "Info@globalcurerx.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No: 02, Al Hudaiba",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "101892",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2415,
      "longitude": 55.2818
    },
    "hasMap": "https://maps.google.com/?q=Al+Hudaiba+Dubai",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "23:00"
      }
    ],
    "priceRange": "AED",
    "currenciesAccepted": "AED",
    "paymentAccepted": "Cash, Credit Card, Debit Card"
  };

  // 2. WebSite & Sitelinks Search Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://globalcurerx.com/#website",
    "url": "https://globalcurerx.com",
    "name": "Global Cure RX Pharmacy",
    "description": "Online medicine ordering and medical equipment delivery in Dubai, UAE",
    "publisher": {
      "@id": "https://globalcurerx.com/#pharmacy"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://globalcurerx.com/#products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // 3. Google FAQPage Rich Snippet Schema (Boosts search ranking and accordion appearance in Google)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I place an order for medicines or healthcare products on Global Cure RX Pharmacy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ordering is fast, simple, and completely tension-free through WhatsApp with zero payment gateway friction. Simply browse our website, find your required products, and click 'Add to Cart' or 'Order via WhatsApp'. When you go to checkout, our intelligent system automatically compiles all your selected product names, quantities, and pricing into a clean, pre-filled WhatsApp message. All you do is tap the 'Send' button on WhatsApp—our pharmacy team instantly receives your order and begins processing it right away!"
        }
      },
      {
        "@type": "Question",
        "name": "How does the Cart to WhatsApp feature work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Whenever you add multiple healthcare items to your cart—such as Medicines, Vitamins, Surgical Products, or Consumables—our cart saves your selections. When you click the green 'Order via WhatsApp' button, our site pulls your exact cart summary directly into a formatted message sent to our official WhatsApp (+971 50 515 2391). There is no need to type out product names or prices manually; one click transfers your complete order cleanly to our team."
        }
      },
      {
        "@type": "Question",
        "name": "Why is there no card payment gateway on the website? Is this more secure for me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this is significantly more secure! In online healthcare, patient privacy and genuine verification are paramount. By eliminating third-party website card forms, you never have to expose your sensitive credit card numbers, debit cards, or CVV codes online. There is zero risk of unauthorized card auto-charges or data leaks. You submit your order effortlessly with total peace of mind."
        }
      },
      {
        "@type": "Question",
        "name": "How and when do I pay for my order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you send your order message on WhatsApp, our expert team verifies product availability and confirms your delivery address and preferences. After receiving your confirmation, we send you a 100% secure, encrypted official payment link (supporting Apple Pay, Visa, and Mastercard) or arrange payment upon delivery. You only pay after you have personally reviewed and confirmed your order with our pharmacy specialist."
        }
      },
      {
        "@type": "Question",
        "name": "Who follows up on my order after I send the WhatsApp message?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A dedicated healthcare specialist from our Dubai pharmacy personally follows up with you. Unlike automated chatbots or generic websites, our trained pharmacy team member reviews your order, verifies proper storage and packaging, answers any usage or dosage questions, and ensures your experience is smooth from start to finish."
        }
      },
      {
        "@type": "Question",
        "name": "How do I receive order updates and tracking information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You receive prompt, personalized updates directly on WhatsApp from our team. We notify you when your order is packed, when it is handed over to our temperature-controlled dispatch courier, and provide an accurate delivery window. If you ever have a question about delivery timing, you can simply reply in the WhatsApp chat for immediate answers."
        }
      },
      {
        "@type": "Question",
        "name": "What types of medical and healthcare products do you supply?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Global Cure RX Pharmacy LLC is a licensed community and clinical pharmacy in Dubai supplying 8 primary categories: (1) Medicines; (2) Vitamins & Supplements; (3) Cosmetics & Personal Care; (4) Medical Equipment; (5) Surgical Products; (6) Medical Consumables; (7) Wellness Essentials; and (8) Orthopedic Supports."
        }
      },
      {
        "@type": "Question",
        "name": "How do I order prescription medicines or submit my doctor's prescription?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can easily share a clear photo or digital PDF of your valid UAE doctor's prescription directly in our WhatsApp conversation. Our licensed pharmacists verify the prescription in accordance with UAE Ministry of Health (MOH) and Dubai Health Authority (DHA) protocols, check dosage compatibility, and fulfill your medication safely."
        }
      },
      {
        "@type": "Question",
        "name": "Do you deliver across Dubai and all other Emirates in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer express delivery across all areas of Dubai as well as all 7 Emirates: Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, and Fujairah using reliable, temperature-monitored medical delivery couriers."
        }
      },
      {
        "@type": "Question",
        "name": "Are all your medical supplies, medicines, and surgical equipment genuine and certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "100% Yes. Every product supplied by Global Cure RX Pharmacy LLC is authentic, sourced exclusively from certified pharmaceutical manufacturers and authorized UAE healthcare distributors. All items adhere to strict regulatory standards and are stored in temperature-controlled pharmaceutical facilities in Dubai to ensure maximum efficacy."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add more products, change quantities, or modify my order after sending it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Because you are communicating directly with a human pharmacy specialist on WhatsApp, changing your order is effortless. If you wish to add vitamins, change the quantity of gloves, or update your delivery address, just tell our specialist in the chat. They will update your cart and bill in real time before dispatch."
        }
      }
    ]
  };

  return (
    <>
      {/* Pharmacy / LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
      />

      {/* WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* FAQPage Google Rich Snippets Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ==================================================================== */}
      {/* ✍️ SEO SPECIALIST CAN PASTE CUSTOM SCHEMA CODE BELOW THIS LINE:     */}
      {/* Example:                                                             */}
      {/* <script                                                              */}
      {/*   type="application/ld+json"                                         */}
      {/*   dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}  */}
      {/* />                                                                 */}
      {/* ==================================================================== */}
    </>
  );
}
