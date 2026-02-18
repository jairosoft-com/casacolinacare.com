import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/cta-banner';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqCategories } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    "Find answers to common questions about Casa Colina Care's services, admissions, and care home life in Hawaii Kai.",
  openGraph: {
    title: 'Frequently Asked Questions | Casa Colina Care',
    description:
      "Find answers to common questions about Casa Colina Care's services, admissions, and care home life in Hawaii Kai.",
    url: 'https://casacolinacare.com/faq',
  },
};

export default function FaqPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about our care home, services, and
            admissions process.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {faqCategories.map(category => (
            <div key={category.category} className="mb-12 last:mb-0">
              <SectionHeading title={category.category} centered={false} />
              <Accordion type="multiple" className="mt-6">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                  >
                    <AccordionTrigger className="text-left text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner heading="Still Have Questions? Contact Us Directly." />
    </>
  );
}
