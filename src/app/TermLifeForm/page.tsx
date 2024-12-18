'use client'
import React, { useState } from 'react';

const formFields = {
  personalInfo: ['fullName', 'dateOfBirth', 'gender', 'maritalStatus', 'occupation', 'height', 'weight', 'bloodGroup'],
  contactInfo: ['address', 'mobileNumber', 'email'],
  identificationInfo: ['aadhaarNumber', 'panNumber'],
  financialInfo: ['incomeRange', 'bankAccountNumber', 'ifscCode'],
  healthInfo: ['isSmoker', 'alcoholConsumption', 'preExistingConditions', 'conditionsDetails', 'familyMedicalHistory', 'numberOfDependents', 'previousInsuranceClaims'],
  nomineeInfo: ['nomineeName', 'nomineeRelationship', 'nomineeDateOfBirth', 'nomineeIdentification'],
  vehicleInfo: ['vehicleRegistrationNumber', 'vehicleModelMake', 'vehicleManufactureYear'],
  propertyInfo: ['landRegistrationNumber', 'landLocation', 'landArea'],
  consentInfo: ['kycConsent', 'termsConditions']
};

const stepTitles = {
  personalInfo: 'Personal Information',
  contactInfo: 'Contact Information',
  identificationInfo: 'Identification',
  financialInfo: 'Financial Information',
  healthInfo: 'Health Information',
  nomineeInfo: 'Nominee Details',
  vehicleInfo: 'Vehicle Information',
  propertyInfo: 'Property Information',
  consentInfo: 'Consent and Terms'
};

export default function Home() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', dateOfBirth: '', gender: '', address: '', aadhaarNumber: '',
    panNumber: '', mobileNumber: '', email: '', maritalStatus: '', occupation: '',
    incomeRange: '', bankAccountNumber: '', ifscCode: '', nomineeName: '', 
    nomineeRelationship: '', nomineeDateOfBirth: '', nomineeIdentification: '',
    vehicleRegistrationNumber: '', vehicleModelMake: '', vehicleManufactureYear: '', 
    landRegistrationNumber: '', landLocation: '', landArea: '', isSmoker: '',
    alcoholConsumption: '', preExistingConditions: '', conditionsDetails: '',
    familyMedicalHistory: '', numberOfDependents: '', previousInsuranceClaims: '',
    height: '', weight: '', bloodGroup: '', kycConsent: '', termsConditions: ''
  });
  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState('personalInfo');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFormData(data);
      setMessage('Data extracted successfully');
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to submit the form data
    console.log(formData);
    setMessage('Form submitted successfully');
  };

  const renderFormFields = (stepFields) => {
    return stepFields.map(field => (
      <div key={field} className="mb-4">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor={field}>
          {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={field}
          name={field}
          type="text"
          value={formData[field]}
          onChange={handleInputChange}
        />
      </div>
    ));
  };

  const nextStep = () => {
    const steps = Object.keys(formFields);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = Object.keys(formFields);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit} className="w-full max-w-lg mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white text-lg font-bold mb-2" htmlFor="file">
            Upload PDF
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" onChange={handleFileChange} accept=".pdf" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 dark:text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Extract Data
          </button>
        </div>
      </form>

      <form onSubmit={handleFormSubmit} className="w-full max-w-lg">
        <h2 className="text-2xl dark:text-white font-bold mb-4">{stepTitles[currentStep]}</h2>
        {renderFormFields(formFields[currentStep])}
        <div className="flex items-center justify-between mt-6">
          {currentStep !== 'personalInfo' && (
            <button type="button" onClick={prevStep} className="bg-gray-500 dark:text-white hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Previous
            </button>
          )}
          {currentStep !== 'consentInfo' ? (
            <button type="button" onClick={nextStep} className="bg-blue-500 dark:text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Next
            </button>
          ) : (
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          )}
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <p className="text-green-500">{message}</p>
        </div>
      )}
    </main>
  );
}