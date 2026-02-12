import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Compassionate Care in the
          <br />
          <span className="text-primary">Heart of Hawaii Kai</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A warm, family-style care home where your loved ones are treated with
          the dignity, respect, and aloha they deserve.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href="/contact">Request a Consultation</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/about">Learn About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
