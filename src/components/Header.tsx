import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car as Cards, Library, FolderKanban, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-4">
        <ul className="flex items-center h-16 space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-400' : ''
                }`
              }
            >
              <Cards className="w-5 h-5" />
              <span>Create Card</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-400' : ''
                }`
              }
            >
              <Library className="w-5 h-5" />
              <span>Card Library</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sets"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-400' : ''
                }`
              }
            >
              <FolderKanban className="w-5 h-5" />
              <span>Set Manager</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/config"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-400' : ''
                }`
              }
            >
              <Settings className="w-5 h-5" />
              <span>Configuration</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;