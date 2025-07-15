import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: ''});
  const navigate = useNavigate()

  const handleChange = (e) =>  setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();

      if (data.success == false) {
        console.log("Error getting data while signup")
        return;
      }
      navigate('/login')
    } catch (error) {
      console.log("Error: ", error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
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
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
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
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
