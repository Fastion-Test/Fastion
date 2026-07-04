import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    if (form.password !== form.confirm) {
      showToast('Passwords do not match', 'error');
      return;
    }
    // Demo only — wire this up to a real auth endpoint when the backend is ready
    showToast('Account created! Please login.', 'success');
    navigate('/login');
  };

  return (
    <div className="container-x py-16 max-w-md mx-auto">
      <h1 className="font-heading text-2xl font-bold mb-2 text-center text-brand-black dark:text-white">Create Account</h1>
      <p className="text-sm text-brand-gray-500 text-center mb-8">Join LUXE for a faster checkout every time</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input-field" />
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="input-field" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="input-field" />
        <input name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} className="input-field" />
        <button type="submit" className="btn-ripple bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold py-3.5 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors">
          Create Account
        </button>
      </form>
      <p className="text-sm text-center text-brand-gray-500 mt-6">
        Already have an account? <Link to="/login" className="text-brand-blue hover:underline">Login</Link>
      </p>
    </div>
  );
}
