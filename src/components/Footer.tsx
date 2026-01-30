import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "w-5 h-5"} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { label: "GitHub", href: "https://github.com/orgs/Consulting-Manao/repositories", icon: Github },
  { label: "X", href: "https://x.com/Chi_m_p", icon: XIcon },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Branding + Social */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/chimp-joystick.png"
                alt=""
                className="w-10 h-10 object-contain"
                aria-hidden="true"
              />
              <span className="font-bold text-lg text-foreground">ChimpDAO</span>
            </div>
            
            {/* Social Links - Circular buttons */}
            <div className="flex items-center gap-2 ml-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Badges + Privacy + Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted-foreground">
            {/* Stellar Badge */}
            <a
              href="https://stellar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300"
            >
              <span>Built on</span>
              <img
                src="/stellar-symbol.png"
                alt=""
                className="h-4 w-auto invert opacity-70"
                aria-hidden="true"
              />
              <span className="font-medium">Stellar</span>
            </a>

            {/* SCF Badge */}
            <a
              href="https://communityfund.stellar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300"
            >
              <span>Funded by</span>
              <img
                src="/scf-logo.svg"
                alt=""
                className="h-4 w-auto"
                aria-hidden="true"
              />
              <span className="font-medium">SCF</span>
            </a>

            {/* Privacy + Copyright */}
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <span>© 2026 ChimpDAO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
