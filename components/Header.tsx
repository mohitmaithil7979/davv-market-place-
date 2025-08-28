
import React from 'react';
import { User, View } from '../types';

interface HeaderProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 1a1 1 0 000 2h4a1 1 0 100-2H8z" />
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1.333l.4.2a1 1 0 01.6 1.933l-.7.35a1 1 0 01-1.3-.35L10 6.667V5a1 1 0 01-1-1H7a1 1 0 010-2h3zm2 6a2 2 0 10-4 0v4a2 2 0 104 0v-4zm-2-9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM5 9a2 2 0 100-4 2 2 0 000 4zm2 5a2 2 0 10-4 0v4a2 2 0 104 0v-4zM15 9a2 2 0 100-4 2 2 0 000 4zm2 5a2 2 0 10-4 0v4a2 2 0 104 0v-4z" clipRule="evenodd" />
            </svg>
            <h1
                className="text-2xl font-bold text-white cursor-pointer"
                onClick={() => onNavigate('browse')}
            >
                DAVV Marketplace
            </h1>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-white hover:text-accent transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('create')}
                className="bg-accent text-primary font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-200"
              >
                Sell Item
              </button>
              <button
                onClick={onLogout}
                className="text-white hover:text-accent transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="bg-accent text-primary font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-200"
            >
              Login / Signup
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
