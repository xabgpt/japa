import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--primary)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Globe className="w-7 h-7 text-[var(--accent)]" />
          <span className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Bricolage Grotesque' }}>
            Japa Score
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/pricing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition no-underline text-sm">
            Pricing
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition no-underline text-sm flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-sm flex items-center gap-1 bg-transparent border-none cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition no-underline text-sm">
              Sign In
            </Link>
          )}
          <Button size="sm" onClick={() => navigate('/quiz')}>
            Get My Score
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--text-primary)] bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3">
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition no-underline py-2">
            Pricing
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition no-underline py-2">
                Dashboard
              </Link>
              <button onClick={() => { signOut(); setMenuOpen(false); }} className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition py-2 bg-transparent border-none cursor-pointer">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition no-underline py-2">
              Sign In
            </Link>
          )}
          <Button size="sm" onClick={() => { navigate('/quiz'); setMenuOpen(false); }}>
            Get My Score
          </Button>
        </div>
      )}
    </nav>
  );
}
