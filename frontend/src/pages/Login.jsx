import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // → call your login API here
    console.log('login', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={form.email}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="you@example.com"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
