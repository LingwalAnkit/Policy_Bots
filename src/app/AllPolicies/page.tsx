'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRight, Bell, ClipboardList, Info, User, BadgeDollarSign, HeartPulse, Bike, Car, Plane, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../../section/themeToggel';

const InsuranceOption = ({ title, description, icon }) => (
  <div className="bg-white dark:bg-gray-600 dark:text-[#A9D6E5] p-4 rounded-lg shadow-sm">
    <div className="text-blue-500 dark:text-gray-200">{icon}</div>
    <h3 className="font-semibold mt-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
    <ArrowRight className="text-blue-500 dark:text-gray-200 mt-2" size={20} />
  </div>
);

interface User {
  firstName: string;
  lastName: string;
}
const AllPolicies = () => {
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
                <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                  <Bell className="mr-2" size={20} />
                  Dashboard
                </button>
                <Link href="./AllPolicies" >
                  <button className="w-full mb-2 text-left p-2 bg-blue-50 dark:bg-gray-500 text-blue-600  dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href= '/TermLifeForm'>
                <InsuranceOption
                  title="Term Life Insurance"
                  description="Financially secure your loved ones for life after you"
                  icon={<User size={48} />}
                />
              </Link>
              <Link href= '/TermLifeForm'>
              <InsuranceOption
                title="Health Insurance"
                description="Financial protection against rising medical costs"
                icon={<HeartPulse size={48} />}
              />
              </Link>
              <Link href= '/TermLifeForm'>
              <InsuranceOption
                title="2 Wheeler Insurance"
                description="360° protection for your bike against challans & accidents"
                icon={<Bike size={48} />}
              />
              </Link>
              <Link href= '/TermLifeForm'>
              <InsuranceOption
                title="Investment Plans"
                description="Grow your wealth & become financially independent"
                icon={<DollarSign size={48} />}
              />
              </Link>
              <Link href= '/TermLifeForm'>
              <InsuranceOption
                title="Car Insurance"
                description="Instantly buy or renew insurance for your car"
                icon={<Car size={48} />}
              />
              </Link>
              <Link href= '/TermLifeForm'>
              <InsuranceOption
                title="Travel Insurance"
                description="Secures you, your flights & bags to ensure you enjoy your trip"
                icon={<Plane size={48} />}
              />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <footer className="text-center p-4 mt-36 text-sm text-gray-600">
        <a href="#" className="mr-4">Disclaimer</a>
        <a href="#">Privacy policy</a>
      </footer>
    </div>
  );
};

export default AllPolicies;
