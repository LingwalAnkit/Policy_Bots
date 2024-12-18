import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { useTheme } from '../app/context/themeContext';

const insuranceTypes = [
  { name: 'Term Life Insurance', icon: '🌂', discount: 'Upto 10% Discount' },
  { name: 'Health Insurance', icon: '❤️', label: 'Cashless Anywhere' },
  { name: 'Investment Plans', icon: '📈', label: 'In-Built Life Cover' },
  { name: 'Car Insurance', icon: '🚗', discount: 'Upto 85% Discount' },
  { name: '2 Wheeler Insurance', icon: '🛵' },
  { name: 'Family Health Insurance', icon: '👨‍👩‍👧‍👦', discount: 'Upto 25% Discount' },
  { name: 'Travel Insurance', icon: '✈️' },
  { name: 'Term Insurance (Women)', icon: '🏃‍♀️', label: 'Upto 20% Cheaper' },
  { name: 'Free of Cost Term Plan', icon: '💰' },
  { name: 'Guaranteed Return Plans', icon: '💯' },
  { name: 'Child Savings Plans', icon: '👶', label: 'Premium Waiver' },
  { name: 'Retirement Plans', icon: '👴👵' },
  { name: 'Employee Group Health Insurance', icon: '👥', discount: 'Upto 65% Discount' },
  { name: 'Home Insurance', icon: '🏠', discount: 'Upto 25% Discount' },
];

const InsuranceSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      gradient: 'from-orange-500 to-pink-500 dark:from-gray-700 dark:to-gray-800',
      title: 'Health insurance with',
      highlight: 'Unlimited +',
      subHighlight: 'Sum Insured',
      description: 'also available now',
      buttonText: 'View plans',
    },
    {
      gradient: 'from-green-400 to-teal-500 dark:from-gray-700 dark:to-gray-800',
      title: 'Life insurance with',
      highlight: 'Flexible',
      subHighlight: 'Coverage Options',
      description: 'tailored to your needs',
      buttonText: 'Explore options',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval); 
  }, [slides.length]);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  const activeSlideData = slides[activeSlide];

  return (
    <div className="flex flex-col gap-2">
      <div className={`bg-gradient-to-r ${activeSlideData.gradient} rounded-lg p-6 text-white`}>
        <h2 className="text-2xl font-semibold mb-2">{activeSlideData.title}</h2>
        <div className="text-3xl font-bold mb-2">
          {activeSlideData.highlight} <span className="text-yellow-300">+</span><br />
          {activeSlideData.subHighlight}
        </div>
        <p className="mb-4">{activeSlideData.description}</p>
        <button className="dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-800 px-4 py-2 rounded-md flex items-center">
          {activeSlideData.buttonText} <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-center space-x-2 mt-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const Hero = () => {
  const { darkMode } = useTheme()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-64 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-4">
            Let us find you <br />the Best Insurance
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center dark:text-[#A9D6E5] text-purple-600">
              <Zap size={20} className="mr-2" />
              <span className='dark:text-[#A9D6E5]'>50+ insurers with one of the best prices</span>
            </div>
          </div>
          <div className="flex items-center dark:text-[#F1C40F] text-orange-500">
            <Zap size={20} className="mr-2" />
            <span>Quick, easy & hassle-free</span>
          </div>
        </div>
        <InsuranceSlider />
      </div>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
  {insuranceTypes.map((type, index) => (
    <div
      key={index}
      className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg text-center transition-transform duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="text-3xl mb-2">{type.icon}</div>
      <div className="text-sm dark:text-[#D1D5DB] font-medium">{type.name}</div>
      {type.discount && (
        <div className="text-xs dark:text-[#32CD32] text-green-600 mt-1">{type.discount}</div>
      )}
      {type.label && (
        <div className="text-xs text-blue-600 dark:text-[#A5F3FC] mt-1">{type.label}</div>
      )}
    </div>
  ))}
</div>
      <div className="mt-8 text-center">
        <button className="border border-blue-500 text-blue-500 dark:border-gray-400 dark:text-gray-400 px-4 py-2 rounded font-medium transition duration-300 ease-in-out dark:hover:bg-gray-600 dark:hover:text-gray-100 hover:bg-blue-500 hover:text-white">
          View all products
        </button>
      </div>
    </div>
  );
};
