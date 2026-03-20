# Casa Colina Care Website

**Repo:** github.com/jairosoft-com/casacolinacare.com
**Live URL:** https://casacolinacare.com
**Status:** Active — initial build complete, in maintenance/enhancement phase

## What It Is
Marketing website for Casa Colina Care LLC, a licensed residential care home in Hawaii Kai, HI. Four pages (Home, About, FAQ, Contact) with a contact form that emails inquiries via Resend. No database, no auth, no CMS.

## Target Audience
Adult children (35-65) researching care options for aging parents.

## Tech Stack
- Next.js 15 (App Router), React 19, TypeScript strict
- Tailwind CSS 3 + shadcn/ui (New York style)
- Resend for email delivery
- Vitest + Playwright for testing
- Deployed on Vercel

## Key People
- **Ramon** — sole developer, builds and maintains everything
- **Kriss Aseniero** — business owner, receives contact form emails

## Architecture
- Server-first (RSC by default)
- Only 2 client components: Header, ContactForm
- 4 static pages + 1 API route (POST /api/contact)
- Conventional commits, Husky pre-commit hooks, Commitlint

## PRDs
- **002** — Initial design/build (10 user stories, all shipped)
- **004** — Contact info update with fax addition (shipped)

## Known Issues
1. CTA banner has placeholder phone (+1 800 888-8888) instead of real number
2. Testimonial section uses placeholder text
3. Validators utility file is empty (validation duplicated)
4. Constants not fully centralized (business info hardcoded in components)
5. Unused template code (auth store, API client)

## Completed Milestones
- All 12 user stories from PRD 002 shipped (Feb 10-13)
- Contact info update with fax (PRs #17, #18, Feb 17)
- SEO metadata and structured data
- Documentation overhaul (CLAUDE.md, AGENTS.md)
