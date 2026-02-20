# PRD: CasaColinaCare.com Website

## Introduction

Casa Colina Care LLC needs a marketing website that converts visitors into
consultation requests. The site serves adult children (ages 35-65) researching
care options for aging parents in Hawaii Kai, Hawaii. It must communicate
warmth, trust, and professionalism while making it effortless to request a
consultation. The site consists of four pages (Home, About, FAQ, Contact) built
with Next.js 15, Tailwind CSS, and Shadcn/ui, with a contact form that sends
email via Resend.

## Goals

- Enable visitors to request a consultation in under 60 seconds from any page
  (max 2 clicks to reach the contact form)
- Deliver contact form submissions to kriss@casacolinacare.com via Resend
- Achieve Lighthouse Performance and Accessibility scores above 90
- Load in under 3 seconds on 4G mobile
- Establish SEO foundations to rank for "care home Hawaii Kai" within 6 months
- Fully responsive design from 320px to 2560px viewport width

## User Stories

### US-001: Header & Navigation

**Description:** As a visitor, I want a sticky header with navigation so that I
can easily move between pages and find the consultation CTA from anywhere on the
site.

**Acceptance Criteria:**

- [ ] Sticky header visible on all pages with: text-based logo "Casa Colina
      Care" (links to `/`), nav links (Home, About Us, FAQ, Contact), and a
      "Request Consultation" button linking to `/contact`
- [ ] Navigation uses Next.js `<Link>` components (no client-side SPA routing)
- [ ] At viewports below 768px, nav links collapse into a hamburger icon
- [ ] Hamburger opens a Shadcn Sheet-based mobile menu with all nav links and
      "Request Consultation" CTA
- [ ] Mobile menu closes after clicking a nav link
- [ ] Active page link is visually distinguished
- [ ] Components: `src/components/layout/header.tsx`,
      `src/components/layout/mobile-nav.tsx`
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-002: Footer

**Description:** As a visitor, I want a footer with contact details and
navigation so that I can find key information from the bottom of any page.

**Acceptance Criteria:**

- [ ] Footer appears on all pages
- [ ] Displays: business name, address, phone (click-to-call `tel:` link), email
      (`mailto:` link)
- [ ] Includes navigation links matching header
- [ ] Copyright line with current year
- [ ] Component: `src/components/layout/footer.tsx`
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-003: Root Layout

**Description:** As a developer, I need the root layout to wrap all pages with
shared structure (header, footer, fonts, metadata).

**Acceptance Criteria:**

- [ ] `src/app/layout.tsx` renders header above `{children}` and footer below
- [ ] Playfair Display applied to all headings, Inter applied to body text
- [ ] Skip-to-content link as first focusable element
- [ ] Default metadata: site title, description, Open Graph base tags
- [ ] `<html>` has `lang="en"`
- [ ] Typecheck passes

---

### US-004: Home Page — Hero Section

**Description:** As a visitor landing on the site, I want to see an impactful
hero that communicates what Casa Colina Care offers and how to get in touch.

**Acceptance Criteria:**

- [ ] Route: `/` in `src/app/page.tsx` (page file created, hero is the first
      section)
- [ ] Full-viewport-height section with gradient or styled background
- [ ] Heading: "Compassionate Care in the Heart of Hawaii Kai" in Playfair
      Display
- [ ] Two CTA buttons: "Request a Consultation" (primary, links to `/contact`),
      "Learn About Us" (secondary outline, links to `/about`)
- [ ] Component created: `src/components/sections/hero.tsx`
- [ ] Shared component created: `src/components/shared/section-heading.tsx` for
      consistent section titles
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Home Page — Introduction & Services Overview Sections

**Description:** As a visitor, I want to learn what Casa Colina Care offers
through a welcoming introduction and a clear services overview.

**Acceptance Criteria:**

- [ ] Introduction section: two-column layout (image placeholder left, text
      right), heading "Welcome to Casa Colina Care", 2-3 paragraphs, "Read more
      about us" link to `/about`
- [ ] Services Overview section: heading "How We Care for Your Family", four
      cards in responsive grid with Lucide icons: `ClipboardList` (Personalized
      Care Plans), `Shield` (24/7 Professional Support), `UtensilsCrossed`
      (Home-Cooked Meals), `Palmtree` (Beautiful Surroundings)
- [ ] Each service card has icon, title, and description text
- [ ] Components created: `src/components/sections/intro.tsx`,
      `src/components/sections/services-overview.tsx`
- [ ] Sections added to `src/app/page.tsx` below the hero
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: Home Page — Testimonial, CTA Banner & Page Assembly

**Description:** As a visitor, I want to see social proof and a clear
call-to-action so that I feel confident reaching out for a consultation.

**Acceptance Criteria:**

- [ ] Testimonial section: quote-style placeholder on warm sand (`#F5E6D3`)
      background
- [ ] CTA Banner section: heading "Schedule Your Visit Today", phone number,
      email, and "Request Consultation" button linking to `/contact`
- [ ] CTA Banner component is reusable with configurable heading/text (will be
      used on About, FAQ, Contact pages)
