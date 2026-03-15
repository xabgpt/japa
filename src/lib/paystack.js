const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

export function initializePayment({ email, amount = 250000, onSuccess, onClose }) {
  // amount in kobo (₦2,500 = 250000 kobo)
  if (!window.PaystackPop) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.onload = () => startPayment({ email, amount, onSuccess, onClose });
    document.head.appendChild(script);
    return;
  }
  startPayment({ email, amount, onSuccess, onClose });
}

function startPayment({ email, amount, onSuccess, onClose }) {
  if (!PAYSTACK_PUBLIC_KEY) {
    console.warn('Paystack public key not configured');
    onSuccess?.({ reference: 'demo_' + Date.now() });
    return;
  }

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount,
    currency: 'NGN',
    plan: '', // Add subscription plan code for recurring
    callback: (response) => {
      onSuccess?.(response);
    },
    onClose: () => {
      onClose?.();
    },
  });

  handler.openIframe();
}
