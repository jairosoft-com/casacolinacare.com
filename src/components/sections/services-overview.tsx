import { ClipboardList, Palmtree, Shield, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';

import { SectionHeading } from '@/components/shared/section-heading';

const services = [
  {
    icon: ClipboardList,
    title: 'Personalized Care Plans',
    description:
      'Every resident receives an individualized care plan tailored to their unique needs, preferences, and goals — because no two people are the same.',
  },
  {
    icon: Shield,
    title: '24/7 Professional Support',
    description:
      'Our trained and compassionate staff are available around the clock, ensuring safety, comfort, and peace of mind for residents and their families.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Home-Cooked Meals',
    description:
      'Nutritious, delicious meals are prepared daily with fresh ingredients, accommodating dietary needs and cultural preferences.',
  },
  {
    icon: Palmtree,
    title: 'Beautiful Surroundings',
    description:
      'Located in scenic Hawaii Kai, our care home offers a tranquil tropical setting that promotes relaxation, well-being, and connection with nature.',
  },
];

export function ServicesOverview() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services-background.webp"
          alt="Casa Colina Care services"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="How We Care for Your Family" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(service => (
            <div
              key={service.title}
              className="rounded-lg bg-background p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-md bg-primary/10 p-3">
                <service.icon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
