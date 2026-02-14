import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Casa Colina Care | Compassionate Care Home in Hawaii Kai',
    template: '%s | Casa Colina Care',
  },
  description:
    'A warm, family-style care home facility in Hawaii Kai, Hawaii. Providing compassionate, personalized care in a beautiful tropical setting.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://casacolinacare.com',
    siteName: 'Casa Colina Care',
    title: 'Casa Colina Care | Compassionate Care Home in Hawaii Kai',
    description:
      'A warm, family-style care home facility in Hawaii Kai, Hawaii. Providing compassionate, personalized care in a beautiful tropical setting.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Casa Colina Care',
  description: 'Compassionate care home in Hawaii Kai, Hawaii',
  url: 'https://casacolinacare.com',
  telephone: '+18082001840',
  faxNumber: '+18086701163',
  email: 'kriss@casacolinacare.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '189 Anapalau Street',
    addressLocality: 'Honolulu',
    addressRegion: 'HI',
    postalCode: '96825',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '21.2793',
    longitude: '-157.7192',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  areaServed: {
    '@type': 'City',
    name: 'Hawaii Kai',
  },
  priceRange: '$$',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
