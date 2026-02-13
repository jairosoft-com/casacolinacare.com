import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/cta-banner';
import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { ServicesOverview } from '@/components/sections/services-overview';
import { Testimonial } from '@/components/sections/testimonial';

export const metadata: Metadata = {
  description:
    'A warm, family-style care home facility in Hawaii Kai, Hawaii. Providing compassionate, personalized care in a beautiful tropical setting.',
  openGraph: {
    title: 'Casa Colina Care | Compassionate Care Home in Hawaii Kai',
    description:
      'A warm, family-style care home facility in Hawaii Kai, Hawaii. Providing compassionate, personalized care in a beautiful tropical setting.',
    url: 'https://casacolinacare.com',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <Testimonial />
      <CtaBanner />
    </>
  );
}
