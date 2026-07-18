import { contact } from '../data';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="contact" className="footer" aria-labelledby="contact-heading">
      <div className="container">
        <div className="footer__inner">
          <h2 id="contact-heading" className="footer__heading heading-md">
            [+] Contact
          </h2>

          <nav className="footer__links" aria-label="Contact links">
            {/* Email */}
            <a
              id="contact-email"
              href={`mailto:${contact.email}`}
              className="footer__link"
            >
              <span aria-hidden="true">[mail]</span>
              <span>{contact.email}</span>
            </a>

            {/* GitHub */}
            <a
              id="contact-github"
              href={contact.github}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">[gh]</span>
              <span>GitHub ↗</span>
            </a>

            {/* LinkedIn */}
            <a
              id="contact-linkedin"
              href={contact.linkedin}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">[in]</span>
              <span>LinkedIn ↗</span>
            </a>

            {/* Instagram */}
            {contact.instagram && (
              <a
                id="contact-instagram"
                href={contact.instagram}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">[ig]</span>
                <span>Instagram ↗</span>
              </a>
            )}

            {/* Phone */}
            {contact.phone && (
              <a
                id="contact-phone"
                href={`tel:${contact.phone}`}
                className="footer__link"
              >
                <span aria-hidden="true">[tel]</span>
                <span>{contact.phone}</span>
              </a>
            )}

            {/* Resume — only shown if contact.resume is set */}
            {contact.resume && (
              <a
                id="contact-resume"
                href={contact.resume}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <span aria-hidden="true">[cv]</span>
                <span>Resume ↓</span>
              </a>
            )}
          </nav>
        </div>

        <div className="footer__bottom">
          <span>&copy; {currentYear} Vedant S. Mungapatil</span>
          <span className="color-ash">Built with React &amp; Vite</span>
        </div>
      </div>
    </footer>
  );
}
