import { Link } from 'react-router-dom';
import { Globe, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-6 h-6 text-[var(--accent)]" />
              <span className="text-lg font-bold" style={{ fontFamily: 'Bricolage Grotesque' }}>
                Japa Score
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm max-w-md">
              Your personalized immigration readiness score. Know exactly where you stand and what to do next.
            </p>
            <p className="text-[var(--text-muted)] text-sm mt-4">
              Built for Nigerians, by Nigerians 🇳🇬
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Product</h4>
            <div className="flex flex-col gap-2">
              <Link to="/quiz" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-sm no-underline">
                Take the Quiz
              </Link>
              <Link to="/pricing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-sm no-underline">
                Pricing
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Legal</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-sm no-underline">
                Privacy Policy
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-sm no-underline">
                Terms of Service
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-sm no-underline">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-xs">
            &copy; {new Date().getFullYear()} Japa Score. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
