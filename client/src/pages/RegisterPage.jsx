 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import openEye from '../assets/icons/open_eye.png';
import closedEye from '../assets/icons/hidden_eye.png';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Registered successfully', { autoClose: 2000 });
                setFormData({ username: '', email: '', password: '' });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (response.status === 409) {
                toast.info('Email already exists !', { autoClose: 5000 });
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            toast.warning('Network error. Try again later ⚠️');
        }
    };

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <ToastContainer />
            <div className="flex min-h-screen items-center justify-center px-4 py-8 bg-gradient-to-r from-violet-200 to-pink-200 ">
                <div className="w-full max-w-md  rounded-xl shadow-2xl p-6 space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="/src/assets/logo/logo.png"
                            alt="Your App Name"
                            className="h-28 w-auto object-contain"
                        />
                        <h2 className="text-center text-2xl font-bold text-gray-900">
                            Create your account
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block  text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
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
                            Register
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <span
                            onClick={navigateToLogin}
                            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Sign in
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
