import { ContactForm } from '@/components/sections/contact-form';

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </section>
  );
}
