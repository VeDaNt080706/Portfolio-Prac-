import { useState } from 'react';

const NAV_LINKS = [
  { label: 'About',       href: '#about' },
  { label: 'Internship',  href: '#internship' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Hackathons',  href: '#hackathons' },
  { label: 'Contact',     href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header>
      <nav className="nav" aria-label="Primary navigation">
        <div className="nav__inner">
          {/* Wordmark */}
          <a href="#top" className="nav__wordmark" aria-label="Back to top">
            Vedant.S.Mungapatil
          </a>

          {/* Desktop links */}
          <ul className="nav__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a className="nav__link" href={href}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            id="nav-hamburger"
            className="nav__hamburger"
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '[x]' : '[=]'}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="nav-drawer"
        className={`nav__drawer${open ? ' open' : ''}`}
        role="menu"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            className="nav__link body-strong"
            href={href}
            role="menuitem"
            onClick={close}
          >
            [+] {label}
          </a>
        ))}
      </div>
    </header>
  );
}
