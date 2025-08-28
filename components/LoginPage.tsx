
import React, { useState } from 'react';
import { User } from '../types';
import { loginWithDavvEmail } from '../services/marketplaceService';
import Spinner from './Spinner';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.toLowerCase().endsWith('@davv.ac.in')) {
      setError('Please use a valid @davv.ac.in email address.');
      setIsLoading(false);
      return;
    }

    try {
      const user = await loginWithDavvEmail(email, name);
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-primary mb-2">Join the Marketplace</h2>
        <p className="text-center text-textSecondary mb-6">Login or create an account with your university email.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-textSecondary font-semibold mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-textSecondary font-semibold mb-2">
              DAVV Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g., yourname@davv.ac.in"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
          >
            {isLoading ? <Spinner size="sm" /> : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
