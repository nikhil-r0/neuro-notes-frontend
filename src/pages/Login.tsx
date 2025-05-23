// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { login }               = useContext(AuthContext);

  const submit = async () => {
    setError('');
    try {
      await login(email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign In</h2>
        {error && <div className="mb-4 text-red-600 dark:text-red-400 text-sm">{error}</div>}

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input
          id="email"
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input
          id="password"
          className="block w-full p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full mb-4 bg-primary text-text-primary-light hover:bg-blue-700 py-3 px-4 rounded-md shadow-sm transition-colors"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-accent hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
