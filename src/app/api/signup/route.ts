import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/database';
import User from '../../../model/userModel';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    console.log('Starting user registration process');

    // Connect to database with error handling
    try {
      await dbConnect();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { message: 'Database connection failed', error: dbError.message },
        { status: 503 }
      );
    }

    const body = await req.json();
    console.log('Received data:', { ...body, password: '[REDACTED]' });

    const { firstName, lastName, email, password, age, mobileNo } = body;

    // Validation checks
    const validationErrors = [];
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.push('Invalid email format');
    }
    
    if (!password || password.length < 8) {
      validationErrors.push('Password must be at least 8 characters long');
    }
    
    if (!age || isNaN(age) || age < 18 || age > 120) {
      validationErrors.push('Invalid age (must be between 18 and 120)');
    }
    
    if (!mobileNo || !/^\d{10}$/.test(mobileNo)) {
      validationErrors.push('Invalid mobile number (must be 10 digits)');
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Check for existing user
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return NextResponse.json(
        { message: 'Error checking user existence', error: error.message },
        { status: 500 }
      );
    }

    // Create new user
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age: Number(age),
        mobileNo: String(mobileNo),
      });

      await newUser.save();
      console.log('User registered successfully');
      
      return NextResponse.json(
        { 
          success: true,
          message: 'Registration successful',
          user: {
            firstName,
            lastName,
            email,
            age,
            mobileNo
          }
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error saving user:', error);
      return NextResponse.json(
        { message: 'Error creating user', error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}