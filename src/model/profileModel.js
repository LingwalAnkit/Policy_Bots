import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  // Personal Information
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  maritalStatus: { type: String, enum: ['single', 'married'], required: true },
  occupation: { type: String, required: true },
  incomeRange: { type: String, enum: ['0-5', '5-10', '10+'], required: true },
  bankAccountNumber: { type: String },
  ifscCode: { type: String },
  policyPremiumFrequency: { type: String, enum: ['monthly', 'quarterly', 'yearly'], required: true },
  preExistingConditions: { type: Boolean, default: false },
  preExistingConditionsDetails: { type: String },

  // Nominee details
  nomineeName: { type: String, required: true },
  nomineeRelationship: { type: String, required: true },
  nomineeDateOfBirth: { type: Date, required: true },
  nomineeIdentification: { type: String },

  // Assets
  vehicleRegistrationNumber: { type: String, required: true },
  vehicleModelMake: { type: String, required: true },
  vehicleManufactureYear: { type: Number, required: true },
  landRegistrationNumber: { type: String, required: true },
  landLocation: { type: String, required: true },
  landArea: { type: Number, required: true },

  // Declaration and Consent
  termsConditions: { type: Boolean, required: true },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userProfileSchema.pre('save', function(next) {
  console.log('Attempting to save user profile:', this.toObject());
  next();
});

userProfileSchema.post('save', function(doc, next) {
  console.log('User profile saved successfully:', doc.toObject());
  next();
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;