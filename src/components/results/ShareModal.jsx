import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Twitter, MessageCircle, Link2, Check, Image } from 'lucide-react';
import { getTwitterShareText, getWhatsAppShareText, copyImageToClipboard } from '../../lib/shareCard';
import Button from '../ui/Button';

export default function ShareModal({ isOpen, onClose, score, grade, bestCountry, shareUrl, scoreCardRef }) {
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyImage = async () => {
    if (scoreCardRef?.current) {
      await copyImageToClipboard(scoreCardRef);
      setImageCopied(true);
      setTimeout(() => setImageCopied(false), 2000);
    }
  };

  const twitterText = getTwitterShareText(score, grade?.label, bestCountry?.country, shareUrl);
  const whatsappText = getWhatsAppShareText(score, grade?.label, bestCountry?.country, shareUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Share Your Score</h3>
              <button
                onClick={onClose}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyImage}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition cursor-pointer text-left"
              >
                {imageCopied ? <Check className="w-5 h-5 text-[var(--accent)]" /> : <Image className="w-5 h-5 text-[var(--text-secondary)]" />}
                <span className="text-[var(--text-primary)]">{imageCopied ? 'Image Copied!' : 'Copy Image'}</span>
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${twitterText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition no-underline"
              >
                <Twitter className="w-5 h-5 text-[var(--text-secondary)]" />
                <span className="text-[var(--text-primary)]">Share on Twitter/X</span>
              </a>

              <a
                href={`https://wa.me/?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition no-underline"
              >
                <MessageCircle className="w-5 h-5 text-[var(--text-secondary)]" />
                <span className="text-[var(--text-primary)]">Share on WhatsApp</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition cursor-pointer text-left"
              >
                {copied ? <Check className="w-5 h-5 text-[var(--accent)]" /> : <Link2 className="w-5 h-5 text-[var(--text-secondary)]" />}
                <span className="text-[var(--text-primary)]">{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
