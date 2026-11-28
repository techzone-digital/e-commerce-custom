import * as Yup from 'yup';

// Indian mobile number regex: 10 digits starting with 6, 7, 8, or 9
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

// Password regex: at least one uppercase letter, one lowercase letter, and one number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export const signupValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  phone: Yup.string()
    .trim()
    .required('Phone number is required')
    .matches(
      INDIAN_PHONE_REGEX,
      'Phone number must be a valid 10-digit Indian mobile number (e.g. 9876543210)'
    ),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

