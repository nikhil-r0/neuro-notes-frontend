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
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <User className="h-5 w-5 mr-2" /> Register New User
      </h3>
      <div className="space-y-4">
        <input type="text"    placeholder="Full Name" value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="email"   placeholder="Email"      value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="password"placeholder="Password"   value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Registering...' : 'Register User'}
        </button>
      </div>
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
    </div>
  );
};
