import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/cta-banner';
import { SectionHeading } from '@/components/shared/section-heading';

export const metadata: Metadata = {
  title: 'About Us',
};

const values = [
  {
    title: 'Aloha Spirit',
    description:
      'We infuse everything we do with warmth, love, and the genuine spirit of aloha — creating an atmosphere where residents feel welcomed and cherished every day.',
  },
  {
    title: 'Dignity & Independence',
    description:
      'We honor each resident\u2019s individuality, supporting their independence while providing the care they need to live with dignity and purpose.',
  },
  {
    title: 'Family First',
    description:
      'We treat every resident as part of our own family and maintain open, honest communication with their loved ones to build lasting trust.',
  },
  {
    title: 'Community Connection',
    description:
      'Rooted in the Hawaii Kai community, we foster meaningful connections between residents, families, staff, and our neighbors.',
  },
];

const team = [
  {
    name: 'Kriss Judd',
    role: 'Founder & Director',
    bio: 'With years of experience in senior care and a deep love for the Hawaii Kai community, Kriss founded Casa Colina Care to provide a home where every resident is treated like family.',
  },
  {
    name: 'Care Team Member',
    role: 'Lead Caregiver',
    bio: 'Our lead caregiver brings compassion and expertise to every interaction, ensuring each resident receives personalized attention and support.',
  },
  {
    name: 'Care Team Member',
    role: 'Activities Coordinator',
    bio: 'Dedicated to enriching the lives of our residents through engaging activities, social events, and meaningful daily experiences.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="text-primary">Casa Colina Care</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A warm, family-style care home rooted in the heart of Hawaii Kai.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Story"
            subtitle="How a vision of compassionate care became a home for families in Hawaii Kai."
          />
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-muted-foreground">
            <p>
              Casa Colina Care was founded with a simple yet powerful vision: to
              create a care home that truly feels like home. Nestled in the
              beautiful neighborhood of Hawaii Kai, our facility was born from a
              deep understanding that quality care goes beyond medical
              needs&nbsp;&mdash; it&rsquo;s about creating an environment where
              people can thrive.
            </p>
            <p>
              Our founders recognized that many families struggle to find care
              options that balance professional support with genuine warmth and
              personal attention. Too often, larger facilities can feel
              impersonal. That&rsquo;s why we chose to create an intimate,
              family-style home where every resident is known by name and cared
              for as an individual.
            </p>
            <p>
              Rooted in the Hawaii Kai community, we draw inspiration from the
              natural beauty that surrounds us and the aloha spirit that defines
              island life. Our commitment is to provide the highest standard of
              care while preserving the dignity, independence, and joy of every
              person who calls Casa Colina Care home.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Mission & Values"
            subtitle="The principles that guide everything we do."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map(value => (
              <div
                key={value.title}
                className="rounded-lg bg-background p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet Our Team"
            subtitle="Dedicated professionals who care for your loved ones like family."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div
                  className="mx-auto h-32 w-32 rounded-full bg-muted"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner heading="Have Questions? We're Here to Help." />
    </>
  );
}
