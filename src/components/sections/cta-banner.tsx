import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface CtaBannerProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CtaBanner({
  heading = 'Schedule Your Visit Today',
  description,
  buttonText = 'Request Consultation',
  buttonHref = '/contact',
}: CtaBannerProps) {
  return (
    <section className="bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-primary-foreground/90 sm:flex-row sm:gap-8">
          <a
            href="tel:+18008888888"
            className="transition-colors hover:text-primary-foreground"
          >
            +1 (800) 888-8888
          </a>
          <a
            href="mailto:kriss@casacolinacare.com"
            className="transition-colors hover:text-primary-foreground"
          >
            kriss@casacolinacare.com
          </a>
        </div>
        <div className="mt-8">
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
