import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { ServicesOverview } from '@/components/sections/services-overview';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
    </>
  );
}
