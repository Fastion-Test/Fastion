import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim().includes('@')) {
      showToast('Enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed! Watch your inbox for offers.', 'success');
    setEmail('');
  };

  return (
    <section className="relative py-16 bg-brand-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/newsletter/1600/500')] bg-cover bg-center" />
      <div className="relative container-x text-center max-w-xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">Join the LUXE list</h2>
        <p className="text-brand-gray-300 font-body text-sm sm:text-base mb-7">
          Get 10% off your first order plus early access to drops and sales.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 sm:max-w-xs px-4 py-3 rounded-full bg-white/10 border border-white/20 placeholder-brand-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button
            type="submit"
            className="btn-ripple bg-brand-blue hover:bg-blue-700 transition-colors px-7 py-3 rounded-full font-semibold text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
