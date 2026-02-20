# PRD: CasaColinaCare.com Website (Enhanced)

**Version:** 2.3  
**Last Updated:** February 12, 2026  
**Status:** Draft for Review  
**Project Type:** Marketing Website with Contact Form

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Introduction](#2-introduction)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Prerequisites & Dependencies](#4-prerequisites--dependencies)
5. [User Stories](#5-user-stories)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Technical Specifications](#8-technical-specifications)
9. [Content Specifications](#9-content-specifications)
10. [Design Specifications](#10-design-specifications)
11. [Testing Strategy](#11-testing-strategy)
12. [Deployment & Operations](#12-deployment--operations)
13. [Risk Assessment](#13-risk-assessment)
14. [Open Questions & Decisions](#14-open-questions--decisions)
15. [Appendices](#15-appendices)

---

## 1. Executive Summary

### 1.1 Project Overview

Casa Colina Care LLC requires a professional marketing website to establish an
online presence and convert visitors into consultation requests. The site will
serve as the primary digital touchpoint for families researching care options
for aging parents in Hawaii Kai, Hawaii.

### 1.2 Key Stakeholders

- **Business Owner:** Kriss (kriss@casacolinacare.com)
- **Target Audience:** Adult children (ages 35-65) researching care options
- **Development Team:** AI-assisted development following TDD methodology
- **Hosting Provider:** Vercel (free tier)

### 1.3 Timeline & Milestones

| Milestone             | Target Date | Deliverables                              |
| --------------------- | ----------- | ----------------------------------------- |
| Requirements Approval | Week 1      | Approved PRD                              |
| Design & Architecture | Week 2      | Component designs, technical architecture |
| Development Sprint 1  | Week 3-4    | Navigation, Home page, About page         |
| Development Sprint 2  | Week 5-6    | FAQ page, Contact page, API integration   |
| Testing & QA          | Week 7      | Full test suite, accessibility audit      |
| Launch Preparation    | Week 8      | Content finalization, Resend setup        |
| Production Launch     | Week 9      | Live site deployment                      |

### 1.4 Budget Constraints

- **Hosting:** Vercel free tier (sufficient for expected traffic)
- **Email Service:** Resend free tier (100 emails/day)
- **Domain:** Client-provided (casacolinacare.com)
- **Development:** AI-assisted (minimal cost)

---

## 2. Introduction

### 2.1 Business Context

Casa Colina Care LLC operates a residential care home in Hawaii Kai, Hawaii.
Currently, the business has no online presence, making it difficult for
potential clients to:

- Discover the facility through online searches
- Learn about services and values
- Request consultations or schedule visits
- Compare with other care options in the area

### 2.2 Problem Statement

Families researching care options for aging parents face significant challenges:

- **Discovery Gap:** No way to find Casa Colina Care online
- **Information Void:** No accessible information about services, values, or
  team
- **Contact Friction:** Must call during business hours to inquire
- **Trust Barrier:** No online presence reduces credibility and trust

### 2.3 Solution Overview

A modern, responsive marketing website that:

- Establishes professional online presence
- Communicates warmth, trust, and professionalism
- Provides comprehensive information about services and values
- Enables 24/7 consultation requests via web form
- Optimizes for local SEO ("care home Hawaii Kai")

### 2.4 Target Audience

**Primary Persona: The Concerned Adult Child**

- **Age:** 35-65 years old
- **Relationship:** Adult child of aging parent
- **Emotional State:** Anxious, overwhelmed, seeking reassurance
- **Behavior:** Comparison shopping, researching multiple facilities
- **Device Usage:** Mobile during work breaks, desktop in evenings
- **Key Needs:**
  - Quick access to information
  - Visual proof of quality (photos, testimonials)
  - Easy way to request consultation
  - Transparent pricing and services information

**Secondary Persona: Healthcare Referral Professional**

- **Role:** Social worker, hospital discharge planner, case manager
- **Needs:** Quick facility information, contact details, referral process

### 2.5 Competitive Landscape

**Local Competitors in Hawaii Kai:**

- Limited online presence among local care homes
- Opportunity to differentiate through modern, user-friendly website
- SEO advantage for "care home Hawaii Kai" searches

**Key Differentiators:**

- Aloha Spirit and Hawaii Kai community connection
- Family-style, non-institutional approach
- Beautiful tropical surroundings
- Personalized care plans

---

## 3. Goals & Success Metrics

### 3.1 Primary Business Objectives

1. **Lead Generation:** Enable consultation requests 24/7
2. **Brand Awareness:** Establish professional online presence
3. **Local SEO:** Rank for "care home Hawaii Kai" within 6 months
4. **Trust Building:** Communicate warmth and professionalism

### 3.2 User Experience Goals

1. **Speed:** Consultation request in under 60 seconds
2. **Accessibility:** Max 2 clicks to reach contact form from any page
3. **Performance:** Load in under 3 seconds on 4G mobile
4. **Responsiveness:** Flawless experience from 320px to 2560px

### 3.3 Technical Performance Goals

| Metric                         | Target     | Measurement Tool |
| ------------------------------ | ---------- | ---------------- |
| Lighthouse Performance         | > 90       | Chrome DevTools  |
| Lighthouse Accessibility       | > 90       | Chrome DevTools  |
| Time to First Meaningful Paint | < 3s on 4G | WebPageTest      |
| Cumulative Layout Shift (CLS)  | < 0.1      | Chrome DevTools  |
| First Contentful Paint (FCP)   | < 1.8s     | Chrome DevTools  |
| Largest Contentful Paint (LCP) | < 2.5s     | Chrome DevTools  |

### 3.4 SEO & Marketing Goals

| Goal                           | Target           | Timeline           |
| ------------------------------ | ---------------- | ------------------ |
| Google Search Console Setup    | Complete         | Week 1 post-launch |
| Sitemap Submission             | Complete         | Week 1 post-launch |
| Local Business Schema          | Implemented      | Launch             |
| "care home Hawaii Kai" ranking | Top 10           | 6 months           |
| Organic traffic                | 100 visits/month | 3 months           |

### 3.5 Measurable KPIs

**30-Day Post-Launch:**

- Contact form submissions: 5-10
- Average session duration: > 2 minutes
- Bounce rate: < 60%
- Mobile traffic: > 50%

**60-Day Post-Launch:**

- Contact form submissions: 10-20
- Pages per session: > 2.5
- Return visitor rate: > 15%

**90-Day Post-Launch:**

- Contact form submissions: 20-30
- Organic search traffic: > 50 visits/month
- Google Business Profile views: > 100/month

---

## 4. Prerequisites & Dependencies

### 4.1 Required Accounts & Services

**Critical (Blocks Launch):**

- [ ] **Resend Account**
  - Sign up at resend.com
  - Verify casacolinacare.com domain
  - Obtain API key
  - Configure SPF/DKIM records
  - Test email delivery

- [ ] **Vercel Account**
  - Sign up at vercel.com
  - Connect GitHub repository
  - Configure custom domain
  - Set up environment variables

**High Priority:**

- [ ] **Google Search Console**
  - Verify domain ownership
  - Submit sitemap
  - Monitor indexing status

- [ ] **Google Business Profile**
  - Claim/create business listing
  - Add photos and information
  - Link to website

### 4.2 Development Environment

**Required Software:**

- Node.js v18+ (LTS recommended)
- npm v9+
- Git v2.30+
- Modern code editor (VS Code recommended)

**Required npm Packages:**

```json
{
  "dependencies": {
    "next": "15.4.2",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "resend": "^3.0.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.563.0"
  }
}
```

### 4.3 Content Requirements

**Critical (Needed Before Launch):**

- [ ] Facility photos (minimum 10 high-quality images)
  - Exterior shots (2-3)
  - Common areas (3-4)
  - Resident rooms (2-3)
  - Gardens/outdoor spaces (2-3)
  - Specifications: 1920x1080px, WebP format, < 200KB each

- [ ] Logo file
  - SVG format preferred (scalable)
  - PNG fallback (2000x2000px, transparent background)
  - Favicon versions (16x16, 32x32, 180x180)

- [ ] Business information verification
  - Exact address: 189 Anapalua Street, Hawaii Kai, HI 96825
  - Phone number: +1 (800) 888-8888
  - Email: kriss@casacolinacare.com
  - Business hours: Monday-Saturday, 8am-6pm

**High Priority:**

- [ ] Team member information
  - Names, roles, professional photos
  - Brief bios (100-150 words each)
  - Credentials/certifications

- [ ] FAQ content review
  - Verify accuracy of placeholder questions
  - Provide approved answers
  - Add any missing common questions

- [ ] Testimonials (optional but recommended)
  - 2-3 family testimonials
  - Names (first name + last initial)
  - Relationship to resident
  - Quote (50-100 words)

### 4.4 External Dependencies

**Google Maps Embed:**

- Exact coordinates for 189 Anapalua Street
- Google Maps embed URL or API key
- Alternative: Static map image

**Third-Party Services:**

- Resend API (email delivery)
- Vercel Edge Network (hosting)
- Google Fonts API (typography)

---

## 5. User Stories

### 5.1 Navigation & Layout

#### US-001: Header & Navigation

**As a** visitor  
**I want** a sticky header with navigation  
**So that** I can easily move between pages and find the consultation CTA from
anywhere on the site

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** None

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: Sticky header displays on all pages
  Given a visitor is on any page of the website
  Then they should see a sticky header at the top
  And the header should contain the text-based logo "Casa Colina Care"
  And the header should contain navigation links: Home, About Us, FAQ, Contact
  And the header should contain a "Request Consultation" button with primary styling

Scenario: Logo navigation
  Given a visitor is on any page
  When they click the "Casa Colina Care" logo
  Then they should be navigated to the home page (/)

Scenario: Request Consultation button navigation
  Given a visitor is on any page
  When they click the "Request Consultation" button
  Then they should be navigated to the contact page (/contact)

Scenario: Desktop navigation uses Next.js Link components
  Given the website is rendered
  Then all navigation links should use Next.js <Link> components
  And navigation should not use client-side SPA routing

Scenario: Mobile navigation collapses below 768px
  Given a visitor is viewing the site on a device with viewport width below 768px
  Then the navigation links should be hidden
  And a hamburger menu icon should be visible

Scenario: Mobile menu opens and displays content
  Given a visitor is on mobile (viewport < 768px)
  When they click the hamburger icon
  Then a Shadcn Sheet-based mobile menu should open
  And the menu should contain all navigation links
  And the menu should contain the "Request Consultation" CTA

Scenario: Mobile menu closes after navigation
  Given the mobile menu is open
  When a visitor clicks any navigation link
  Then the mobile menu should close
  And they should be navigated to the selected page

Scenario: Active page link is visually distinguished
  Given a visitor is on a specific page
  Then the corresponding navigation link should be visually distinguished
  And the distinction should be through different color or underline

Scenario: Skip-to-content link for accessibility
  Given a visitor navigates to any page using keyboard
  When they press Tab for the first time
  Then the skip-to-content link should receive focus
  And it should be the first focusable element on the page

Scenario: Component implementation
  Given the header feature is implemented
  Then the header component should exist at src/components/layout/header.tsx
  And the mobile nav component should exist at src/components/layout/mobile-nav.tsx

Scenario: Tests and type checking pass
  Given the header implementation is complete
  When all tests are run
  Then all unit tests should pass
  And all E2E tests should pass
  And TypeScript type checking should pass with no errors

Scenario: Accessibility score meets requirements
  Given the header is implemented
  When measured using Chrome DevTools Lighthouse
  Then the Accessibility score should be greater than 90
```

**Accessibility Requirements:**

- ARIA labels for hamburger button ("Open navigation menu")
- Focus trap in mobile menu when open
- Keyboard navigation support (Tab, Enter, Escape)
- Screen reader announcements for menu state changes

**Mobile Considerations:**

- Touch target minimum 44x44px for all interactive elements
- Smooth animation for menu open/close (300ms)
- Prevent body scroll when menu is open

---

#### US-002: Footer

**As a** visitor  
**I want** a footer with contact details and navigation  
**So that** I can find key information from the bottom of any page

**Priority:** Must Have  
**Effort:** Small  
**Dependencies:** None

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: Footer appears on all pages
  Given a visitor is on any page of the website
  Then they should see a footer at the bottom of the page

Scenario: Footer displays business information
  Given a visitor views the footer
  Then they should see the business name "Casa Colina Care"
  And they should see the address "189 Anapalau Street, Hawaii Kai, HI 96825"
  And they should see the phone number "+1 (800) 888-8888" as a clickable tel: link
  And they should see the email "kriss@casacolinacare.com" as a clickable mailto: link

Scenario: Phone number is clickable
  Given a visitor views the footer
  When they click the phone number
  Then their device should initiate a phone call to +1 (800) 888-8888

Scenario: Email address is clickable
  Given a visitor views the footer
  When they click the email address
  Then their default email client should open with kriss@casacolinacare.com in the "To" field

Scenario: Footer includes navigation links
  Given a visitor views the footer
  Then they should see navigation links matching the header
  And the links should include: Home, About Us, FAQ, Contact

Scenario: Copyright displays with dynamic year
  Given a visitor views the footer
  Then they should see a copyright line
  And the copyright should display the current year dynamically
  And the format should be "© [YEAR] Casa Colina Care. All rights reserved."

Scenario: Component implementation
  Given the footer feature is implemented
  Then the footer component should exist at src/components/layout/footer.tsx

Scenario: Tests and type checking pass
  Given the footer implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

**Accessibility Requirements:**

- Semantic `<footer>` element
- Proper heading hierarchy (if footer has sections)
- Sufficient color contrast for all text

---

#### US-003: Root Layout

**As a** developer  
**I need** the root layout to wrap all pages with shared structure  
**So that** header, footer, fonts, and metadata are consistent across the site

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** US-001, US-002

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: Root layout renders shared structure
  Given any page is rendered
  Then the layout should render a skip-to-content link as the first element
  And the layout should render the Header component
  And the layout should render the page content (children)
  And the layout should render the Footer component
  And all elements should be in the correct order

Scenario: Heading font is applied
  Given any page is rendered
  Then all h1 elements should use Playfair Display font
  And all h2 elements should use Playfair Display font
  And all h3 elements should use Playfair Display font

Scenario: Body font is applied
  Given any page is rendered
  Then all body text should use Inter font

Scenario: Default metadata is configured
  Given any page without specific metadata is rendered
  Then the page title should include "Casa Colina Care"
  And the meta description should be "Compassionate care home in Hawaii Kai"
  And Open Graph base tags should be present

Scenario: HTML lang attribute is set
  Given any page is rendered
  Then the <html> element should have lang="en" attribute

Scenario: LocalBusiness structured data is present
  Given any page is rendered
  Then the page should include JSON-LD structured data
  And the structured data should implement LocalBusiness schema
  And it should include business name, address, phone, and email

Scenario: Layout implementation location
  Given the root layout is implemented
  Then the layout file should exist at src/app/layout.tsx

Scenario: Tests and type checking pass
  Given the root layout implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

### 5.2 Home Page

#### US-004: Home Page — Hero Section

**As a** visitor landing on the site  
**I want** to see an impactful hero that communicates what Casa Colina Care
offers  
**So that** I immediately understand the value proposition and how to get in
touch

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** US-003

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: Home page route is accessible
  Given a visitor navigates to the root URL
  Then they should be served the page from src/app/page.tsx

Scenario: Hero section displays with full viewport height
  Given a visitor lands on the home page
  Then they should see a hero section
  And the hero section should be full viewport height
  And the hero section should have a gradient or styled background

Scenario: Hero heading displays correctly
  Given a visitor views the hero section
  Then they should see an h1 heading with the text "Compassionate Care in the Heart of Hawaii Kai"
  And the heading should use Playfair Display font

Scenario: Hero subheading displays
  Given a visitor views the hero section
  Then they should see a subheading
  And the subheading should be 20-30 words in length

Scenario: Primary CTA button navigation
  Given a visitor views the hero section
  When they click the "Request a Consultation" button
  Then they should be navigated to the /contact page
  And the button should have primary styling

Scenario: Secondary CTA button navigation
  Given a visitor views the hero section
  When they click the "Learn About Us" button
  Then they should be navigated to the /about page
  And the button should have outline styling

Scenario: Hero components are implemented
  Given the hero feature is complete
  Then the hero component should exist at src/components/sections/hero.tsx
  And the section heading component should exist at src/components/shared/section-heading.tsx
  And the section heading component should be reusable

Scenario: Hero is responsive on mobile
  Given a visitor views the hero on a mobile device
  Then the hero content should stack vertically

Scenario: Tests and type checking pass
  Given the hero implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

**Accessibility Requirements:**

- Single `h1` per page
- Sufficient color contrast (WCAG AA: 4.5:1 for normal text)
- CTA buttons have descriptive labels

---

#### US-005: Home Page — Introduction & Services Overview

**As a** visitor  
**I want** to learn what Casa Colina Care offers  
**So that** I can understand the services and decide if it's right for my loved
one

**Priority:** Must Have  
**Effort:** Large  
**Dependencies:** US-004

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
# Introduction Section
Scenario: Introduction section displays with two-column layout
  Given a visitor views the home page
  When they scroll to the introduction section
  Then they should see a two-column layout
  And the left column should contain an image placeholder
  And the right column should contain text content

Scenario: Introduction heading displays
  Given a visitor views the introduction section
  Then they should see an h2 heading with the text "Welcome to Casa Colina Care"

Scenario: Introduction content displays
  Given a visitor views the introduction section
  Then they should see 2-3 paragraphs about the facility

Scenario: Introduction link to About page
  Given a visitor views the introduction section
  When they click the "Read more about us" link
  Then they should be navigated to the /about page

Scenario: Introduction component is implemented
  Given the introduction feature is complete
  Then the intro component should exist at src/components/sections/intro.tsx

# Services Overview Section
Scenario: Services overview heading displays
  Given a visitor views the services overview section
  Then they should see an h2 heading with the text "How We Care for Your Family"

Scenario: Services display in responsive grid
  Given a visitor views the services overview section on desktop
  Then they should see four service cards in a 2x2 grid

Scenario: Services display in single column on mobile
  Given a visitor views the services overview section on mobile
  Then they should see four service cards in a single column

Scenario: Personalized Care Plans card displays correctly
  Given a visitor views the services overview section
  Then they should see a card titled "Personalized Care Plans"
  And the card should have a ClipboardList icon
  And the card should have an h3 heading
  And the card should display the description "Tailored care plans designed around each resident's unique needs and preferences"

Scenario: 24/7 Professional Support card displays correctly
  Given a visitor views the services overview section
  Then they should see a card titled "24/7 Professional Support"
  And the card should have a Shield icon
  And the card should display the description "Round-the-clock attention from trained, compassionate caregivers"

Scenario: Home-Cooked Meals card displays correctly
  Given a visitor views the services overview section
  Then they should see a card titled "Home-Cooked Meals"
  And the card should have a UtensilsCrossed icon
  And the card should display the description "Nutritious, island-inspired meals prepared fresh daily"

Scenario: Beautiful Surroundings card displays correctly
  Given a visitor views the services overview section
  Then they should see a card titled "Beautiful Surroundings"
  And the card should have a Palmtree icon
  And the card should display the description "Tropical gardens and a peaceful environment in Hawaii Kai"

Scenario: Services overview component is implemented
  Given the services overview feature is complete
  Then the services-overview component should exist at src/components/sections/services-overview.tsx

Scenario: Sections are added to home page
  Given the home page is complete
  Then the introduction section should appear below the hero
  And the services overview section should appear below the introduction

Scenario: Tests and type checking pass
  Given the introduction and services implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

**Accessibility Requirements:**

- Proper heading hierarchy (h2 → h3)
- Icons have `aria-hidden="true"` (decorative)
- Card content is keyboard accessible

---

#### US-006: Home Page — Testimonial, CTA Banner & Page Assembly

**As a** visitor  
**I want** to see social proof and a clear call-to-action  
**So that** I feel confident reaching out for a consultation

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** US-005

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
# Testimonial Section
Scenario: Testimonial section displays with warm sand background
  Given a visitor views the home page
  When they scroll to the testimonial section
  Then they should see a quote-style section
  And the background color should be warm sand (#F5E6D3)

Scenario: Testimonial content displays
  Given a visitor views the testimonial section
  Then they should see placeholder testimonial text
  And they should see attribution with name and relationship to resident

Scenario: Testimonial component is implemented
  Given the testimonial feature is complete
  Then the testimonial component should exist at src/components/sections/testimonial.tsx

# CTA Banner Section
Scenario: CTA banner heading displays
  Given a visitor views the CTA banner section
  Then they should see an h2 heading with the text "Schedule Your Visit Today"

Scenario: CTA banner phone number is clickable
  Given a visitor views the CTA banner
  When they click the phone number "+1 (800) 888-8888"
  Then their device should initiate a phone call

Scenario: CTA banner email is clickable
  Given a visitor views the CTA banner
  When they click the email "kriss@casacolinacare.com"
  Then their default email client should open

Scenario: CTA banner button navigation
  Given a visitor views the CTA banner
  When they click the "Request Consultation" button
  Then they should be navigated to the /contact page

Scenario: CTA banner component is reusable
  Given the CTA banner feature is complete
  Then the cta-banner component should exist at src/components/sections/cta-banner.tsx
  And the component should accept configurable heading and text props
  And the component should be reusable on About, FAQ, and Contact pages

# Page Assembly
Scenario: Home page renders all sections in correct order
  Given a visitor navigates to the home page
  Then they should see the Hero section first
  And they should see the Introduction section second
  And they should see the Services Overview section third
  And they should see the Testimonial section fourth
  And they should see the CTA Banner section fifth

Scenario: Home page metadata is configured
  Given a visitor navigates to the home page
  Then the page title should be "Casa Colina Care | Compassionate Care Home in Hawaii Kai"
  And the meta description should be "A warm, family-style care home facility in Hawaii Kai, Hawaii. Providing compassionate, personalized care in a beautiful tropical setting."

Scenario: Tests and type checking pass
  Given the home page assembly is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

---

### 5.3 About Us Page

#### US-007: About Us Page

**As a** visitor  
**I want** to learn about Casa Colina Care's story, values, and team  
**So that** I can trust them with my loved one's care

**Priority:** Must Have  
**Effort:** Large  
**Dependencies:** US-006

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: About page route is accessible
  Given a visitor navigates to /about
  Then they should be served the page from src/app/about/page.tsx

# Page Header Section
Scenario: Page header displays with title
  Given a visitor views the About page
  Then they should see an h1 heading with the text "About Casa Colina Care"
  And the header should be a shorter hero banner at 50% viewport height
  And the header should have a background image or gradient

# Our Story Section
Scenario: Our Story section displays
  Given a visitor views the About page
  When they scroll to the Our Story section
  Then they should see an h2 heading with the text "Our Story"
  And they should see 3-4 paragraphs about facility history, founding vision, and Hawaii Kai community roots

# Mission & Values Section
Scenario: Mission & Values heading displays
  Given a visitor views the Mission & Values section
  Then they should see an h2 heading with the text "Our Mission & Values"

Scenario: Mission & Values cards display in responsive grid
  Given a visitor views the Mission & Values section
  Then they should see four value cards in a responsive grid

Scenario: Aloha Spirit value card displays
  Given a visitor views the Mission & Values section
  Then they should see a card titled "Aloha Spirit"
  And the card should have an icon
  And the card should have an h3 heading
  And the card should display "Treating every resident with love and respect"

Scenario: Dignity & Independence value card displays
  Given a visitor views the Mission & Values section
  Then they should see a card titled "Dignity & Independence"
  And the card should display "Supporting autonomy and personal choice"

Scenario: Family First value card displays
  Given a visitor views the Mission & Values section
  Then they should see a card titled "Family First"
  And the card should display "Creating a true home, not an institution"

Scenario: Community Connection value card displays
  Given a visitor views the Mission & Values section
  Then they should see a card titled "Community Connection"
  And the card should display "Staying connected to Hawaii Kai"

# Meet Our Team Section
Scenario: Meet Our Team heading displays
  Given a visitor views the Meet Our Team section
  Then they should see an h2 heading with the text "Meet Our Team"

Scenario: Team member cards display
  Given a visitor views the Meet Our Team section
  Then they should see 3-4 placeholder team member cards in a responsive grid layout
  And each card should contain a photo placeholder (400x400px)
  And each card should contain a name
  And each card should contain a role/title
  And each card should contain a brief bio (100-150 words)

# CTA Banner
Scenario: CTA banner is reused on About page
  Given a visitor views the About page
  When they scroll to the bottom
  Then they should see the CTA banner component
  And the heading should be "Have Questions? We're Here to Help."
  And there should be a link to /contact

# Metadata
Scenario: About page metadata is configured
  Given a visitor navigates to the About page
  Then the page title should be "About Us | Casa Colina Care"
  And the meta description should be "Learn about Casa Colina Care, our mission, values, and the dedicated team providing compassionate care in Hawaii Kai."

Scenario: Tests and type checking pass
  Given the About page implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

### 5.4 FAQ Page

#### US-008: FAQ Page

**As a** visitor  
**I want** to browse frequently asked questions  
**So that** I can get answers without needing to call or email

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** US-007

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: FAQ page route is accessible
  Given a visitor navigates to /faq
  Then they should be served the page from src/app/faq/page.tsx

Scenario: FAQ page header displays
  Given a visitor views the FAQ page
  Then they should see an h1 heading with the text "Frequently Asked Questions"

Scenario: FAQ accordion uses Shadcn component
  Given a visitor views the FAQ page
  Then they should see an accordion component from Shadcn UI
  And the accordion should contain questions grouped by 4 categories

# General Category
Scenario: General category questions display
  Given a visitor views the FAQ page
  Then they should see a "General" category with 3 questions:
    | Question |
    | What type of care does Casa Colina Care provide? |
    | Where is Casa Colina Care located? |
    | What makes Casa Colina Care different from other care homes? |

# Admissions & Getting Started Category
Scenario: Admissions category questions display
  Given a visitor views the FAQ page
  Then they should see an "Admissions & Getting Started" category with 3 questions:
    | Question |
    | How do I begin the admissions process? |
    | Can I schedule a tour of the facility? |
    | What should I bring when my loved one moves in? |

# Daily Life Category
Scenario: Daily Life category questions display
  Given a visitor views the FAQ page
  Then they should see a "Daily Life" category with 3 questions:
    | Question |
    | What does a typical day look like for residents? |
    | Are family visits encouraged? |
    | What meals are provided? |

# Care & Services Category
Scenario: Care & Services category questions display
  Given a visitor views the FAQ page
  Then they should see a "Care & Services" category with 3 questions:
    | Question |
    | What level of care is available? |
    | Is there a nurse on staff? |
    | How do you handle medical emergencies? |

Scenario: Each question expands and collapses independently
  Given a visitor views the FAQ page
  When they click on a question
  Then that question should expand to show the answer
  And other questions should remain in their current state (expanded or collapsed)

Scenario: Placeholder answers are provided
  Given a visitor expands any FAQ question
  Then they should see a placeholder answer of 100-150 words

Scenario: CTA banner is reused on FAQ page
  Given a visitor views the FAQ page
  When they scroll to the bottom
  Then they should see the CTA banner component
  And the heading should be "Still Have Questions? Contact Us Directly."

Scenario: FAQ page metadata is configured
  Given a visitor navigates to the FAQ page
  Then the page title should be "Frequently Asked Questions | Casa Colina Care"
  And the meta description should be "Find answers to common questions about Casa Colina Care's services, admissions, and care home life in Hawaii Kai."

Scenario: Tests and type checking pass
  Given the FAQ page implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

**Accessibility Requirements:**

- Accordion uses proper ARIA attributes
- Keyboard navigation (Tab, Enter, Space)
- Screen reader announces expanded/collapsed state

---

### 5.5 Contact Page

#### US-009: Contact Page — Form Component

**As a** visitor  
**I want** to fill out a contact form  
**So that** I can request a consultation without needing to call

**Priority:** Must Have  
**Effort:** Large  
**Dependencies:** US-008

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: Contact form component is implemented
  Given the contact form feature is complete
  Then the contact-form component should exist at src/components/sections/contact-form.tsx

Scenario: Form uses Shadcn UI components
  Given a visitor views the contact form
  Then all form fields should use Shadcn Input, Textarea, and Label components

# Form Fields
Scenario: First Name field is displayed and validated
  Given a visitor views the contact form
  Then they should see a "First Name" field
  And the field should be marked as required
  And the field should accept 1-50 characters
  And the field should only accept letters, spaces, and hyphens

Scenario: Last Name field is displayed and validated
  Given a visitor views the contact form
  Then they should see a "Last Name" field
  And the field should be marked as required
  And the field should accept 1-50 characters
  And the field should only accept letters, spaces, and hyphens

Scenario: Email field is displayed and validated
  Given a visitor views the contact form
  Then they should see an "Email" field
  And the field should be marked as required
  And the field should validate RFC 5322 email format

Scenario: Phone field is displayed and validated
  Given a visitor views the contact form
  Then they should see a "Phone" field
  And the field should be optional
  When a phone number is provided
  Then formatting characters (spaces, parentheses, hyphens, dots) should be stripped
  And the stripped value should validate E.164 phone format

Scenario: Relationship field is displayed and validated
  Given a visitor views the contact form
  Then they should see a "Relationship to Resident" field
  And the field should be optional
  And the field should accept maximum 100 characters

Scenario: Message field is displayed and validated
  Given a visitor views the contact form
  Then they should see a "Message" textarea field
  And the field should be marked as required
  And the field should accept 1-2000 characters

Scenario: Submit button displays correct label
  Given a visitor views the contact form
  Then they should see a submit button labeled "Send Consultation Request"

# Client-side Validation
Scenario: Inline error messages display for invalid fields
  Given a visitor fills out the form with invalid data
  When they blur a field or attempt to submit
  Then they should see inline error messages for invalid or empty required fields

Scenario: Real-time validation on blur
  Given a visitor is filling out the form
  When they leave a field (blur event)
  Then the field should be validated immediately
  And any errors should be displayed

Scenario: Form prevents submission if validation fails
  Given a visitor has filled out the form with invalid data
  When they click the submit button
  Then the form should not be submitted
  And error messages should be displayed

# UI States
Scenario: Form displays idle state
  Given a visitor views the contact form
  Then the submit button should be enabled
  And all fields should be editable

Scenario: Form displays loading state during submission
  Given a visitor submits a valid form
  When the form is being processed
  Then the submit button should display a spinner and "Sending..." text
  And all form fields should be disabled

Scenario: Form displays success state after successful submission
  Given a visitor successfully submits the form
  Then they should see a green success message "Thank you! We'll be in touch soon."
  And the form fields should be cleared

Scenario: Form displays error state after failed submission
  Given a visitor's form submission fails
  Then they should see a red error message
  And the form data should be preserved

# Form Submission
Scenario: Form POSTs to API endpoint
  Given a visitor submits a valid form
  Then the form should POST to /api/contact
  And it should handle the JSON response

Scenario: Form uses React hooks for state management
  Given the contact form is implemented
  Then it should use useFormStatus hook
  And it should use useFormState hook

# Tests
Scenario: Tests and type checking pass
  Given the contact form implementation is complete
  When all tests are run
  Then all unit tests should pass
  And all integration tests should pass
  And TypeScript type checking should pass with no errors
```

**Validation Error Messages:**

```typescript
{
  firstName: {
    required: "First name is required",
    pattern: "Please enter a valid first name (letters, spaces, hyphens only)",
    maxLength: "First name must be 50 characters or less"
  },
  lastName: {
    required: "Last name is required",
    pattern: "Please enter a valid last name (letters, spaces, hyphens only)",
    maxLength: "Last name must be 50 characters or less"
  },
  email: {
    required: "Email is required",
    pattern: "Please enter a valid email address"
  },
  phone: {
    pattern: "Please enter a valid phone number"
  },
  relationship: {
    maxLength: "Relationship must be 100 characters or less"
  },
  message: {
    required: "Message is required",
    minLength: "Message must be at least 1 character",
    maxLength: "Message must be 2000 characters or less"
  }
}
```

**Accessibility Requirements:**

- All form fields have associated labels
- Error messages have `role="alert"`
- Focus management (first error field on validation failure)
- ARIA live regions for status messages

---

#### US-010: Contact Page — Info Column, Map & Page Assembly

**As a** visitor  
**I want** to see contact details and location alongside the form  
**So that** I can choose how to reach out

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** US-009

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: Contact page route is accessible
  Given a visitor navigates to /contact
  Then they should be served the page from src/app/contact/page.tsx

# Layout
Scenario: Desktop layout displays two columns
  Given a visitor views the contact page on desktop
  Then they should see a two-column layout
  And the form should be on the left at 60% width
  And the contact info should be on the right at 40% width

Scenario: Mobile layout stacks vertically
  Given a visitor views the contact page on mobile
  Then the layout should stack vertically
  And the form should appear above the contact info

# Right Column Content
Scenario: Phone number displays and is clickable
  Given a visitor views the contact info column
  Then they should see the phone number "+1 (800) 888-8888"
  When they click the phone number
  Then their device should initiate a phone call

Scenario: Email address displays and is clickable
  Given a visitor views the contact info column
  Then they should see the email "kriss@casacolinacare.com"
  When they click the email
  Then their default email client should open

Scenario: Address displays
  Given a visitor views the contact info column
  Then they should see the address "189 Anapalua Street, Hawaii Kai, HI 96825"

Scenario: Business hours display
  Given a visitor views the contact info column
  Then they should see "Available for inquiries: Monday-Saturday, 8am-6pm"

Scenario: Google Maps embed displays
  Given a visitor views the contact info column
  Then they should see a Google Maps iframe embed

Scenario: Map embed component is implemented
  Given the map feature is complete
  Then the map-embed component should exist at src/components/shared/map-embed.tsx

# Metadata
Scenario: Contact page metadata is configured
  Given a visitor navigates to the contact page
  Then the page title should be "Contact Us | Casa Colina Care"
  And the meta description should be "Get in touch with Casa Colina Care. Request a consultation, schedule a visit, or ask us any questions about our care home in Hawaii Kai."

# Tests
Scenario: Tests and type checking pass
  Given the contact page implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

---

#### US-011: Contact Form API Route & Resend Integration

**As the** business owner  
**I want** form submissions emailed to me via Resend  
**So that** I receive consultation requests reliably

**Priority:** Must Have  
**Effort:** Large  
**Dependencies:** US-010

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
Scenario: API route is implemented
  Given the contact API is complete
  Then the POST /api/contact route should exist at src/app/api/contact/route.ts

# Server-side Validation
Scenario: Server re-validates all fields using Zod
  Given the API receives a form submission
  Then it should re-validate all fields using Zod schema
  And it should validate firstName as required, 1-50 chars, pattern /^[a-zA-Z\s'-]+$/
  And it should validate lastName as required, 1-50 chars, pattern /^[a-zA-Z\s'-]+$/
  And it should validate email as required with valid email format
  And it should validate phone as optional, stripping formatting characters before validating E.164 format
  And it should validate relationship as optional with max 100 chars
  And it should validate message as required, 1-2000 chars

Scenario: API returns 400 for validation failures
  Given the API receives invalid form data
  When server-side validation fails
  Then it should return status 400
  And it should return {success: false, message: "..."}

# Email Sending
Scenario: API sends email via Resend for valid submissions
  Given the API receives valid form data
  Then it should send an HTML email via Resend
  And the email should be sent to kriss@casacolinacare.com
  And the From address should be "Casa Colina Care <onboarding@resend.dev>" in development
  And the From address should be "Casa Colina Care <noreply@casacolinacare.com>" in production
  And the Reply-To should be the submitter's email
  And the Subject should be "New Consultation Request from {firstName} {lastName}"
  And the Body should be HTML formatted with all form fields

Scenario: Email body builder is implemented
  Given the email feature is complete
  Then the email body builder should exist at src/lib/email.ts

Scenario: API returns 200 for successful submissions
  Given the API successfully sends an email
  Then it should return status 200
  And it should return {success: true, message: "Thank you! We'll be in touch soon."}

Scenario: API returns 500 for Resend failures
  Given the Resend API fails
  Then the API should return status 500
  And it should return {success: false, message: "Something went wrong. Please try again or call us directly."}

# Security
Scenario: Resend API key is stored securely
  Given the API is implemented
  Then the RESEND_API_KEY should be stored in environment variables only
  And it should never be exposed to the client

Scenario: Environment variables are documented
  Given the project is set up
  Then a .env.example file should exist
  And it should document all required environment variables

Scenario: Rate limiting is implemented
  Given the API is complete
  Then it should implement rate limiting
  And it should allow maximum 5 submissions per IP address per hour

Scenario: Honeypot field provides spam protection
  Given the form is implemented
  Then it should include a honeypot field for spam protection

Scenario: Form submissions are logged
  Given a form submission occurs
  Then the system should log the timestamp, IP address, and success/failure status

# Tests
Scenario: Tests and type checking pass
  Given the API implementation is complete
  When all tests are run
  Then all unit tests should pass
  And all integration tests should pass
  And TypeScript type checking should pass with no errors
```

**Email Template Structure:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>New Consultation Request</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h1 style="color: #0D7377;">New Consultation Request</h1>
    <p><strong>From:</strong> {firstName} {lastName}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Phone:</strong> {phone || 'Not provided'}</p>
    <p><strong>Relationship:</strong> {relationship || 'Not provided'}</p>
    <h2>Message:</h2>
    <p>{message}</p>
    <hr />
    <p style="font-size: 12px; color: #666;">
      Submitted on {timestamp} from IP {ipAddress}
    </p>
  </body>
</html>
```

#### US-012: SEO, Metadata & Structured Data

**As the** business owner  
**I want** proper SEO foundations  
**So that** the site can rank for "care home Hawaii Kai" and related searches

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** US-011

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
# Page Metadata
Scenario: All pages have SEO metadata
  Given any page is rendered
  Then it should include page-specific metadata with title and description
  And the metadata should follow the specifications in Section 10.1

# Open Graph Tags
Scenario: All pages have Open Graph tags
  Given any page is rendered
  Then it should include og:title tag
  And it should include og:description tag
  And it should include og:type tag set to "website"
  And it should include og:url tag
  And it should include og:image tag with facility photo

# Twitter Card Metadata
Scenario: All pages have Twitter Card metadata
  Given any page is rendered
  Then it should include twitter:card tag set to "summary_large_image"
  And it should include twitter:title tag
  And it should include twitter:description tag
  And it should include twitter:image tag

# Structured Data
Scenario: Root layout includes JSON-LD structured data
  Given the root layout is rendered
  Then it should include JSON-LD structured data
  And it should implement the LocalBusiness schema
  And it should include business name
  And it should include address
  And it should include phone number
  And it should include email address
  And it should include geo coordinates (21.2793° N, 157.7192° W)
  And it should include opening hours
  And it should include service area (Hawaii Kai, Honolulu)

# Robots.txt
Scenario: robots.txt is generated
  Given the robots.ts file is implemented at src/app/robots.ts
  When the site is built
  Then it should generate a robots.txt file
  And it should allow all crawlers
  And it should link to the sitemap

# Sitemap.xml
Scenario: sitemap.xml is generated with all pages
  Given the sitemap.ts file is implemented at src/app/sitemap.ts
  When the site is built
  Then it should generate a sitemap.xml file
  And it should include the home page (/) with priority 1.0 and changefreq weekly
  And it should include the about page (/about) with priority 0.8 and changefreq monthly
  And it should include the FAQ page (/faq) with priority 0.6 and changefreq monthly
  And it should include the contact page (/contact) with priority 0.9 and changefreq monthly

# Semantic HTML
Scenario: All pages use semantic HTML
  Given any page is rendered
  Then it should have a single h1 element
  And it should use sequential heading hierarchy (h2, h3)
  And it should use proper semantic elements (header, nav, main, footer, article, section)

Scenario: All pages have canonical URLs
  Given any page is rendered
  Then it should include a canonical URL tag

# Tests
Scenario: Tests and type checking pass
  Given the SEO implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

---

### 5.6 Additional User Stories

#### US-013: Error Pages (404, 500)

**As a** visitor  
**I want** helpful error pages  
**So that** I can navigate back to the site if I encounter an error

**Priority:** Should Have  
**Effort:** Small  
**Dependencies:** US-003

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
# 404 Page
Scenario: Custom 404 page is implemented
  Given the 404 page feature is complete
  Then the not-found page should exist at src/app/not-found.tsx

Scenario: 404 page displays helpful content
  Given a visitor navigates to a non-existent page
  Then they should see the heading "Page Not Found"
  And they should see the explanation "The page you're looking for doesn't exist."
  And they should see a link to the home page
  And they should see the navigation header
  And they should see the footer

# 500 Page
Scenario: Custom 500 page is implemented
  Given the 500 error page feature is complete
  Then the error page should exist at src/app/error.tsx

Scenario: 500 page displays helpful content
  Given a visitor encounters a server error
  Then they should see the heading "Something Went Wrong"
  And they should see the explanation "We're working to fix the issue."
  And they should see a link to the home page

Scenario: Error boundary is implemented
  Given the error page is implemented
  Then it should implement an error boundary
  And it should catch and handle React errors

# Tests
Scenario: Tests and type checking pass
  Given the error pages implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

---

#### US-014: Loading States & Skeleton Screens

**As a** visitor  
**I want** to see loading indicators  
**So that** I know the site is working when content is loading

**Priority:** Should Have  
**Effort:** Small  
**Dependencies:** US-003

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
# Loading UI Implementation
Scenario: Loading UI is implemented for each page
  Given the loading states feature is complete
  Then each page should have a loading.tsx file
  And the loading UI should be implemented using React Suspense

Scenario: Skeleton screens match page layout
  Given a visitor navigates to a page
  When the page is loading
  Then they should see a skeleton screen
  And the skeleton should match the page layout structure

Scenario: Smooth transition from loading to content
  Given a page is loading
  When the content finishes loading
  Then there should be a smooth transition from skeleton to content
  And there should be no layout shift

Scenario: Suspense boundaries are used appropriately
  Given the loading implementation is complete
  Then Suspense boundaries should be used for async components
  And loading states should be granular where appropriate

# Tests
Scenario: Tests and type checking pass
  Given the loading states implementation is complete
  When all tests are run
  Then all tests should pass
  And TypeScript type checking should pass with no errors
```

---

#### US-015: Browser Compatibility Testing

**As a** visitor  
**I want** the site to work on my browser  
**So that** I can access information regardless of my device

**Priority:** Must Have  
**Effort:** Medium  
**Dependencies:** All previous US

**Acceptance Criteria (Gherkin/BDD):**

```gherkin
# Desktop Browser Testing
Scenario: Site is tested on Chrome
  Given the site is deployed
  When tested on the last 2 versions of Chrome
  Then all features should work correctly
  And there should be no critical bugs

Scenario: Site is tested on Firefox
  Given the site is deployed
  When tested on the last 2 versions of Firefox
  Then all features should work correctly
  And there should be no critical bugs

Scenario: Site is tested on Safari
  Given the site is deployed
  When tested on the last 2 versions of Safari
  Then all features should work correctly
  And there should be no critical bugs

Scenario: Site is tested on Edge
  Given the site is deployed
  When tested on the last 2 versions of Edge
  Then all features should work correctly
  And there should be no critical bugs

# Mobile Browser Testing
Scenario: Site is tested on iOS Safari
  Given the site is deployed
  When tested on iOS Safari (iOS 14+)
  Then all features should work correctly
  And there should be no critical bugs
  And touch interactions should work properly

Scenario: Site is tested on Android Chrome
  Given the site is deployed
  When tested on Android Chrome (Android 10+)
  Then all features should work correctly
  And there should be no critical bugs
  And touch interactions should work properly

# Cross-browser Compatibility
Scenario: No critical bugs on supported browsers
  Given the site has been tested on all supported browsers
  Then there should be no critical bugs that prevent core functionality
  And any minor issues should be documented

Scenario: Graceful degradation for unsupported browsers
  Given a visitor uses an unsupported browser
  Then the site should still display content
  And core functionality should remain accessible
  And a message may inform the user about limited support
```

---

## 6. Functional Requirements (EARS Notation)

**EARS Template Key:**

- **Ubiquitous:** The system shall [requirement]
- **Event-driven:** WHEN [trigger], the system shall [requirement]
- **Unwanted behavior:** IF [condition], THEN the system shall [requirement]
- **State-driven:** WHILE [state], the system shall [requirement]
- **Optional:** WHERE [feature is included], the system shall [requirement]

### 6.1 Navigation & Layout

- **FR-1:** The system shall display a sticky header on all pages containing the
  text-based logo "Casa Colina Care", navigation links (Home, About Us, FAQ,
  Contact), and a "Request Consultation" CTA button.

- **FR-2:** WHEN the viewport width is below 768px, the system shall collapse
  navigation links into a hamburger menu icon that opens a Shadcn Sheet-based
  mobile menu.

- **FR-3:** WHEN a visitor clicks the "Request Consultation" button from any
  page, the system shall navigate to the `/contact` route.

- **FR-4:** The system shall render a footer on all pages containing the
  business name, address, phone number as a clickable `tel:` link, email as a
  clickable `mailto:` link, navigation links, and copyright notice with dynamic
  year.

- **FR-5:** The system shall use Next.js `<Link>` components for all internal
  navigation without client-side SPA routing behavior.

- **FR-6:** The system shall provide a skip-to-content link as the first
  focusable element on every page for accessibility.

### 6.2 Page Content

- **FR-7:** The Home page shall display the following sections in order: Hero,
  Introduction, Services Overview, Testimonial, and CTA Banner.

- **FR-8:** The About page shall display the following sections in order: Page
  Header, Our Story, Mission & Values, Meet Our Team, and CTA Banner.

- **FR-9:** The FAQ page shall display questions grouped by category within a
  Shadcn Accordion component with expand/collapse behavior.

- **FR-10:** WHEN the Contact page is viewed on desktop viewports, the system
  shall display the contact form on the left (60% width) and contact information
  with Google Maps on the right (40% width). WHEN viewed on mobile viewports,
  the system shall stack the form above the contact information.

- **FR-11:** The system shall render all phone numbers as clickable `tel:` links
  on every page.

- **FR-12:** The system shall render all email addresses as clickable `mailto:`
  links on every page.

### 6.3 Contact Form & Email

- **FR-13:** WHEN a visitor attempts to submit the contact form, the system
  shall validate all required fields client-side and display inline error
  messages for invalid or empty fields.

- **FR-14:** The contact form shall display distinct UI states: idle (button
  enabled), loading (spinner with "Sending..." text and disabled fields),
  success (green message "Thank you! We'll be in touch soon." with cleared
  form), and error (red error message with preserved form data).

- **FR-15:** The contact form shall use React's `useFormStatus` and
  `useFormState` hooks for state management.

- **FR-16:** WHEN the `POST /api/contact` endpoint receives a request, the
  system shall re-validate all fields server-side using Zod schema validation
  before processing.

- **FR-17:** WHEN the `POST /api/contact` endpoint receives valid form data, the
  system shall send an HTML-formatted email via Resend containing all form
  fields to kriss@casacolinacare.com.

- **FR-18:** The system shall store the Resend API key server-side only and
  shall never expose it to the client.

- **FR-19:** IF either client-side or server-side validation fails, THEN the
  system shall prevent form submission.

- **FR-20:** The system shall implement rate limiting that restricts form
  submissions to a maximum of 5 submissions per IP address per hour.

- **FR-21:** The system shall include a honeypot field in the contact form for
  spam protection.

- **FR-22:** WHEN a form submission occurs, the system shall log the timestamp,
  IP address, and success/failure status for monitoring purposes.

- **FR-23:** WHEN JavaScript is disabled in the visitor's browser, the system
  shall display phone number and email address as fallback contact methods.

### 6.4 SEO & Metadata

- **FR-24:** The system shall include SEO metadata, Open Graph tags, and Twitter
  Card metadata on all pages.

- **FR-25:** The root layout shall include JSON-LD structured data implementing
  the LocalBusiness schema with business name, address, phone, email, geo
  coordinates, opening hours, and service area.

- **FR-26:** The system shall generate a `robots.txt` file that allows all
  crawlers and links to the sitemap.

- **FR-27:** The system shall generate a `sitemap.xml` file containing all 4
  pages (Home, About, FAQ, Contact) with appropriate priority and changefreq
  values.

- **FR-28:** The system shall include canonical URLs on all pages.

- **FR-29:** The system shall use semantic HTML with a single `h1` element per
  page and sequential heading hierarchy (`h2`, `h3`) throughout.

- **FR-30:** The system shall provide descriptive alt text for all images.

### 6.5 Architecture & Code Quality

- **FR-31:** WHERE client interactivity is not required, the system shall
  implement components as React Server Components.

- **FR-32:** The system shall use the `@/` path alias for all imports from the
  `src/` directory.

- **FR-33:** WHERE components are route-specific, the system shall co-locate
  them in `_components` folders within the route directory.

- **FR-34:** The system shall implement all data mutations using Server Actions
  with Zod schema validation.

- **FR-35:** The system shall pass TypeScript strict mode type checking for all
  code.

- **FR-36:** The system shall pass ESLint validation with all 9 configured
  plugins for all code.

- **FR-37:** The system shall format all code using Prettier with the Tailwind
  plugin enabled.

---

## 7. Non-Functional Requirements (EARS Notation)

### 7.1 Performance

- **NFR-1:** WHEN measured using Chrome DevTools Lighthouse, the system shall
  achieve a Performance score greater than 90.

- **NFR-2:** WHEN accessed via 4G mobile connection, the system shall achieve
  Time to First Meaningful Paint of less than 3 seconds.

- **NFR-3:** The system shall maintain a Cumulative Layout Shift (CLS) score of
  less than 0.1.

- **NFR-4:** The system shall achieve First Contentful Paint (FCP) of less than
  1.8 seconds.

- **NFR-5:** The system shall achieve Largest Contentful Paint (LCP) of less
  than 2.5 seconds.

- **NFR-6:** The system shall optimize all images to WebP format with maximum
  file size of 200KB.

- **NFR-7:** The system shall load all fonts via Next.js `next/font`
  optimization to prevent layout shift.

- **NFR-8:** The system shall implement code splitting and lazy loading for
  optimal performance.

### 7.2 Accessibility

- **NFR-9:** WHEN measured using Chrome DevTools Lighthouse, the system shall
  achieve an Accessibility score greater than 90.

- **NFR-10:** The system shall comply with WCAG 2.1 Level AA standards.

- **NFR-11:** The system shall provide minimum 44x44 pixel touch targets for all
  interactive elements.

- **NFR-12:** The system shall maintain color contrast ratio of at least 4.5:1
  for normal text and 3:1 for large text.

- **NFR-13:** The system shall enable full keyboard navigation for all forms.

- **NFR-14:** The system shall provide descriptive alt text for all images.

- **NFR-15:** The system shall be fully navigable using keyboard only (no mouse
  required).

- **NFR-16:** The system shall be compatible with screen readers including NVDA,
  JAWS, and VoiceOver.

- **NFR-17:** The system shall display visible focus indicators on all
  interactive elements.

### 7.3 Security

- **NFR-18:** The system shall enforce HTTPS for all connections.

- **NFR-19:** The system shall implement Content Security Policy (CSP) headers.

- **NFR-20:** The system shall never expose API keys to the client.

- **NFR-21:** WHEN receiving user input, the system shall sanitize all input to
  prevent XSS attacks.

- **NFR-22:** The contact form shall implement CSRF protection.

- **NFR-23:** The system shall implement rate limiting on all API routes.

- **NFR-24:** The system shall secure all environment variables and shall never
  commit them to version control.

### 7.4 Browser & Device Support

- **NFR-25:** The system shall support the last 2 versions of Chrome, Firefox,
  Safari, and Edge browsers.

- **NFR-26:** The system shall support iOS Safari on iOS 14 and later versions.

- **NFR-27:** The system shall support Android Chrome on Android 10 and later
  versions.

- **NFR-28:** The system shall be fully responsive across viewport widths from
  320px to 2560px.

- **NFR-29:** WHEN viewed on tablet devices (768px-1279px viewport width), the
  system shall provide tablet-optimized layouts.

- **NFR-30:** The system shall include a print stylesheet for printable pages.

### 7.5 Scalability

- **NFR-31:** The system shall handle 1000 concurrent visitors without
  degradation.

- **NFR-32:** The contact form API shall handle at least 100 submissions per
  day.

- **NFR-33:** The system shall use Vercel Edge Network for global CDN
  distribution.

- **NFR-34:** The system shall cache static pages at the edge for optimal
  performance.

---

## 8. Technical Specifications

### 8.1 Tech Stack

| Layer          | Technology           | Version  | Purpose                         |
| -------------- | -------------------- | -------- | ------------------------------- |
| Framework      | Next.js (App Router) | 15.4.2   | React framework with SSR/SSG    |
| Language       | TypeScript           | 5.x      | Type safety                     |
| UI Library     | React                | 19.1.0   | Component library               |
| Styling        | Tailwind CSS         | 3.4.17   | Utility-first CSS               |
| UI Components  | shadcn/ui            | latest   | Accessible component primitives |
| Icons          | Lucide React         | 0.563.0  | Icon library                    |
| Email Delivery | Resend               | 3.0.0+   | Transactional email API         |
| Validation     | Zod                  | 3.22.0+  | Schema validation               |
| Fonts          | next/font            | Built-in | Font optimization               |
| Testing (Unit) | Vitest               | 3.2.4    | Unit test runner                |
| Testing (E2E)  | Playwright           | 1.54.1   | End-to-end testing              |
| Linting        | ESLint               | 9.x      | Code linting                    |
| Formatting     | Prettier             | 3.6.2    | Code formatting                 |

### 8.2 Architecture Patterns

**Server-First Architecture:**

- All components are React Server Components by default
- Client Components (`"use client"`) only when needed for:
  - Event handlers (onClick, onChange, onSubmit)
  - Browser APIs (window, document, localStorage)
  - React hooks (useState, useEffect, useContext)
  - Third-party libraries requiring client-side execution

**Component Hierarchy:**

```
src/components/
├── ui/                    # Universal, stateless UI primitives (Button, Input, Card)
├── layout/                # Major structural components (Header, Footer, MobileNav)
├── sections/              # Page sections (Hero, Intro, ServicesOverview, CTABanner)
└── shared/                # Reusable components (SectionHeading, MapEmbed)

src/app/[route]/_components/  # Route-specific components (co-located)
```

**Data Fetching Strategy:**

1. Server Components with `async/await` for initial page data
2. Server Actions for mutations (create, update, delete)
3. Route Handlers for webhooks and external APIs
4. Client-side fetching only for dynamic, user-specific data

**State Management Hierarchy:**

1. URL State (search params) - for shareable state
2. Server Components - for initial data
3. Local State (`useState`) - for component-specific state
4. React Context - for small subtree state
5. Zustand - for global state (not needed for this project)

### 8.3 Form Validation Rules

**Client-Side Validation (Zod Schema):**

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less')
    .regex(/^[a-zA-Z\s'-]+$/, 'Please enter a valid first name'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less')
    .regex(/^[a-zA-Z\s'-]+$/, 'Please enter a valid last name'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .transform(val => val.replace(/[\s()\-\.]/g, ''))
    .refine(
      val => /^\+?[1-9]\d{1,14}$/.test(val),
      'Please enter a valid phone number',
    )
    .optional(),

  relationship: z
    .string()
    .max(100, 'Relationship must be 100 characters or less')
    .optional(),

  message: z
    .string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be 2000 characters or less'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Server-Side Validation:**

- Re-validate all fields using the same Zod schema
- Never trust client-side validation alone
- Return 400 Bad Request with specific error messages

### 8.4 API Contract

**POST `/api/contact`**

**Request:**

```typescript
{
  firstName: string;      // required, 1-50 chars
  lastName: string;       // required, 1-50 chars
  email: string;          // required, valid email
  phone?: string;         // optional, valid phone if provided
  relationship?: string;  // optional, max 100 chars
  message: string;        // required, 1-2000 chars
}
```

**Success Response (200):**

```typescript
{
  success: true,
  message: "Thank you! We'll be in touch soon."
}
```

**Validation Error (400):**

```typescript
{
  success: false,
  message: "Please provide a valid email address.",
  errors?: {
    [field: string]: string[];
  }
}
```

**Server Error (500):**

```typescript
{
  success: false,
  message: "Something went wrong. Please try again or call us directly."
}
```

**Rate Limit Error (429):**

```typescript
{
  success: false,
  message: "Too many requests. Please try again later."
}
```

### 8.5 Email Template Specification

**HTML Email Structure:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Consultation Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: #0d7377;
        border-bottom: 2px solid #0d7377;
        padding-bottom: 10px;
      }
      .field {
        margin-bottom: 15px;
      }
      .label {
        font-weight: bold;
        color: #555;
      }
      .value {
        color: #333;
      }
      .footer {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>New Consultation Request</h1>

      <div class="field">
        <span class="label">Name:</span>
        <span class="value">{firstName} {lastName}</span>
      </div>

      <div class="field">
        <span class="label">Email:</span>
        <span class="value"><a href="mailto:{email}">{email}</a></span>
      </div>

      <div class="field">
        <span class="label">Phone:</span>
        <span class="value">{phone || 'Not provided'}</span>
      </div>

      <div class="field">
        <span class="label">Relationship to Resident:</span>
        <span class="value">{relationship || 'Not provided'}</span>
      </div>

      <div class="field">
        <span class="label">Message:</span>
        <div class="value">{message}</div>
      </div>

      <div class="footer">
        <p>Submitted on {timestamp}</p>
        <p>IP Address: {ipAddress}</p>
      </div>
    </div>
  </body>
</html>
```

**Plain Text Fallback:**

```
New Consultation Request

Name: {firstName} {lastName}
Email: {email}
Phone: {phone || 'Not provided'}
Relationship: {relationship || 'Not provided'}

Message:
{message}

---
Submitted on {timestamp}
IP Address: {ipAddress}
```

### 8.6 SEO Implementation Details

**JSON-LD Structured Data (LocalBusiness):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Casa Colina Care",
  "description": "Compassionate care home in Hawaii Kai, Hawaii",
  "url": "https://casacolinacare.com",
  "telephone": "+18008888888",
  "email": "kriss@casacolinacare.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "189 Anapalau Street",
    "addressLocality": "Hawaii Kai",
    "addressRegion": "HI",
    "postalCode": "96825",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.2793",
    "longitude": "-157.7192"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "Hawaii Kai"
  },
  "priceRange": "$$"
}
```

**Meta Tags Template:**

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Casa Colina Care',
  description: 'Page description (150-160 characters)',
  keywords: ['care home', 'Hawaii Kai', 'assisted living', 'senior care'],
  authors: [{ name: 'Casa Colina Care' }],
  openGraph: {
    title: 'Page Title | Casa Colina Care',
    description: 'Page description',
    url: 'https://casacolinacare.com/page',
    siteName: 'Casa Colina Care',
    images: [
      {
        url: 'https://casacolinacare.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Casa Colina Care facility',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | Casa Colina Care',
    description: 'Page description',
    images: ['https://casacolinacare.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### 8.7 Environment Variables

**.env.example:**

```bash
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://casacolinacare.com

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...

# Rate Limiting (optional)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=3600000

# Development Only
NODE_ENV=development
```

**.env.local (not committed):**

```bash
RESEND_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 9. Content Specifications

### 9.1 Copy Requirements

**Tone & Voice Guidelines:**

- **Warm & Compassionate:** Use empathetic language that acknowledges family
  concerns
- **Professional & Trustworthy:** Demonstrate expertise without being clinical
- **Conversational:** Write as if speaking to a concerned family member
- **Action-Oriented:** Clear calls-to-action throughout
- **Inclusive:** Use "we" and "our" to create partnership feeling

**Word Count Targets:**

- Hero tagline: 20-30 words
- Section introductions: 50-100 words
- Service descriptions: 30-50 words each
- Team bios: 100-150 words each
- FAQ answers: 100-150 words each

**Placeholder Content Examples:**

**Hero Tagline:** "A warm, family-style care home where your loved one receives
personalized attention in the heart of Hawaii Kai's beautiful community."

**Welcome Section:** "At Casa Colina Care, we understand that choosing a care
home for your loved one is one of life's most important decisions. Our
family-style facility provides compassionate, personalized care in a warm,
non-institutional setting. Located in the heart of Hawaii Kai, we combine
professional healthcare with the Aloha Spirit, ensuring every resident feels at
home."

### 9.2 Image Requirements

| Image Type        | Dimensions | Format    | Max Size | Alt Text Required | Priority |
| ----------------- | ---------- | --------- | -------- | ----------------- | -------- |
| Hero Background   | 1920x1080  | WebP/JPEG | 200KB    | Yes               | Critical |
| Facility Exterior | 1200x800   | WebP/JPEG | 150KB    | Yes               | High     |
| Common Areas      | 1200x800   | WebP/JPEG | 150KB    | Yes               | High     |
| Resident Rooms    | 1200x800   | WebP/JPEG | 150KB    | Yes               | High     |
| Gardens/Outdoor   | 1200x800   | WebP/JPEG | 150KB    | Yes               | High     |
| Team Photos       | 400x400    | WebP/JPEG | 50KB     | Yes               | Medium   |
| Service Icons     | SVG        | SVG       | N/A      | Yes               | High     |
| Logo              | SVG + PNG  | SVG/PNG   | 50KB     | Yes               | Critical |
| Favicon           | Multiple   | PNG/ICO   | 10KB     | No                | Critical |
| OG Image          | 1200x630   | JPEG      | 100KB    | Yes               | High     |

**Image Optimization Requirements:**

- All photos must be converted to WebP format with JPEG fallback
- Use Next.js `<Image>` component for automatic optimization
- Implement lazy loading for below-the-fold images
- Provide responsive image sizes (srcset)
- Include descriptive alt text for accessibility

**Alt Text Guidelines:**

- Describe what's in the image, not just "photo" or "image"
- Include relevant context (location, activity, people)
- Keep under 125 characters
- Don't start with "Image of" or "Photo of"

**Examples:**

- Good: "Residents enjoying afternoon tea in the sunlit common room"
- Bad: "Photo of common room"

### 9.3 FAQ Content

**Category: General**

1. **What type of care does Casa Colina Care provide?** "Casa Colina Care is a
   residential care home providing personalized assisted living services. We
   offer 24/7 professional care in a warm, family-style environment. Our
   services include assistance with daily activities, medication management,
   nutritious meals, and engaging social activities. We specialize in creating
   individualized care plans that respect each resident's preferences and
   maintain their dignity and independence."

2. **Where is Casa Colina Care located?** "We're located at 189 Anapalau Street
   in the heart of Hawaii Kai, one of Oahu's most beautiful and peaceful
   neighborhoods. Our facility is easily accessible from downtown Honolulu and
   surrounded by tropical gardens, offering residents a serene environment while
   remaining close to medical facilities and family."

3. **What makes Casa Colina Care different from other care homes?** "Unlike
   large institutional facilities, Casa Colina Care offers a true home
   environment with personalized attention. Our small resident-to-caregiver
   ratio ensures everyone receives individualized care. We embrace the Aloha
   Spirit in everything we do, treating residents as family members. Our
   beautiful Hawaii Kai location provides a peaceful, tropical setting that
   promotes wellbeing and happiness."

**Category: Admissions & Getting Started**

4. **How do I begin the admissions process?** "Starting is easy. First, contact
   us to schedule a tour of our facility. During your visit, you'll meet our
   team, see our home, and discuss your loved one's specific needs. We'll review
   our services and answer all your questions. If Casa Colina Care feels like
   the right fit, we'll guide you through the paperwork and help plan a smooth
   transition. The entire process typically takes 1-2 weeks."

5. **Can I schedule a tour of the facility?** "Absolutely! We encourage families
   to visit and see our home firsthand. Tours are available Monday through
   Saturday between 9am and 5pm. You can schedule a tour by calling us at (800)
   888-8888 or using our contact form. We recommend scheduling in advance to
   ensure a team member is available to give you a comprehensive tour and answer
   all your questions."

6. **What should I bring when my loved one moves in?** "We recommend bringing
   personal items that make your loved one feel at home: favorite photos,
   comfortable clothing, toiletries, and any special items that bring comfort.
   We provide all furniture, linens, and medical equipment. We'll provide a
   detailed checklist during the admissions process. Most importantly, bring
   items that reflect your loved one's personality and interests."

**Category: Daily Life**

7. **What does a typical day look like for residents?** "Each day is structured
   yet flexible to accommodate individual preferences. Mornings begin with
   assistance getting ready and a nutritious breakfast. Days include social
   activities, exercise programs, outdoor time in our gardens, and opportunities
   for hobbies. We serve three home-cooked meals plus snacks. Evenings feature
   relaxation time, entertainment, and family visits. Our schedule balances
   structure with the freedom to pursue personal interests."

8. **Are family visits encouraged?** "Yes! Family involvement is essential to
   our residents' happiness. Families are welcome to visit anytime during our
   open hours (8am-8pm daily). We encourage you to join us for meals,
   activities, or simply spend quality time together. We also host family events
   throughout the year. Many families visit weekly, and we provide comfortable
   spaces for private family time."

9. **What meals are provided?** "We serve three delicious, home-cooked meals
   daily, plus morning and afternoon snacks. Our menu features island-inspired
   cuisine using fresh, local ingredients when possible. We accommodate dietary
   restrictions, preferences, and medical requirements. Meals are served
   family-style in our dining room, promoting social interaction. Special
   occasion meals and holiday celebrations make dining a highlight of each day."

**Category: Care & Services**

10. **What level of care is available?** "We provide comprehensive assisted
    living care, including help with daily activities (bathing, dressing,
    mobility), medication management, and health monitoring. Our trained
    caregivers are available 24/7. We coordinate with physicians and specialists
    for medical appointments. While we don't provide skilled nursing care, we
    work closely with healthcare providers to ensure residents receive
    appropriate medical attention when needed."

11. **Is there a nurse on staff?** "Yes, we have licensed nursing staff who
    oversee medication management, health monitoring, and coordinate with
    physicians. While not all caregivers are nurses, our team includes licensed
    professionals who ensure medical needs are met. We maintain detailed health
    records and communicate regularly with residents' doctors. For emergencies,
    we have protocols in place and are located near major medical facilities."

12. **How do you handle medical emergencies?** "We have comprehensive emergency
    protocols and staff trained in first aid and CPR. In case of emergency, we
    immediately contact 911 and the resident's designated family contact. We're
    located minutes from major medical facilities. We maintain detailed medical
    information for each resident and coordinate with emergency responders. Our
    priority is always the resident's safety and wellbeing, and we keep families
    informed throughout any medical situation."

### 9.4 Testimonials (Placeholder)

**Testimonial 1:** "Casa Colina Care gave our family peace of mind. Mom receives
wonderful care in a beautiful setting, and the staff treats her like family. We
couldn't have asked for a better place." — Sarah M., Daughter of Resident

**Testimonial 2:** "The Aloha Spirit is real here. Dad is happier and healthier
than he's been in years. The personalized attention and beautiful surroundings
make all the difference." — James K., Son of Resident

**Testimonial 3:** "After visiting several facilities, Casa Colina Care stood
out immediately. It truly feels like a home, not an institution. The staff's
compassion and professionalism are exceptional." — Linda T., Daughter of
Resident

---

## 10. Design Specifications

### 10.1 Page Metadata

| Page    | Title                                                     | Description (150-160 chars)                                                                                                                |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Home    | Casa Colina Care \| Compassionate Care Home in Hawaii Kai | A warm, family-style care home facility in Hawaii Kai, Hawaii. Providing compassionate, personalized care in a beautiful tropical setting. |
| About   | About Us \| Casa Colina Care                              | Learn about Casa Colina Care, our mission, values, and the dedicated team providing compassionate care in Hawaii Kai.                      |
| FAQ     | Frequently Asked Questions \| Casa Colina Care            | Find answers to common questions about Casa Colina Care's services, admissions, and care home life in Hawaii Kai.                          |
| Contact | Contact Us \| Casa Colina Care                            | Get in touch with Casa Colina Care. Request a consultation, schedule a visit, or ask us any questions about our care home in Hawaii Kai.   |

### 10.2 Brand Theme (Detailed)

**Color Palette:**

```css
:root {
  /* Primary Colors */
  --primary: #0d7377; /* Ocean Teal */
  --primary-foreground: #ffffff;
  --primary-hover: #0a5c5f;

  /* Secondary Colors */
  --secondary: #f5e6d3; /* Warm Sand */
  --secondary-foreground: #1a1a2e;

  /* Accent Colors */
  --accent: #e07a5f; /* Sunset Coral */
  --accent-foreground: #ffffff;
  --accent-hover: #c96a4f;

  /* Neutral Colors */
  --background: #fafaf7; /* Ivory */
  --foreground: #1a1a2e; /* Deep Charcoal */
  --muted: #e8ede6; /* Soft Sage */
  --muted-foreground: #6b7280;

  /* Semantic Colors */
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
  --info: #3b82f6;

  /* Border & Dividers */
  --border: #e2e8f0;
  --ring: #0d7377;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

**Typography Scale:**

```css
/* Headings (Playfair Display) */
h1 {
  font-size: 3.75rem;
  line-height: 1.2;
  font-weight: 700;
} /* 60px */
h2 {
  font-size: 3rem;
  line-height: 1.25;
  font-weight: 700;
} /* 48px */
h3 {
  font-size: 2.25rem;
  line-height: 1.3;
  font-weight: 600;
} /* 36px */
h4 {
  font-size: 1.875rem;
  line-height: 1.4;
  font-weight: 600;
} /* 30px */
h5 {
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
} /* 24px */
h6 {
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 600;
} /* 20px */

/* Body Text (Inter) */
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75;
} /* 20px */
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75;
} /* 18px */
.text-base {
  font-size: 1rem;
  line-height: 1.5;
} /* 16px */
.text-sm {
  font-size: 0.875rem;
  line-height: 1.5;
} /* 14px */
.text-xs {
  font-size: 0.75rem;
  line-height: 1.5;
} /* 12px */
```

**Spacing System (4px base unit):**

```css
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
--spacing-16: 4rem; /* 64px */
--spacing-20: 5rem; /* 80px */
--spacing-24: 6rem; /* 96px */
```

**Border Radius:**

```css
--radius-sm: 0.375rem; /* 6px */
--radius-md: 0.5rem; /* 8px - buttons, inputs */
--radius-lg: 0.75rem; /* 12px - cards */
--radius-xl: 1rem; /* 16px */
--radius-full: 9999px; /* Fully rounded */
```

### 10.3 Component Specifications

**Button Variants:**

```typescript
// Primary Button
className="bg-primary text-primary-foreground hover:bg-primary-hover
           px-6 py-3 rounded-md font-medium transition-colors
           min-h-[44px] min-w-[44px]"

// Secondary Button (Outline)
className="border-2 border-primary text-primary hover:bg-primary
           hover:text-primary-foreground px-6 py-3 rounded-md
           font-medium transition-colors min-h-[44px] min-w-[44px]"

// Accent Button
className="bg-accent text-accent-foreground hover:bg-accent-hover
           px-6 py-3 rounded-md font-medium transition-colors
           min-h-[44px] min-w-[44px]"
```

**Card Styles:**

```typescript
className="bg-white rounded-lg shadow-md p-6 border border-border
           hover:shadow-lg transition-shadow"
```

**Form Input States:**

```typescript
// Default
className="border border-border rounded-md px-4 py-2 focus:ring-2
           focus:ring-primary focus:border-primary"

// Error
className="border border-error rounded-md px-4 py-2 focus:ring-2
           focus:ring-error focus:border-error"

// Disabled
className="border border-border rounded-md px-4 py-2 bg-muted
           cursor-not-allowed opacity-50"
```

### 10.4 Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '320px', // Mobile devices
  tablet: '768px', // Tablets
  desktop: '1280px', // Desktop
  wide: '1920px', // Large desktop
  ultrawide: '2560px', // Ultra-wide displays
};
```

**Layout Grid:**

- Container max-width: 1280px
- Grid columns: 12-column system
- Gutter width: 24px (desktop), 16px (mobile)
- Padding: 24px (desktop), 16px (mobile)

### 10.5 Animation Guidelines

**Transition Durations:**

- Fast: 150ms (hover states, focus)
- Normal: 300ms (modals, dropdowns)
- Slow: 500ms (page transitions)

**Easing Functions:**

- Default: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- Enter: `cubic-bezier(0, 0, 0.2, 1)` (ease-out)
- Exit: `cubic-bezier(0.4, 0, 1, 1)` (ease-in)

**Animation Examples:**

```css
/* Button Hover */
transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Modal Open */
transition:
  opacity 300ms cubic-bezier(0, 0, 0.2, 1),
  transform 300ms cubic-bezier(0, 0, 0.2, 1);

/* Mobile Menu Slide */
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 11. Testing Strategy

### 11.1 TDD Workflow (Red-Green-Refactor)

**All new features MUST follow the Test-Driven Development cycle:**

1. **RED Phase:** Write a failing test that defines desired behavior
2. **GREEN Phase:** Write minimum code to make the test pass
3. **REFACTOR Phase:** Improve code quality without changing behavior

**TDD Benefits:**

- Forces clear requirements before implementation
- Creates living documentation
- Enables confident refactoring
- Reduces bugs and technical debt
- Improves code design (modularity, testability)

### 11.2 Testing Pyramid

```
        /\
       /  \
      / E2E \          10% - Critical user journeys
     /______\
    /        \
   / Integration \     30% - Multi-component flows
  /______________\
 /                \
/   Unit Tests     \   60% - Individual components/functions
/____________________\
```

**Coverage Targets:**

- Overall: 60% minimum
- Critical paths (contact form, navigation): 80%+
- Utility functions: 90%+

### 11.3 Unit Testing with Vitest

**Test File Organization:**

```
tests/unit/
├── components/
│   ├── layout/
│   │   ├── header.test.tsx
│   │   ├── footer.test.tsx
│   │   └── mobile-nav.test.tsx
│   ├── sections/
│   │   ├── hero.test.tsx
│   │   ├── contact-form.test.tsx
│   │   └── cta-banner.test.tsx
│   └── shared/
│       ├── section-heading.test.tsx
│       └── map-embed.test.tsx
├── lib/
│   ├── email.test.ts
│   └── validators.test.ts
└── utils/
    ├── formatters.test.ts
    └── validators.test.ts
```

**Component Testing Pattern:**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ContactForm from '@/components/sections/contact-form';

describe('ContactForm', () => {
  it('should render all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('should show validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

**React Testing Library Query Priority:**

1. `getByRole` - Most accessible, reflects user experience
2. `getByLabelText` - For form fields
3. `getByPlaceholderText` - Fallback for inputs
4. `getByText` - For non-interactive elements
5. `getByDisplayValue` - For form elements by value
6. `getByTestId` - Last resort only

### 11.4 API Route Testing (Handler Factory Pattern)

**Pattern for Testable API Routes:**

```typescript
// src/lib/api/contact-handler.ts (testable logic)
import { z } from 'zod';
import type { NextRequest } from 'next/server';

export const contactFormSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

export function createContactHandler(deps: {
  sendEmail: (data: any) => Promise<void>;
  validateRateLimit: (ip: string) => Promise<boolean>;
}) {
  return async (req: NextRequest) => {
    // Testable logic here
    const body = await req.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        { success: false, message: 'Validation failed' },
        { status: 400 },
      );
    }

    await deps.sendEmail(validation.data);
    return Response.json({ success: true });
  };
}

// src/app/api/contact/route.ts (minimal glue)
import { createContactHandler } from '@/lib/api/contact-handler';
import { sendEmailViaResend } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

export const POST = createContactHandler({
  sendEmail: sendEmailViaResend,
  validateRateLimit: checkRateLimit,
});
```

**Test Example:**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { createMocks } from 'node-mocks-http';
import { createContactHandler } from '@/lib/api/contact-handler';

describe('POST /api/contact', () => {
  it('should return 400 if email is invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        message: 'Test message',
      },
    });

    const mockSendEmail = vi.fn();
    const handler = createContactHandler({
      sendEmail: mockSendEmail,
      validateRateLimit: async () => true,
    });

    const response = await handler(req as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(mockSendEmail).not.toHaveBeenCalled();
  });
});
```

### 11.5 E2E Testing with Playwright

**Critical User Journeys:**

1. **Home to Contact Flow**
   - Navigate from home page to contact page
   - Fill out and submit contact form
   - Verify success message

2. **Mobile Navigation**
   - Open hamburger menu
   - Navigate to each page
   - Verify menu closes after navigation

3. **Form Validation**
   - Submit empty form
   - Verify error messages
   - Fill valid data
   - Verify submission success

**E2E Test Example:**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/contact');

    // Fill form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill(
      'textarea[name="message"]',
      'I would like to schedule a tour.',
    );

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/contact');

    // Submit empty form
    await page.click('button[type="submit"]');

    // Verify errors
    await expect(page.locator('text=First name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });
});
```

### 11.6 Mocking Strategies

**Next.js Router Mocking:**

```typescript
// tests/unit/setup.ts
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
```

**API Mocking with MSW:**

```typescript
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Thank you!' }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### 11.7 Accessibility Testing

**Automated Testing:**

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Manual Testing Checklist:**

- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets minimum 44x44px
- [ ] Form labels properly associated
- [ ] Error messages announced to screen readers
- [ ] Skip-to-content link functional

### 11.8 Performance Testing

**Lighthouse CI Integration:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/about
            http://localhost:3000/faq
            http://localhost:3000/contact
          uploadArtifacts: true
```

**Performance Budget:**

```json
{
  "performance": 90,
  "accessibility": 90,
  "best-practices": 90,
  "seo": 90,
  "first-contentful-paint": 1800,
  "largest-contentful-paint": 2500,
  "cumulative-layout-shift": 0.1,
  "total-blocking-time": 300
}
```

---

## 12. Deployment & Operations

### 12.1 Environment Configuration

**Production Environment Variables (Vercel):**

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://casacolinacare.com
NODE_ENV=production
```

**Development Environment Variables:**

```bash
RESEND_API_KEY=re_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 12.2 Deployment Checklist

**Pre-Launch (Critical):**

- [ ] Resend account created and domain verified
- [ ] Test email sent successfully to kriss@casacolinacare.com
- [ ] All environment variables configured in Vercel
- [ ] Custom domain (casacolinacare.com) connected
- [ ] SSL certificate verified (automatic via Vercel)
- [ ] All placeholder content replaced with final content
- [ ] All images optimized and uploaded
- [ ] Favicon and app icons generated
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Google
- [ ] robots.txt verified
- [ ] All tests passing (unit + E2E)
- [ ] Lighthouse scores verified (>90)
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed
- [ ] Accessibility audit completed

**Post-Launch (Week 1):**

- [ ] Monitor error logs in Vercel
- [ ] Verify contact form submissions working
- [ ] Check email delivery to kriss@casacolinacare.com
- [ ] Monitor Lighthouse scores in production
- [ ] Verify Google indexing status
- [ ] Set up uptime monitoring (UptimeRobot or similar)
- [ ] Configure Google Analytics (optional)
- [ ] Test all pages on production domain

### 12.3 Monitoring & Maintenance

**Uptime Monitoring:**

- Service: UptimeRobot (free tier)
- Check interval: 5 minutes
- Alert email: kriss@casacolinacare.com
- Pages to monitor: /, /contact, /api/contact

**Error Tracking:**

- Vercel Analytics (built-in)
- Monitor 4xx and 5xx errors
- Alert on API route failures
- Track form submission success rate

**Performance Monitoring:**

- Monthly Lighthouse audits
- Core Web Vitals tracking
- Page load time monitoring
- Form submission time tracking

**Content Updates:**

- Review FAQ content quarterly
- Update team photos annually
- Refresh testimonials as available
- Update facility photos seasonally

### 12.4 Rollback Strategy

**Vercel Instant Rollback:**

1. Navigate to Vercel dashboard
2. Select deployment history
3. Click "Promote to Production" on previous deployment
4. Rollback completes in < 1 minute

**No Database Concerns:**

- No data migration needed (stateless architecture)
- No user accounts to manage
- Form submissions are email-only (no stored data)

**DNS Failover:**

- Vercel provides automatic failover
- Edge network ensures high availability
- No manual intervention required

---

## 13. Risk Assessment

| Risk                             | Probability | Impact | Mitigation Strategy                                                                        | Owner     |
| -------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------ | --------- |
| **Resend API Downtime**          | Low         | High   | Display error message with phone number fallback. Monitor Resend status page.              | Dev Team  |
| **Form Spam Attacks**            | Medium      | Medium | Implement honeypot field + rate limiting (5 per hour per IP). Monitor submission patterns. | Dev Team  |
| **Missing Content at Launch**    | Medium      | Low    | Use approved placeholder content. Create content deadline 2 weeks before launch.           | Client    |
| **Browser Compatibility Issues** | Low         | Medium | Test on all supported browsers pre-launch. Use progressive enhancement.                    | Dev Team  |
| **Poor Mobile Performance**      | Low         | High   | Enforce performance budget. Optimize images. Use Lighthouse CI.                            | Dev Team  |
| **Accessibility Violations**     | Low         | High   | Run automated tests. Conduct manual keyboard/screen reader testing.                        | Dev Team  |
| **SEO Indexing Delays**          | Medium      | Low    | Submit sitemap immediately. Use Google Search Console. Be patient (2-4 weeks normal).      | Marketing |
| **Email Deliverability Issues**  | Low         | High   | Verify Resend domain. Configure SPF/DKIM. Test with multiple email providers.              | Dev Team  |
| **High Traffic Spike**           | Low         | Low    | Vercel auto-scales. Monitor usage. Upgrade plan if needed.                                 | Dev Team  |
| **Security Vulnerability**       | Low         | High   | Keep dependencies updated. Run security audits. Use Vercel security headers.               | Dev Team  |

**Risk Response Plan:**

- **Critical (High Impact):** Immediate response, escalate to stakeholders
- **High (Medium Impact):** Response within 24 hours
- **Medium (Low Impact):** Response within 1 week
- **Low:** Monitor and address in next sprint

---

## 14. Open Questions & Decisions

### 14.1 Critical (Blocks Launch)

- [ ] **Resend Account Setup**
  - Status: Pending
  - Action: Client to sign up at resend.com
  - Deadline: 2 weeks before launch
  - Owner: Client (Kriss)

- [ ] **Domain Verification**
  - Status: Pending
  - Action: Verify casacolinacare.com in Resend
  - Deadline: 2 weeks before launch
  - Owner: Client + Dev Team

- [ ] **Final Content Approval**
  - Status: Pending
  - Action: Review and approve all placeholder content
  - Deadline: 1 week before launch
  - Owner: Client

### 14.2 High Priority

- [ ] **Facility Photos**
  - Status: Pending
  - Requirements: 10+ high-quality images, 1920x1080px
  - Deadline: 2 weeks before launch
  - Owner: Client

- [ ] **Logo File**
  - Status: Pending
  - Requirements: SVG format, PNG fallback
  - Deadline: 2 weeks before launch
  - Owner: Client

- [ ] **Team Member Information**
  - Status: Pending
  - Requirements: Names, roles, photos, bios
  - Deadline: 1 week before launch
  - Owner: Client

### 14.3 Medium Priority

- [ ] **FAQ Content Review**
  - Status: Pending
  - Action: Verify accuracy of placeholder Q&A
  - Deadline: 1 week before launch
  - Owner: Client

- [ ] **Testimonials**
  - Status: Optional
  - Action: Provide 2-3 family testimonials
  - Deadline: Launch (can add post-launch)
  - Owner: Client

- [ ] **Google Maps Coordinates**
  - Status: Pending
  - Action: Verify exact coordinates for 189 Anapalau Street
  - Deadline: 1 week before launch
  - Owner: Dev Team

### 14.4 Low Priority (Post-Launch)

- [ ] **Analytics Integration**
  - Status: Optional
  - Action: Set up Google Analytics
  - Deadline: Post-launch
  - Owner: Client

- [ ] **Social Media Links**
  - Status: Optional
  - Action: Provide Facebook, Instagram links
  - Deadline: Post-launch
  - Owner: Client

- [ ] **Additional Pages**
  - Status: Future consideration
  - Options: Blog, Resources, Gallery
  - Deadline: Phase 2
  - Owner: Client

---

## 15. Appendices

### Appendix A: Technical Architecture

See
`ai_docs/AI_Collaborative_Architecture_The_Definitive_Project_Template_for_Next.js_15.md`
for complete architectural guidelines.

**Key Principles:**

- Server-first architecture with RSCs
- Aggressive co-location of route-specific code
- Component hierarchy: ui → features → route-specific
- Test-Driven Development (TDD) methodology
- Type-safe with TypeScript strict mode

### Appendix B: Testing Guidelines

See `ai_docs/test-driven-development-typescript.md` for comprehensive TDD
methodology.

**Key Practices:**

- Red-Green-Refactor cycle for all features
- Behavior-driven testing (test user experience, not implementation)
- Framework-aware mocking (next-router-mock, MSW)
- 60% minimum code coverage
- Accessibility testing with axe-core

### Appendix C: Code Quality Standards

See `AGENTS.md` for complete coding standards.

**Key Requirements:**

- TypeScript strict mode
- ESLint with 9 plugins
- Prettier with Tailwind plugin
- Conventional commits
- Pre-commit hooks (Husky)

### Appendix D: Glossary

- **RSC:** React Server Component
- **SSG:** Static Site Generation
- **SSR:** Server-Side Rendering
- **TDD:** Test-Driven Development
- **CTA:** Call-to-Action
- **CLS:** Cumulative Layout Shift
- **FCP:** First Contentful Paint
- **LCP:** Largest Contentful Paint
- **WCAG:** Web Content Accessibility Guidelines
- **SEO:** Search Engine Optimization
- **API:** Application Programming Interface
- **CDN:** Content Delivery Network

### Appendix E: References

**Next.js Documentation:**

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

**Testing Documentation:**

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev)

**Accessibility Resources:**

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org)
- [A11y Project](https://www.a11yproject.com)

**Tools & Services:**

- [Resend Documentation](https://resend.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Appendix F: Change Log

| Version | Date         | Changes                                                                                                            | Author       |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------ | ------------ |
| 1.0     | Initial      | Original PRD created                                                                                               | Team         |
| 2.0     | Feb 12, 2026 | Enhanced with AI documentation insights, TDD methodology, comprehensive testing strategy, detailed technical specs | AI Assistant |
| 2.1     | Feb 12, 2026 | Converted Functional Requirements (Section 6) to EARS notation                                                     | AI Assistant |
| 2.2     | Feb 12, 2026 | Converted Non-Functional Requirements (Section 7) to EARS notation                                                 | AI Assistant |
| 2.3     | Feb 12, 2026 | Converted all User Story Acceptance Criteria (Section 5) to Gherkin/BDD format for Playwright E2E testing          | AI Assistant |

### Appendix G: Approval Sign-off

**Stakeholder Approval:**

- [ ] **Business Owner (Kriss):** **\*\*\*\***\_**\*\*\*\*** Date: **\_\_\_**
- [ ] **Development Lead:** **\*\*\*\***\_**\*\*\*\*** Date: **\_\_\_**
- [ ] **QA Lead:** **\*\*\*\***\_**\*\*\*\*** Date: **\_\_\_**

**Version Approved:** 2.0  
**Approval Date:** **\*\***\_\_**\*\***

---

**END OF DOCUMENT**

---

_This PRD is a living document and will be updated as requirements evolve. All
changes must be reviewed and approved by stakeholders before implementation._
