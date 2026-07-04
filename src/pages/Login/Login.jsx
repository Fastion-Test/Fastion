import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      showToast('Please fill in both fields', 'error');
      return;
    }
    // Demo only — wire this up to a real auth endpoint when the backend is ready
    showToast('Logged in successfully', 'success');
    navigate('/account');
  };

  return (
    <div className="container-x py-16 max-w-md mx-auto">
      <h1 className="font-heading text-2xl font-bold mb-2 text-center text-brand-black dark:text-white">Welcome Back</h1>
      <p className="text-sm text-brand-gray-500 text-center mb-8">Login to your LUXE account</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input-field"
        />
        <div className="flex justify-end">
          <Link to="/login" className="text-xs text-brand-blue hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="btn-ripple bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold py-3.5 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors">
          Login
        </button>
      </form>
      <p className="text-sm text-center text-brand-gray-500 mt-6">
        Don't have an account? <Link to="/register" className="text-brand-blue hover:underline">Register</Link>
      </p>
    </div>
  );
}
