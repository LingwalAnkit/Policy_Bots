import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/database';
import User from '../../../model/userModel';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  console.log('Login attempt initiated');

  try {
    // Connect to database with error handling
    try {
      await dbConnect();
      console.log('Database connected successfully for login');
    } catch (dbError) {
      console.error('Database connection failed during login:', dbError);
      return NextResponse.json(
        { message: 'Unable to connect to database', error: dbError.message },
        { status: 503 }
      );
    }

    // Parse request body with error handling
    let email, password;
    try {
      const body = await req.json();
      email = body.email;
      password = body.password;
      console.log('Login attempt for email:', email);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { message: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Input validation
    if (!email || !password) {
      console.log('Missing credentials. Email provided:', !!email, 'Password provided:', !!password);
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    let user;
    try {
      user = await User.findOne({ email });
      if (!user) {
        console.log('No user found with email:', email);
        return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
        );
      }
      console.log('User found for email:', email);
    } catch (findError) {
      console.error('Database error while finding user:', findError);
      return NextResponse.json(
        { message: 'Error accessing user data', error: findError.message },
        { status: 500 }
      );
    }

    // Check password
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid password attempt for email:', email);
        return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
        );
      }
      console.log('Password matched for email:', email);
    } catch (bcryptError) {
      console.error('Error during password comparison:', bcryptError);
      return NextResponse.json(
        { message: 'Error verifying credentials', error: bcryptError.message },
        { status: 500 }
      );
    }

    // Successful login
    console.log('Login successful for email:', email);
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error during login:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred', error: error.message },
      { status: 500 }
    );
  }
}