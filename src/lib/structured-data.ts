export const jsonLd = {
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
