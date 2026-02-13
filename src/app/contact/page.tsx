import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';

import { ContactForm } from '@/components/sections/contact-form';
import { MapEmbed } from '@/components/shared/map-embed';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We&rsquo;d love to hear from you. Fill out the form below or reach
            out to us directly.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form (left on desktop, top on mobile) */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Send Us a Message
              </h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form and we&rsquo;ll get back to you as soon as
                possible.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Info column (right on desktop, bottom on mobile) */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Get in Touch
              </h2>
              <p className="mt-2 text-muted-foreground">
                Prefer to reach out directly? Here&rsquo;s how you can contact
                us.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Phone
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+18008888888"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      +1 (800) 888-8888
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:kriss@casacolinacare.com"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      kriss@casacolinacare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      189 Anapalua Street
                      <br />
                      Hawaii Kai, HI 96825
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock
                    className="mt-1 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-muted-foreground">
                      Available for inquiries: Monday&ndash;Saturday,
                      8am&ndash;6pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <MapEmbed className="mt-8 overflow-hidden rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
