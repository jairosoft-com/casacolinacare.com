import { Quote } from 'lucide-react';

export function Testimonial() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Quote
          className="mx-auto h-10 w-10 text-primary/40"
          aria-hidden="true"
        />
        <blockquote className="mt-6">
          <p className="text-lg italic text-secondary-foreground sm:text-xl">
            &ldquo;From the moment we visited Casa Colina Care, we knew it was
            the right place for our mother. The staff treats every resident like
            family, and the beautiful Hawaii Kai setting brings her so much
            joy.&rdquo;
          </p>
          <footer className="mt-6">
            <p className="font-semibold text-secondary-foreground">
              &mdash; A Grateful Family Member
            </p>
            <p className="mt-1 text-sm text-secondary-foreground/70">
              Placeholder testimonial
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
