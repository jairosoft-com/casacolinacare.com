import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Business Info */}
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Casa Colina Care
            </h3>
            <address className="mt-3 space-y-1 text-sm not-italic text-muted-foreground">
              <p>189 Anapalua Street</p>
              <p>Hawaii Kai, HI 96825</p>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="mt-3 flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>
                <a
                  href="tel:+18008888888"
                  className="transition-colors hover:text-primary"
                >
                  +1 (800) 888-8888
                </a>
              </p>
              <p>
                <a
                  href="mailto:kriss@casacolinacare.com"
                  className="transition-colors hover:text-primary"
                >
                  kriss@casacolinacare.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Casa Colina Care LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
