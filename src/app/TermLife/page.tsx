import React from 'react';
import { Heart, ChevronDown, ChevronRight, Info } from 'lucide-react';

const InsurancePlanCard = ({ plan }) => (
  <div className="bg-gray-800 rounded-lg p-12 mx-8 mb-4">
    <div className="flex justify-between items-center mb-2">
      <div>
        <span className="text-orange-500 font-bold">₹0 Cost Plan</span>
        <span className="text-blue-400 ml-2 text-sm">
          Premiums back {plan.premiumsBack} <ChevronDown className="inline h-4 w-4" />
        </span>
      </div>
      <span className="text-blue-400 text-sm">See How <ChevronDown className="inline h-4 w-4" /></span>
    </div>

    <div className="flex items-center justify-between mb-4">
      <img src={plan.logoSrc} alt={plan.name} className="h-8" />
      <div className="text-right">
        <span className="text-orange-500 text-2xl font-bold">₹{plan.monthlyPrice}/month</span>
        <ChevronRight className="inline h-6 w-6 text-orange-500" />
        <div className="text-green-500 text-sm">Online Saving ₹{plan.onlineSaving} <Info className="inline h-4 w-4" /></div>
      </div>
    </div>

    <div className="text-sm mb-4">{plan.name}</div>

    <div className="grid grid-cols-3 gap-4 text-center mb-4">
      <div>
        <div className="font-bold">{plan.claimSettled}% <Info className="inline h-4 w-4" /></div>
        <div className="text-gray-400 text-xs">Claim settled</div>
      </div>
      <div>
        <div className="font-bold">
          {plan.coverageTill} Yrs
          <div className="text-gray-400 text-xs">(Max Limit: {plan.maxLimit} yrs)</div>
        </div>
        <div className="text-gray-400 text-xs">Coverage till</div>
      </div>
      <div>
        <div className="font-bold">₹{plan.lifeCover} Cr</div>
        <div className="text-gray-400 text-xs">Life cover</div>
      </div>
    </div>

    <div className="text-sm mb-4">
      <span className="inline-block mr-2">⏱</span> 24hr claim settlement
    </div>

    <div className="flex justify-between items-center">
      <div className="text-green-500">
        {plan.onlineDiscount}% online discount included (for 1st year)
        {plan.moreOffer && <span className="ml-2 text-blue-400">+{plan.moreOffer} more Offer <ChevronDown className="inline h-4 w-4" /></span>}
      </div>
      <div>
        <button className="bg-green-600 text-white rounded px-2 py-1 text-sm mr-2">{plan.freeAddOns} Free Add-ons</button>
        <button className="bg-blue-600 text-white rounded px-2 py-1 text-sm mr-2">{plan.paidAddOns} Paid Add-ons</button>
        <Heart className="inline h-6 w-6 text-gray-400" />
      </div>
    </div>
  </div>
);

const InsurancePlanComparison = () => {
  const plans = [
    {
      name: "Click 2 Protect Super",
      logoSrc: "/hdfc-life-logo.png",
      monthlyPrice: 1982,
      onlineSaving: 1.2,
      premiumsBack: "during 50-55 yrs of age",
      claimSettled: 99.5,
      coverageTill: 60,
      maxLimit: 85,
      lifeCover: 1,
      onlineDiscount: 5,
      freeAddOns: 2,
      paidAddOns: 5
    },
    {
      name: "Smart Secure Plus",
      logoSrc: "/max-life-logo.png",
      monthlyPrice: 1531,
      onlineSaving: 10.8,
      premiumsBack: "at 44 yrs of age",
      claimSettled: 99.7,
      coverageTill: 60,
      maxLimit: 85,
      lifeCover: 1,
      onlineDiscount: 12,
      moreOffer: 1,
      freeAddOns: 1,
      paidAddOns: 5
    }
  ];

  return (
    <div className="bg-gray-900 text-white p-4">
      <h1 className="text-2xl mb-4">Special plan for Self-Employed Customers <Info className="inline h-5 w-5" /></h1>
      {plans.map((plan, index) => (
        <InsurancePlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default InsurancePlanComparison;