'use client'

import React ,{useState , useEffect} from 'react';
import { Bell, User, ChevronRight, ClipboardList, Info, BadgeDollarSign } from 'lucide-react';
import { ThemeToggle } from '../../section/themeToggel';
import Link from 'next/link';

interface User {
  firstName: string;
  lastName: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User>({
    firstName: '', 
    lastName: '', 
  });
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <header className="bg-white dark:bg-gray-800 pb-4 pt-1 flex justify-between items-center">
        <div className="flex flex-col items-center pt-2 px-16">
          <h1 className=' dark:text-white'>Policy Bots</h1>
          <span className="ml-2 text-xs text-blue-600 font-semibold dark:text-[#A9D6E5]">HAR BOT HOGA INSURED</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="container p-0 pt-8">
        <div className='flex justify-between gap-8 -mx-16'>
          <div className='w-1/3'>
            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2 dark:text-[#F9FAFB]">Hi, {user.firstName} {user.lastName}! 👋</h1>
              <p className="text-gray-600 dark:text-white">How have you been?</p>

              <nav className="mt-6 space-y-2">
                <button className="w-full mb-2 text-left p-2 bg-blue-50 dark:bg-gray-500 text-blue-600  dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                  <Bell className="mr-2" size={20} />
                  Dashboard
                </button>
                <Link href="./AllPolicies" >
                  <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <User className="mr-2" size={20} />
                    All Policies
                  </button>
                </Link>
                <Link href="/policies">
                  <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <ClipboardList className="mr-2" size={20} />
                    Your policies
                  </button>
                </Link>
                <button className="w-full text-left mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                  <Info className="mr-2" size={20} />
                  Get help
                </button>
                <Link href='/transactions'>

                  <button className="w-full mb-2 mt-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <BadgeDollarSign className="mr-2" size={20} />
                    Your Transactions
                  </button>

                </Link>
                <Link href="/profile">
                  <button className="w-full mt-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <User className="mr-2" size={20} />
                    Profile
                  </button>
                </Link>
              </nav>
            </div>
          </div>

          <div className='w-2/3'>
            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-[#F9FAFB]">Unlock special offers just for you</h2>
              <div className='flex justify-between gap-4'>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-700 dark:to-gray-800 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">TATA AIA Nifty Alpha 50 Index Fund</h3>
                      <p className="text-sm">Index Return in Last 5 Years: 35.9%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Invest ₹10,000/Month</p>
                      <p className="text-2xl font-bold">₹1 CRORE*</p>
                      <p className="text-sm">on Maturity</p>
                      <button className="font-bold border border-yellow-400 text-yellow-400 dark:bg-gray-900 dark:text-white dark:border-none px-4 py-1 rounded mt-2 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white">View plans</button>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-700 dark:to-gray-800 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">TATA AIA Nifty Alpha 50 Index Fund</h3>
                      <p className="text-sm">Index Return in Last 5 Years: 35.9%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Invest ₹10,000/Month</p>
                      <p className="text-2xl font-bold">₹1 CRORE*</p>
                      <p className="text-sm">on Maturity</p>
                      <button className=" font-bold border border-yellow-400 text-yellow-400 dark:bg-gray-900 dark:text-white dark:border-none px-4 py-1 rounded mt-2 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white">View plans</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold dark:text-[#F9FAFB]">You do not have any policies yet!</h2>
                  <p className="text-gray-600">Buy an insurance policy to protect your family & assets now</p>
                </div>
                <Link href= '/AllPolicies'>
                  <button className="font-bold border dark:border-zinc-950 border-blue-400 text-blue-400 px-4 py-1 rounded mt-2 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white dark:hover:bg-slate-300 dark:hover:text-gray-900 dark:text-[#F9FAFB]">Explore</button>
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-[#F9FAFB]">Add your Car/Bike</h2>
              <p className="text-gray-600 mb-4">We will add this to your profile. Get timely renewal reminders & save up to 85% on your vehicle insurance</p>
              <div className="flex space-x-4 mb-4">
                <span className="flex items-center border border-gray-300 bg-blue-200 dark:bg-gray-500 dark:border-gray-500 dark:text-[#F9FAFB] p-2 rounded ">
                  <Bell className="mr-1" size={16} /> Get up to 85% discount
                </span>
                <span className="flex items-center border border-gray-300 bg-blue-200 dark:bg-gray-500 dark:border-gray-500 dark:text-[#F9FAFB] p-2 rounded">
                  <Bell className="mr-1" size={16} /> Renewal reminders
                </span>
              </div>

              <div className="flex">
                <input type="text" placeholder="Enter vehicle number" className="dark:bg-gray-500 flex-grow border dark:border-none rounded-l px-4 py-2 dark:text-[#F9FAFB] dark:focus:border-slate-800" />
                <button className="bg-blue-500 text-white  px-4 py-2 rounded-r dark:bg-slate-800">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>


      <footer className="text-center p-4 text-sm text-gray-600">
        <a href="#" className="mr-4">Disclaimer</a>
        <a href="#">Privacy policy</a>
      </footer>
    </div>
  );
};

export default Dashboard;