- [ ] Components created: `src/components/sections/testimonial.tsx`,
      `src/components/sections/cta-banner.tsx`
- [ ] Home page (`src/app/page.tsx`) renders all 5 sections in order: Hero,
      Introduction, Services Overview, Testimonial, CTA Banner
- [ ] Page metadata: title "Casa Colina Care | Compassionate Care Home in Hawaii
      Kai"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: About Us Page

**Description:** As a visitor, I want to learn about Casa Colina Care's story,
values, and team so that I can trust them with my loved one's care.

**Acceptance Criteria:**

- [ ] Route: `/about` in `src/app/about/page.tsx`
- [ ] Page header section with title "About Casa Colina Care" and shorter hero
      banner
- [ ] Our Story section with placeholder content about facility history,
      founding vision, Hawaii Kai community roots
- [ ] Mission & Values section with four value cards: Aloha Spirit, Dignity &
      Independence, Family First, Community Connection — each with title and
      description
- [ ] Meet Our Team section with placeholder cards (photo placeholder, name,
      role, bio)
- [ ] CTA Banner reused with heading "Have Questions? We're Here to Help." and
      link to `/contact`
- [ ] Page metadata: title "About Us | Casa Colina Care"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: FAQ Page

**Description:** As a visitor, I want to browse frequently asked questions so
that I can get answers without needing to call or email.

**Acceptance Criteria:**

- [ ] Route: `/faq` in `src/app/faq/page.tsx`
- [ ] Page header with title "Frequently Asked Questions"
- [ ] FAQ Accordion using Shadcn Accordion component, grouped by 4 categories:
      General (3 questions), Admissions & Getting Started (3 questions), Daily
      Life (3 questions), Care & Services (3 questions)
- [ ] Each question expands/collapses independently
- [ ] Placeholder answers provided for all 12 questions
- [ ] CTA Banner reused with heading "Still Have Questions? Contact Us
      Directly." and link to `/contact`
- [ ] Page metadata: title "Frequently Asked Questions | Casa Colina Care"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Contact Page — Form Component

**Description:** As a visitor, I want to fill out a contact form so that I can
request a consultation without needing to call.

**Acceptance Criteria:**

- [ ] Component created: `src/components/sections/contact-form.tsx`
- [ ] Form fields using Shadcn Input/Textarea/Label: First Name (text, required,
      max 50), Last Name (text, required, max 50), Email (email, required, valid
      format), Phone (tel, optional, valid format if provided), Relationship to
      Resident (text, optional, max 100), Message (textarea, required, max 2000)
- [ ] Submit button label: "Send Consultation Request"
- [ ] Client-side validation: inline error messages for invalid/empty required
      fields before submission
- [ ] Four UI states: Idle (button enabled), Loading (spinner + "Sending..."
      with fields disabled), Success (green message "Thank you! We'll be in
      touch soon." with form cleared), Error (red error message with form data
      preserved)
- [ ] Form POSTs to `/api/contact` and handles JSON response
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-010: Contact Page — Info Column, Map & Page Assembly

**Description:** As a visitor, I want to see contact details and location
alongside the form so I can choose how to reach out.

**Acceptance Criteria:**

- [ ] Route: `/contact` in `src/app/contact/page.tsx`
- [ ] Two-column layout on desktop (form left, info right), stacked on mobile
      (form above, info below)
- [ ] Right column displays: Phone +1 (800) 888-8888 (click-to-call `tel:`
      link), Email kriss@casacolinacare.com (`mailto:` link), Address 189
      Anapalua Street Hawaii Kai HI 96825, Hours "Available for inquiries:
      Monday-Saturday, 8am-6pm"
- [ ] Google Maps iframe embed component created:
      `src/components/shared/map-embed.tsx`
- [ ] Page metadata: title "Contact Us | Casa Colina Care"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-011: Contact Form API Route & Resend Integration

**Description:** As the business owner, I want form submissions emailed to me
via Resend so that I receive consultation requests reliably.

**Acceptance Criteria:**

- [ ] `POST /api/contact` route at `src/app/api/contact/route.ts`
- [ ] Server-side validation re-validates all fields: firstName (required, 1-50
      chars), lastName (required, 1-50 chars), email (required, valid format),
      phone (optional, valid if provided), relationship (optional, max 100),
      message (required, 1-2000 chars)
- [ ] Returns `400` with `{success: false, message: "..."}` if validation fails
- [ ] On valid input, sends email via Resend: From
      `Casa Colina Care <onboarding@resend.dev>` (dev sender), To
      kriss@casacolinacare.com, Reply-To submitter's email, Subject "New
      Consultation Request from {firstName} {lastName}"
- [ ] Email body is HTML formatted with all form fields, builder in
      `src/lib/email.ts`
- [ ] Returns `200` with
      `{success: true, message: "Thank you! We'll be in touch soon."}` on
      success
- [ ] Returns `500` with
      `{success: false, message: "Something went wrong. Please try again or call us directly."}`
      on Resend failure
- [ ] `RESEND_API_KEY` stored in environment variable only (never exposed to
      client)
