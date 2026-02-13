import { CtaBanner } from '@/components/sections/cta-banner';
import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { ServicesOverview } from '@/components/sections/services-overview';
import { Testimonial } from '@/components/sections/testimonial';

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
