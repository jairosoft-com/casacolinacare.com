import Link from 'next/link';

import { SectionHeading } from '@/components/shared/section-heading';

export function Intro() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Image placeholder */}
          <div className="aspect-[4/3] rounded-lg bg-muted" aria-hidden="true">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-sm">Image Placeholder</span>
            </div>
          </div>

          {/* Text content */}
          <div>
            <SectionHeading
              title="Welcome to Casa Colina Care"
              centered={false}
            />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Nestled in the heart of Hawaii Kai, Casa Colina Care is a warm,
                family-style care home where residents are treated with dignity,
                respect, and the spirit of aloha. Our intimate setting allows us
                to provide truly personalized attention to each individual.
              </p>
              <p>
                Founded with the belief that every person deserves compassionate
                care in a place that feels like home, we combine professional
                expertise with genuine warmth. Our dedicated team creates a
                nurturing environment where residents can thrive.
              </p>
              <p>
                From daily activities to specialized care plans, everything we
                do is guided by our commitment to enhancing the quality of life
                for those we serve — and providing peace of mind for their
                families.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-6 inline-block font-medium text-primary hover:underline"
            >
              Read more about us &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