- [ ] `.env.example` file documents required env vars
- [ ] Typecheck passes

---

### US-012: SEO, Metadata & Structured Data

**Description:** As the business owner, I want proper SEO foundations so that
the site can rank for "care home Hawaii Kai" and related searches.

**Acceptance Criteria:**

- [ ] Page metadata set per page with titles and descriptions matching SPEC.md
      section 4
- [ ] Open Graph tags on all pages: `og:title`, `og:description`, `og:type`,
      `og:url`
- [ ] JSON-LD structured data on root layout: `LocalBusiness` schema with
      business name, address, phone, email, geo coordinates
- [ ] `src/app/robots.ts` generates `robots.txt` allowing all crawlers and
      linking to sitemap
- [ ] `src/app/sitemap.ts` generates `sitemap.xml` with all 4 pages
- [ ] Semantic HTML verified: single `h1` per page, sequential `h2`/`h3`
      hierarchy
- [ ] Typecheck passes

---

## Functional Requirements

- FR-1: The system must display a sticky header with logo, nav links, and
  "Request Consultation" CTA on all pages
- FR-2: When viewport is below 768px, the system must collapse nav links into a
  hamburger menu using Shadcn Sheet
- FR-3: When a visitor clicks "Request Consultation" from any page, the system
  must navigate to `/contact`
- FR-4: The Home page must display Hero, Introduction, Services Overview,
  Testimonial, and CTA Banner sections in order
- FR-5: The About page must display page header, Our Story, Mission & Values,
  Meet Our Team, and CTA Banner sections
- FR-6: The FAQ page must display questions grouped by category in a Shadcn
  Accordion with expand/collapse behavior
- FR-7: The Contact page must display a form (left) and contact info with Google
  Maps (right) on desktop, stacked on mobile
- FR-8: The contact form must validate all required fields client-side before
  submission and show inline errors
- FR-9: The contact form must show loading, success, and error UI states during
  and after submission
- FR-10: `POST /api/contact` must re-validate all fields server-side before
  sending email
- FR-11: `POST /api/contact` must send an HTML email via Resend with all form
  fields to kriss@casacolinacare.com
- FR-12: The Resend API key must be stored server-side only and never exposed to
  the client
- FR-13: All pages must include SEO metadata, Open Graph tags, and JSON-LD
  structured data
- FR-14: The site must generate `robots.txt` and `sitemap.xml` dynamically
- FR-15: Phone number must be a clickable `tel:` link on every page
- FR-16: All navigation must use Next.js `<Link>` (no SPA client-side routing)

## Non-Goals

- No database or persistent data storage — emails are sent and forgotten
- No user authentication or accounts
- No blog, CMS, or admin panel
- No payment processing or financial transactions
- No real-time chat or messaging
- No multi-language/i18n support
- No dark mode
- No analytics integration (can be added post-launch)
- No automated testing setup (manual test checklist provided)

## Design Considerations

- **Mobile-first:** Design for 375px first, then scale up to 768px, 1280px,
  2560px
- **Brand palette:** Ocean Teal primary, Warm Sand secondary, Sunset Coral
  accent, Ivory background
- **Typography:** Playfair Display for headings (warmth, elegance), Inter for
  body (clarity, readability)
- **Border radius:** 12px for cards, 8px for buttons/inputs — soft, approachable
  feel
- **Touch targets:** Minimum 44x44px for all interactive elements
- **Reusable components:** `section-heading.tsx` for consistent section titles,
  `cta-banner.tsx` reused across pages, `map-embed.tsx` for Google Maps

## Technical Considerations

- **Rendering:** SSG for all pages. No `output: 'export'` (disables API routes).
  Vercel default SSG with serverless function for `/api/contact`
- **Hosting:** Vercel free tier
- **Fonts:** Loaded via `next/font` to avoid layout shift (CLS < 0.1)
- **Images:** Placeholder images used until client provides facility photos. Use
  `next/image` for optimization when real images are added
- **Environment variables:** `RESEND_API_KEY` required. `.env.example` documents
  this
- **Email sender:** Use `onboarding@resend.dev` during development; switch to
  `noreply@casacolinacare.com` after domain verification

## Success Metrics

- Lighthouse Performance score > 90
- Lighthouse Accessibility score > 90
- Time to first meaningful paint < 3 seconds on 4G
- Cumulative Layout Shift (CLS) < 0.1
- Contact form to submission < 60 seconds, max 2 clicks from any page
- All navigation links resolve with 0 broken links
- Form submission delivers email to kriss@casacolinacare.com
- Mobile touch targets minimum 44x44px
- Single `h1` per page with sequential heading hierarchy

## Open Questions

- Real facility photos — placeholder images used until client provides them
- Logo file — text-based "Casa Colina Care" used as default until a logo is
  provided
- Team member details — names, roles, photos, bios needed for About page
- FAQ accuracy — are the placeholder questions and answers appropriate?
- Resend account — client needs to sign up, verify casacolinacare.com domain,
  and provide API key
- Google Maps — exact embed URL/coordinates for 189 Anapalua Street
