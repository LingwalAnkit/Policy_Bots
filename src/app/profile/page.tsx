"use client";
import React, { useEffect, useState } from "react";
import { Bell, User, ChevronRight, ClipboardList, Info, BadgeDollarSign } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from "../../section/themeToggel";
import PDFDownloadButton from './PDFDownloadButton'

interface User {
  firstName: string;
  lastName: string;
}

const MultiStepForm = () => {
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    aadhaarNumber: "",
    panNumber: "",
    mobileNumber: "",
    email: "",
    maritalStatus: "",
    occupation: "",
    incomeRange: "",
    bankAccountNumber: "",
    ifscCode: "",
    policyPremiumFrequency: "",
    // Personal Risk Factor
    isSmoker: false,
    alcoholConsumption: "",
    alcoholFrequency: "",
    preExistingConditions: false,
    conditionsDetails: "",
    familyMedicalHistory: "",
    numberOfDependents: "",
    previousInsuranceClaims: "",
    height: "",
    weight: "",
    tobaccoUse: "",
    tobaccoFrequency: "",
    bloodGroup: "",
    allergies: "",
    // Nominee details
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDateOfBirth: "",
    nomineeIdentification: "",
    // Assets
    vehicleRegistrationNumber: "",
    vehicleModelMake: "",
    vehicleManufactureYear: "",
    landRegistrationNumber: "",
    landLocation: "",
    landArea: "",
    // Declaration and Consent
    kycConsent: false,
    termsConditions: false,
    digitalSignature: null,
  });

  useEffect(() => {
    const persistedData = JSON.parse(localStorage.getItem('userdata'))
    if (persistedData) {
      setFormData(persistedData)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div>
              <label htmlFor="fullName" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">Gender</label>
              <div className="space-x-4">
                {["Male", "Female", "Other"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option.toLowerCase()}
                      checked={formData.gender === option.toLowerCase()}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="aadhaarNumber" className="block mb-2">
                Aadhaar Number
              </label>
              <input
                type="number"
                id="aadhaarNumber"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="panNumber" className="block mb-2">
                Pan Number
              </label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block mb-2">
                Mobile Number
              </label>
              <input
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">Marital Status</label>
              <div className="space-x-4 mb-2">
                {["Single", "Married"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={option.toLowerCase()}
                      checked={formData.maritalStatus === option.toLowerCase()}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <div>
                <label htmlFor="occupation" className="block mb-2 mt-4">
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md mb-4"
                />
              </div>
              <div>
                <label htmlFor="incomeRange" className="block mb-2">
                  Income Range
                </label>
                <input
                  type="text"
                  id="incomeRange"
                  name="incomeRange"
                  value={formData.incomeRange}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md mb-4"
                />
              </div>
              <div>
                <label htmlFor="bankAccountNumber" className="block mb-2">
                  Bank Account Number
                </label>
                <input
                  type="number"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md mb-4"
                />
              </div>
              <div>
                <label htmlFor="ifscCode" className="block mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md mb-4"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Personal Risk Factors</h2>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isSmoker"
                  checked={formData.isSmoker}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Are you a smoker?
              </label>
            </div>
            <div>
              <label htmlFor="alcoholConsumption" className="block mb-2">
                Alcohol Consumption
              </label>
              <select
                id="alcoholConsumption"
                name="alcoholConsumption"
                value={formData.alcoholConsumption}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="occasional">Occasional</option>
                <option value="regular">Regular</option>
              </select>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="preExistingConditions"
                  checked={formData.preExistingConditions}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Pre Existing Conditions
              </label>

              {formData.preExistingConditions && (
                <textarea
                  name="conditionsDetails"
                  value={formData.conditionsDetails || ""}
                  onChange={handleInputChange}
                  className="mt-2 p-2 border rounded-md w-full"
                  placeholder="Please provide details of pre-existing conditions"
                />
              )}
            </div>
            <div>
              <label htmlFor="familyMedicalHistory" className="block mb-2">
                Family Medical History
              </label>
              <input
                type="text"
                id="familyMedicalHistory"
                name="familyMedicalHistory"
                value={formData.familyMedicalHistory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label htmlFor="numberOfDependents" className="block mb-2">
                Number Of Dependents
              </label>
              <input
                type="Number"
                id="numberOfDependents"
                name="numberOfDependents"
                value={formData.numberOfDependents}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label htmlFor="previousInsuranceClaims" className="block mb-2">
                Previous Insurance Claims
              </label>
              <input
                type="Number"
                id="previousInsuranceClaims"
                name="previousInsuranceClaims"
                value={formData.previousInsuranceClaims}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label htmlFor="height" className="block mb-2">
                Height
              </label>
              <input
                type="Number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block mb-2">
                Weight
              </label>
              <input
                type="Number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block mb-2">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="none">A+</option>
                <option value="occasional">A-</option>
                <option value="regular">B+</option>
                <option value="regular">B-</option>
                <option value="regular">AB+</option>
                <option value="regular">AB-</option>
                <option value="regular">O+</option>
                <option value="regular">O-</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Nominee Details</h2>
            <div>
              <label htmlFor="nomineeName" className="block mb-2">
                Nominee Name
              </label>
              <input
                type="text"
                id="nomineeName"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="nomineeRelationship" className="block mb-2">
                Nominee Relationship
              </label>
              <input
                type="text"
                id="nomineeRelationship"
                name="nomineeRelationship"
                value={formData.nomineeRelationship}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="nomineeDateOfBirth" className="block mb-2">
                Nominee Date Of Birth
              </label>
              <input
                type="date"
                id="nomineeDateOfBirth"
                name="nomineeDateOfBirth"
                value={formData.nomineeDateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="nomineeIdentification" className="block mb-2">
                Nominee Identification
              </label>
              <input
                type="text"
                id="nomineeIdentification"
                name="nomineeIdentification"
                value={formData.nomineeIdentification}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Assets</h2>
            <div>
              <label htmlFor="vehicleRegistrationNumber" className="block mb-2">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                id="vehicleRegistrationNumber"
                name="vehicleRegistrationNumber"
                value={formData.vehicleRegistrationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="vehicleModelMake" className="block mb-2">
                Vehicle Model Make
              </label>
              <input
                type="text"
                id="vehicleModelMake"
                name="vehicleModelMake"
                value={formData.vehicleModelMake}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="vehicleManufactureYear" className="block mb-2">
                Vehicle Manufacture Year
              </label>
              <input
                type="Number"
                id="vehicleManufactureYear"
                name="vehicleManufactureYear"
                value={formData.vehicleManufactureYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="landRegistrationNumber" className="block mb-2">
                Land Registration Number
              </label>
              <input
                type="Number"
                id="landRegistrationNumber"
                name="landRegistrationNumber"
                value={formData.landRegistrationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="landLocation" className="block mb-2">
                Land Location
              </label>
              <input
                type="text"
                id="landLocation"
                name="landLocation"
                value={formData.landLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="landArea" className="block mb-2">
                Land Area
              </label>
              <input
                type="Number"
                id="landArea"
                name="landArea"
                value={formData.landArea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Declaration and Consent</h2>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="kycConsent"
                  checked={formData.kycConsent}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                I consent to KYC verification
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="termsConditions"
                  checked={formData.termsConditions}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                I agree to the terms and conditions
              </label>
            </div>
            {/* Add digital signature field */}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to a server
    localStorage.setItem('userdata', JSON.stringify(formData))
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <header className="bg-white dark:bg-gray-800 pb-4 pt-1 flex justify-between items-center">
        <div className="flex flex-col items-center pt-2 px-16">
          <h1 className='dark:text-white'>Policy Bots</h1>
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
                <Link href='/transactions'>
                  <button className="w-full mb-2 mt-2 text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <BadgeDollarSign className="mr-2" size={20} />
                    Your Transactions
                  </button>
                </Link>
                <Link href="/profile">
                  <button className="w-full mb-2 mt-2 text-left p-2 bg-blue-50 dark:bg-gray-500 text-blue-600  dark:text-[#F9FAFB] dark:font-semibold rounded flex items-center">
                    <User className="mr-2" size={20} />
                    Profile
                  </button>
                </Link>
              </nav>
            </div>
          </div>

          <div className='w-2/3'>
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-600 rounded-lg shadow p-6 mb-6"
            >
              {renderStep()}
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    Previous
                  </button>
                )}
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <>
                    <PDFDownloadButton />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-600 dark:text-gray-400">
        <a href="#" className="mr-4">Disclaimer</a>
        <a href="#">Privacy policy</a>
      </footer>
    </div>
  );
};

export default MultiStepForm;
