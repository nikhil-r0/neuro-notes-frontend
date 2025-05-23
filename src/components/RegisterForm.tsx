import React, { useState } from 'react';
import { User } from 'lucide-react';
import { apiService } from '../api/apiService';

interface Props { onUserRegistered: () => void; }

export const RegisterForm: React.FC<Props> = ({ onUserRegistered }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await apiService.registerUser(formData);
      setMessage(result.message || 'User registered successfully!');
      setFormData({ name: '', email: '', password: '' });
      onUserRegistered();
    } catch {
      setMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
        <User className="h-5 w-5 mr-2" /> Register New User
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="regFormName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input id="regFormName" type="text" placeholder="Full Name" value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent" />
        </div>
        <div>
          <label htmlFor="regFormEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input id="regFormEmail" type="email" placeholder="Email" value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent" />
        </div>
        <div>
          <label htmlFor="regFormPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input id="regFormPassword" type="password" placeholder="Password" value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent" />
        </div>
        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-primary text-text-primary-light hover:bg-blue-700 disabled:opacity-50 py-3 px-4 rounded-md shadow-sm transition-colors">
          {loading ? 'Registering...' : 'Register User'}
        </button>
      </div>
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.toLowerCase().includes('success') // Made matching case-insensitive
            ? 'bg-accent/20 text-accent dark:bg-accent/30 dark:text-accent'
            : 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400'}`}>
          {message}
        </div>
      )}
    </div>
  );
};
