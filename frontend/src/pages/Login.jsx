import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await result.json()

      if (data.success == false) {
        console.log("Err while getting data during login");
        return;
      }
      localStorage.setItem('auth_user', data._id)
      login(data._id)
      navigate('/todos', { replace: true })
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <label className="block mb-2">
          <span className="text-sm">Username</span>
          <input
            name="username"
            type="username"
            onChange={handleChange}
            value={formData.username}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
        <p>If you don't have an account:</p><br />
        <Link className='text-blue-600 underline' to={'/signup'}>Signup</Link>
      </form>
    </div>
  );
}
