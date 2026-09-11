import Link from "next/link";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/properties", label: "Available Homes" },
      { href: "/about", label: "Our Story" },
      { href: "/contact", label: "Schedule a Tour" },
    ],
  },
  {
    title: "Residents",
    links: [
      { href: "/tenant", label: "For Residents" },
      { href: "/tenant", label: "Request Maintenance" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream/80 mt-auto">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-cream text-2xl">The Ever Company</p>
          <p className="text-copper-light mt-2 font-serif text-lg italic">
            Your forever home, for now.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A family-owned collection of beautiful rental homes in the
            Cleveland, Ohio area — furnished and unfurnished. Owned and run
            locally by our family since 2023.
          </p>
          <p className="text-cream/60 mt-6 text-sm">
            Rocky River · Bay Village · Avon Lake · Strongsville
          </p>
          <a
            href="mailto:hello@theevercocleveland.com"
            className="hover:text-cream mt-4 inline-block text-sm underline-offset-4 transition-colors hover:underline"
          >
            hello@theevercocleveland.com
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-copper-light">{col.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-cream/10 border-t">
        <div className="text-cream/50 mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} The Ever Company. All rights
            reserved.
          </p>
          <p>Equal Housing Opportunity · Made in Cleveland, Ohio</p>
        </div>
      </div>
    </footer>
  );
}
