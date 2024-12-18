import React, { useState } from 'react';
import { useTheme } from '../app/context/themeContext';
import { validateEmail } from '../lib/validation';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  mobileNo: string;
}

interface SignUpModalProps {
  onClose: () => void;
  openLoginModal: () => void;
  onSuccessfulSignUp: (userData: { firstName: string; lastName: string }) => void;
}

export const SignUpModal = ({ onClose, openLoginModal, onSuccessfulSignUp }: SignUpModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    mobileNo: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 120) errors.age = 'Age must be between 18 and 120';
    if (!/^\d{10}$/.test(formData.mobileNo)) errors.mobileNo = 'Mobile number must be 10 digits';
  
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        console.log('Registration response:', result);
  
        if (response.ok) {
          alert('User registered successfully');
          onSuccessfulSignUp({ firstName: formData.firstName, lastName: formData.lastName });
          onClose();
        } else {
          const errorMessage = result.message || 'Unknown error occurred during registration';
          console.error('Registration failed:', errorMessage);
          
          if (result.missingFields) {
            setFormErrors(result.missingFields.reduce((acc, field) => ({...acc, [field]: 'This field is required'}), {}));
          } else {
            alert(`Error registering user: ${errorMessage}`);
          }
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert(`An error occurred during registration: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-1/3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className='flex justify-between gap-6'>
          <h2 className="text-xl font-bold mt-2 mb-2">Sign-Up</h2>
          <button onClick={openLoginModal} className={`text-xl mb-2 border px-4 py-2 rounded font-medium transition duration-300 ease-in-out ${darkMode ? 'border-gray-400 text-gray-400 hover:bg-gray-600 hover:text-gray-100' : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'}`}>
            Already Signed
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {['firstName', 'lastName', 'email', 'password', 'age', 'mobileNo'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleInputChange}
                className={`w-full border px-4 py-2 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'}`}
              />
              {formErrors[field as keyof FormData] && <p className="text-red-500 text-sm mt-1">{formErrors[field as keyof FormData]}</p>}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              className={`text-xl mb-2 border px-4 py-2 rounded font-medium transition duration-300 ease-in-out ${darkMode ? 'border-gray-400 text-gray-400 hover:bg-gray-600 hover:text-gray-100' : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign-Up'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-red-500 text-red-500 px-4 py-2 rounded font-medium transition duration-300 ease-in-out hover:bg-red-500 hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
      </div>
    </div>
  );
};

interface LoginModalProps {
  onClose: () => void;
  onSuccessfulLogin: (userData: { firstName: string; lastName: string }) => void;
}

export const LoginModal = ({ onClose, onSuccessfulLogin }: LoginModalProps) => {
  const router = useRouter();
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store complete user data
        const userData = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email
        };
        localStorage.setItem('user', JSON.stringify(userData));
        onSuccessfulLogin(userData);
        router.push('/dashboard');
        onClose();
        
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md relative ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mt-2 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'
              }`}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'
              }`}
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="p-3 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
              {error}
            </div>
          )}
          <div className="flex justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 border px-4 py-2 rounded font-medium transition duration-300 ease-in-out ${
                darkMode
                  ? 'border-gray-400 text-gray-400 hover:bg-gray-600 hover:text-gray-100'
                  : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-red-500 text-red-500 rounded font-medium transition duration-300 ease-in-out hover:bg-red-500 hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        >
          ✕
        </button>
      </div>
    </div>
  );
};