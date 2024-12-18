"use client"
import React from 'react';
import { Bell, User, ChevronRight, ClipboardList, Info, BadgeDollarSign, PlusIcon } from 'lucide-react';
import { ThemeToggle } from '../../section/themeToggel';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const transactions = [
    { id: 'TRX123456',policyname: 'Health Insurance', date: '2023-09-15', amount: '₹ 2,500.00', status: 'Completed' },
    { id: 'TRX654321',policyname: 'Car Insurance', date: '2023-09-17', amount: '₹ 500.00', status: 'Pending' },
    { id: 'TRX789012',policyname: 'Life Insurance', date: '2023-09-20', amount: '₹ 1,200.00', status: 'Completed' },
];

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

            <main className="container mx-auto p-0 pt-8">
                <div className="flex justify-between gap-8 -mx-16">
                    <div className='w-1/3'>
                        <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6">
                        <h1 className="text-2xl font-bold mb-2 dark:text-[#F9FAFB]">Hi, {user.firstName} {user.lastName}! 👋</h1>
                            <p className="text-gray-600 dark:text-white">How have you been?</p>

                            <nav className="mt-6 space-y-2">
                                <Link href="/dashboard">
                                <button className="w-full mb-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                                    <Bell className="mr-2" size={20} />
                                    Dashboard
                                </button>
                                </Link>
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
                                <button className="w-full mb-2 mt-2 text-left p-2 bg-blue-50 dark:bg-gray-500 text-blue-600  dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                                    <BadgeDollarSign className="mr-2" size={20} />
                                    Your Transactions
                                </button>
                                <Link href="/profile">
                                    <button className="w-full mt-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                                        <User className="mr-2" size={20} />
                                        Profile
                                    </button>
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="w-2/3">
                        <div className="flex flex-col gap-4">
                            <div className="bg-blue-400 dark:bg-[#8dc4d3] dark:text-slate-700 p-4 rounded-xl">
                                <h1 className="text-4xl font-extrabold">Your Transactions</h1>
                                <h2 className="text-lg">Manage your transactions status & approvals here</h2>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between border-2 border-dashed border-gray-400 ">
                                <div className="flex items-center content-center justify-center text-center">
                                    <table style={{borderCollapse: 'collapse', }} className=' p-4 rounded-xl w-[52rem]'>
                                        <thead>
                                            <tr className='bg-blue-400 dark:bg-[#8dc4d3] dark:text-slate-700'>
                                                <th style={{ padding: '10px', textAlign: 'left' }}>Transaction ID</th>
                                                <th style={{ padding: '10px', textAlign: 'left' }}>Policy Name</th>
                                                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                                                <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                                                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((transaction, index) => (
                                                <tr key={transaction.id} style={{ backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>{transaction.id}</td>
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>{transaction.policyname}</td>
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>{transaction.date}</td>
                                                    <td style={{ padding: '10px', textAlign: 'left' }}>{transaction.amount}</td>
                                                    <td style={{ padding: '10px', textAlign: 'left', color: transaction.status === 'Completed' ? 'green' : 'red' }}>
                                                        {transaction.status}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center p-4 pt-44 text-sm text-gray-600 dark:text-gray-300">
                <a href="#" className="mr-4">Disclaimer</a>
                <a href="#">Privacy policy</a>
            </footer>
        </div>
    );
};

export default AllPolicies;
