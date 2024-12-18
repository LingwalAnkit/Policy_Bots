// formValidation.js

export const validateField = (fieldName, value) => {
    let errors = {};
  
    switch (fieldName) {
      // Personal Information
      case 'fullName':
        if (!value.trim()) {
          errors[fieldName] = 'Full name is required';
        }
        break;
      case 'dateOfBirth':
        if (!value) {
          errors[fieldName] = 'Date of birth is required';
        } else {
          const dob = new Date(value);
          const today = new Date();
          if (dob > today) {
            errors[fieldName] = 'Date of birth cannot be in the future';
          }
        }
        break;
      case 'gender':
        if (!value) {
          errors[fieldName] = 'Gender is required';
        }
        break;
      case 'address':
        if (!value.trim()) {
          errors[fieldName] = 'Address is required';
        }
        break;
      case 'aadhaarNumber':
        if (!value || !/^\d{12}$/.test(value)) {
          errors[fieldName] = 'Aadhaar number must be 12 digits';
        }
        break;
      case 'panNumber':
        if (!value || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
          errors[fieldName] = 'Invalid PAN number format';
        }
        break;
      case 'mobileNumber':
        if (!value || !/^\d{10}$/.test(value)) {
          errors[fieldName] = 'Mobile number must be 10 digits';
        }
        break;
      case 'email':
        if (!value || !/\S+@\S+\.\S+/.test(value)) {
          errors[fieldName] = 'Invalid email address';
        }
        break;
      case 'maritalStatus':
        if (!value) {
          errors[fieldName] = 'Marital status is required';
        }
        break;
      case 'occupation':
        if (!value.trim()) {
          errors[fieldName] = 'Occupation is required';
        }
        break;
      case 'incomeRange':
        if (!value.trim()) {
          errors[fieldName] = 'Income range is required';
        }
        break;
      case 'bankAccountNumber':
        if (!value || !/^\d{9,18}$/.test(value)) {
          errors[fieldName] = 'Invalid bank account number';
        }
        break;
      case 'ifscCode':
        if (!value || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
          errors[fieldName] = 'Invalid IFSC code';
        }
        break;
      case 'policyPremiumFrequency':
        if (!value) {
          errors[fieldName] = 'Policy premium frequency is required';
        }
        break;
  
      // Personal Risk Factors
      case 'isSmoker':
        // No validation needed for boolean fields
        break;
      case 'alcoholConsumption':
        if (!value) {
          errors[fieldName] = 'Alcohol consumption information is required';
        }
        break;
      case 'alcoholFrequency':
        if (value === 'regular' && !value) {
          errors[fieldName] = 'Alcohol frequency is required for regular consumers';
        }
        break;
      case 'preExistingConditions':
        // No validation needed for boolean fields
        break;
      case 'conditionsDetails':
        if (value === true && !value.trim()) {
          errors[fieldName] = 'Details of pre-existing conditions are required';
        }
        break;
      case 'familyMedicalHistory':
        if (!value.trim()) {
          errors[fieldName] = 'Family medical history is required';
        }
        break;
      case 'numberOfDependents':
        if (!value || isNaN(value) || value < 0) {
          errors[fieldName] = 'Number of dependents must be a non-negative number';
        }
        break;
      case 'previousInsuranceClaims':
        if (!value || isNaN(value) || value < 0) {
          errors[fieldName] = 'Previous insurance claims must be a non-negative number';
        }
        break;
      case 'height':
        if (!value || isNaN(value) || value <= 0) {
          errors[fieldName] = 'Height must be a positive number';
        }
        break;
      case 'weight':
        if (!value || isNaN(value) || value <= 0) {
          errors[fieldName] = 'Weight must be a positive number';
        }
        break;
      case 'tobaccoUse':
        if (!value) {
          errors[fieldName] = 'Tobacco use information is required';
        }
        break;
      case 'tobaccoFrequency':
        if (value === 'regular' && !value) {
          errors[fieldName] = 'Tobacco frequency is required for regular users';
        }
        break;
      case 'bloodGroup':
        if (!value) {
          errors[fieldName] = 'Blood group is required';
        }
        break;
      case 'allergies':
        // Optional field, no validation required
        break;
  
      // Nominee Details
      case 'nomineeName':
        if (!value.trim()) {
          errors[fieldName] = 'Nominee name is required';
        }
        break;
      case 'nomineeRelationship':
        if (!value.trim()) {
          errors[fieldName] = 'Nominee relationship is required';
        }
        break;
      case 'nomineeDateOfBirth':
        if (!value) {
          errors[fieldName] = 'Nominee date of birth is required';
        } else {
          const dob = new Date(value);
          const today = new Date();
          if (dob > today) {
            errors[fieldName] = 'Nominee date of birth cannot be in the future';
          }
        }
        break;
      case 'nomineeIdentification':
        if (!value.trim()) {
          errors[fieldName] = 'Nominee identification is required';
        }
        break;
  
      // Assets
      case 'vehicleRegistrationNumber':
        if (value && !/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(value)) {
          errors[fieldName] = 'Invalid vehicle registration number format';
        }
        break;
      case 'vehicleModelMake':
        if (value && !value.trim()) {
          errors[fieldName] = 'Vehicle model/make is required if provided';
        }
        break;
      case 'vehicleManufactureYear':
        if (value && (isNaN(value) || value < 1900 || value > new Date().getFullYear())) {
          errors[fieldName] = 'Invalid vehicle manufacture year';
        }
        break;
      case 'landRegistrationNumber':
        if (value && !value.trim()) {
          errors[fieldName] = 'Land registration number is required if provided';
        }
        break;
      case 'landLocation':
        if (value && !value.trim()) {
          errors[fieldName] = 'Land location is required if provided';
        }
        break;
      case 'landArea':
        if (value && (isNaN(value) || value <= 0)) {
          errors[fieldName] = 'Land area must be a positive number';
        }
        break;
  
      // Declaration and Consent
      case 'kycConsent':
        if (!value) {
          errors[fieldName] = 'KYC consent is required';
        }
        break;
      case 'termsConditions':
        if (!value) {
          errors[fieldName] = 'You must agree to the terms and conditions';
        }
        break;
      case 'digitalSignature':
        if (!value) {
          errors[fieldName] = 'Digital signature is required';
        }
        break;
  
      default:
        // If we've missed any fields, let's add a generic required field error
        if (value === null || value === undefined || value === '') {
          errors[fieldName] = `${fieldName} is required`;
        }
    }
  
    return errors;
  };
  
  export const validateForm = (formData) => {
    let errors = {};
  
    Object.keys(formData).forEach(fieldName => {
      const fieldErrors = validateField(fieldName, formData[fieldName]);
      if (Object.keys(fieldErrors).length > 0) {
        errors = { ...errors, ...fieldErrors };
      }
    });
  
    return errors;
  };