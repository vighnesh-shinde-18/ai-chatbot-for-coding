// LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import openEye from '../assets/icons/open_eye.png';
import closedEye from '../assets/icons/hidden_eye.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        toast.success('LoggedIn successful', { autoClose: 3000 });
        setEmail('');
        setPassword('');
        setShowPassword(false);
       setTimeout(() => {
         navigate('/ChatBotPage')
       }, 3000);

      } else if (response.status === 404) {
        toast.info('User Not Found !', { autoClose: 5000 });
      } else if (response.status === 401) {
        toast.info('Password Is Incorrect !', { autoClose: 5000 });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.warning('Network error. Please try again later. ⚠️');
    }
  };

  const navToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen items-center justify-center px-4 py-8 bg-gradient-to-r from-violet-200 to-pink-200">
        <div className="w-full max-w-md rounded-xl  shadow-2xl p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <img
              src="/src/assets/logo/logo.png"
              alt="Your App Name"
              className="h-28 w-auto object-contain"
            />
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2 pr-10 text-sm shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <img
                  src={showPassword ? openEye : closedEye}
                  alt="Toggle visibility"
                  className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-white font-semibold hover:bg-indigo-500 transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <span
              onClick={navToRegister}
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
