import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';

const paymentMethods = [
  { name: 'American Express', imgSrc: '/images/Rupay-Logo.png', width: 50, height: 30 },
  { name: 'Visa', imgSrc: '/images/visa-icon.avif', width: 50, height: 30 },
  { name: 'Paytm', imgSrc: '/images/paytm-icon.avif', width: 50, height: 30 },
  { name: 'RuPay', imgSrc: '/images/netbanking-icon.avif', width: 50, height: 30 },
  { name: 'Freecharge', imgSrc: '/images/master-card-icon.avif', width: 50, height: 30 },
  { name: 'Mastercard', imgSrc: '/images/amex-icon.avif', width: 50, height: 30 }
];

const Footer = () => {
  return (
    <footer className="p-8 bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 ">Insurance</h3>
            <ul className="space-y-2">
              <li className='hover:text-blue-600 cursor-pointer'>General Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Life Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Term Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Investment</li>
              <li className='hover:text-blue-600 cursor-pointer'>Health Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Other Insurance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Calculators</h3>
            <ul className="space-y-2 ">
              <li className='hover:text-blue-600 cursor-pointer'>SIP Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Income Tax Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>NPS Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Term Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>HLV Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Life Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Health Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Travel Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Car Insurance Calculator</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className='hover:text-blue-600 cursor-pointer'>Articles</li>
              <li className='hover:text-blue-600 cursor-pointer'>Customer reviews</li>
              <li className='hover:text-blue-600 cursor-pointer'>Insurance companies</li>
              <li className='hover:text-blue-600 cursor-pointer'>Newsroom</li>
              <li className='hover:text-blue-600 cursor-pointer'>Awards</li>
              <li className='hover:text-blue-600 cursor-pointer'>PB Life</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li className='hover:text-blue-600 cursor-pointer'>About Us</li>
              <li className='hover:text-blue-600 cursor-pointer'>Sitemap</li>
              <li className='hover:text-blue-600 cursor-pointer'>Careers</li>
              <li className='hover:text-blue-600 cursor-pointer'>Legal & Admin policies</li>
              <li className='hover:text-blue-600 cursor-pointer'>ISNP</li>
              <li className='hover:text-blue-600 cursor-pointer'>Contact us</li>
              <li className='hover:text-blue-600 cursor-pointer'>Verify your advisor</li>
              <li className='hover:text-blue-600 cursor-pointer'>Investor Relations</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-navy-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold mb-2">Payment Methods</h4>
              <div className="flex space-x-4">
                {paymentMethods.map(({ name, imgSrc, width, height }) => (
                  <div key={name} className="bg-white p-1 rounded-lg">
                    <Image src={imgSrc} alt={name} width={width} height={height} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Secured With</h4>
              <div className="bg-white p-2 rounded">
                {/* Update with a valid image src */}
                <Image src="/images/pci-icon.avif" alt="Secured With" width={80} height={30} />
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Follow us on</h4>
              <div className="flex space-x-4 ">
                <Facebook size={24} className='hover:text-blue-700 cursor-pointer' />
                <Twitter size={24} className='hover:text-blue-500 cursor-pointer' />
                <Linkedin size={24} className='hover:text-blue-400 cursor-pointer' />
                <Youtube size={24} className='hover:text-red-600 cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
        
        <div className=" mx-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Policy Bots Insurance Brokers: Where Insurance Meets Sass</h1>
        
        <p className="mb-2">Registered Office: Boys Hostel G-114, IIT Shahdara, Delhi 110032</p>
        <p className="mb-2"><strong>(Yeah, we&apos;er fancy like that)</strong></p>
        <p className="mb-2">Email: <a href="mailto:enquiry@policybots.com" className="text-blue-500 hover:underline">enquiry@policybots.com</a></p>
        <p className="mb-2"><strong>(We promise to read your emails... eventually)</strong></p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">The Boring (But Important) Stuff</h2>
        <p>We&apos;re registered as a Composite Broker, because why settle for just one type of insurance when you can have them all?</p>
        <p className="mb-2">Registration No. 121 <span className="italic">(It&apos;s like 007, but with less espionage and more paperwork)</span></p>
        <p className="mb-2">Registration Code No. IRDA/ DB 797/ 19 <span className="italic">(Try saying that five times fast)</span></p>
        <p className="mb-2">Valid till 09/06/20?? <span className="italic">(Mark your calendars, folks!)</span></p>
        <p className="mb-2">License category: Composite Broker <span className="italic">(We&apos;re versatile, just like your excuses for not buying insurance)</span></p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Fair Warning</h2>
        <p className="mb-2">Visitors beware: Your information might be shared with insurers. Don&apos;t worry, they&apos;re not as scary as they sound... most of the time.</p>
        <p className="mb-2">Our product info is 100% authentic, straight from the insurers&apos; mouths. We&apos;re just the fabulous messengers.</p>

        <footer className="mt-6 border-t pt-4">
            <p className="mb-2">© Copyright 2024 - Till the End of Time <span className="italic">(or until the next big asteroid, whichever comes first)</span></p>
            <p className="mb-2"><a href="https://policybots.com" className="text-blue-500 hover:underline">policybots.com</a>. All Rights Reserved.</p>
        </footer>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Created by the Team BotGods:</h2>
        <ul className="list-disc list-inside mb-2">
            <li>Akshat Saraswat</li>
            <li>Abhishek Chaudhary</li>
            <li>Sanyam Pandey</li>
            <li>Ankit Lingwal</li>
        </ul>

        <p className="mt-4"><strong>Remember, we&apos;re here to make insurance sexy. Or at least slightly less boring.</strong></p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
