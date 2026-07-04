import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      showToast('Please complete all fields', 'error');
      return;
    }
    showToast('Message sent! We will get back to you soon.', 'success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container-x py-14">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2 text-brand-black dark:text-white">Contact Us</h1>
      <p className="text-sm text-brand-gray-500 mb-10 max-w-md">
        Questions about an order, shipping, or returns? Reach out and our team will help.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field resize-none"
          />
          <button type="submit" className="btn-ripple w-fit bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold px-7 py-3 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors">
            Send Message
          </button>
        </form>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <FiMapPin className="text-brand-blue mt-1" />
            <div>
              <p className="font-medium text-sm">Our Store</p>
              <p className="text-sm text-brand-gray-500">123 Fifth Avenue, New York, NY 10001</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiPhone className="text-brand-blue mt-1" />
            <div>
              <p className="font-medium text-sm">Phone</p>
              <p className="text-sm text-brand-gray-500">+1 (555) 234-5678</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiMail className="text-brand-blue mt-1" />
            <div>
              <p className="font-medium text-sm">Email</p>
              <p className="text-sm text-brand-gray-500">support@luxestore.com</p>
            </div>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-brand-gray-100 dark:bg-brand-gray-800">
            <img src="https://picsum.photos/seed/contact-map/800/450" alt="Store location map" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
