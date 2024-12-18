'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ThemeToggle } from "../section/themeToggel";
import { useTheme } from '../app/context/themeContext';
import ChatbotIntegration from '../lib/chatbot';
import { SignUpModal, LoginModal } from './authModal'; // Import the new components

interface HeaderProps {
  onSuccessfulAuth: (userData: { firstName: string; lastName: string }) => void;
}

export const Header = ({ onSuccessfulAuth }: HeaderProps) => {
  const { darkMode } = useTheme();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const openLoginModal = () => {
    closeSignUpModal();
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openChatbot = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: 'show' });
    } else {
      console.error('Botpress WebChat is not available');
      alert('Chat is currently unavailable. Please try again later.');
    }
  };

  const handleSuccessfulAuth = (userData: { firstName: string; lastName: string }) => {
    console.log(userData)
    localStorage.setItem('user', JSON.stringify(userData));
    // onSuccessfulAuth(userData);
  };

  return (
    <>
      <ChatbotIntegration />
      <header className={`sticky top-0 z-20 shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col items-center">
              <h1>Policy Bots</h1>
              <span className="ml-2 text-xs text-blue-600 font-semibold">HAR BOT HOGA INSURED</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <NavItem label="Insurance Products" items={['Car Insurance', 'Health Insurance', 'Life Insurance']} />
              <NavItem label="Renew Your Policy" items={['Car Policy', 'Health Policy', 'Life Policy']} />
              <NavItem label="Claim" items={['File a Claim', 'Track Claim', 'Claim FAQs']} />
              <NavItem label="FAQs" items={['Contact Us', 'FAQs', 'Help Center']} />
              <button onClick={openChatbot} className={`border border-blue-500 text-blue-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${darkMode ? 'dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white' : ''}`}>
                Chat Bot
              </button>
              <button onClick={openSignUpModal} className={`border border-blue-500 text-blue-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${darkMode ? 'dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white' : ''}`}>
                Sign-Up
              </button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
        {isSignUpModalOpen && (
          <SignUpModal 
            onClose={closeSignUpModal} 
            openLoginModal={openLoginModal} 
            onSuccessfulSignUp={handleSuccessfulAuth}
          />
        )}
        {isLoginModalOpen && (
          <LoginModal 
            onClose={closeLoginModal} 
            onSuccessfulLogin={handleSuccessfulAuth}
          />
        )}
      </header>
    </>
  );
};

interface NavItemProps {
  label: string;
  items: string[];
}

const NavItem = ({ label, items }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const { darkMode } = useTheme();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 80);
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownWidth(Math.max(rect.width, 256));
    }
  }, [label]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button ref={buttonRef} className={`flex items-center hover:text-blue-600 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>
        {label}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div
          className={`absolute top-full left-1/2 shadow-md rounded-md py-4 mt-6 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          style={{
            width: `${dropdownWidth}px`,
            transform: 'translateX(-50%)',
            right: '0px',
            maxWidth: 'calc(100vw - 100%)',
          }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href="#"
              className={`block px-4 py-2 text-center whitespace-nowrap ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;