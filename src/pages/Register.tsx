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
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input className="w-full mb-4 p-3 border rounded" type="text" placeholder="Full Name"
          value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full mb-4 p-3 border rounded" type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full mb-4 p-3 border rounded" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={submit}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
