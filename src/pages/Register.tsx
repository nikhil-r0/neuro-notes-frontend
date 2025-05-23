import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState(''), [email, setEmail] = useState(''),
        [password, setPassword] = useState(''), [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const submit = async () => {
    try {
      await register(name, email, password);
    } catch (e:any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Register</h2>
        {error && <div className="mb-4 text-red-600 dark:text-red-400 text-sm">{error}</div>}

        <div>
          <label htmlFor="fullNameReg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            id="fullNameReg"
            className="block w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            type="text" placeholder="Full Name"
            value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="emailReg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            id="emailReg"
            className="block w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            type="email" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="passwordReg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            id="passwordReg"
            className="block w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button onClick={submit}
          className="w-full bg-primary text-text-primary-light hover:bg-blue-700 py-3 px-4 rounded-md shadow-sm transition-colors">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
