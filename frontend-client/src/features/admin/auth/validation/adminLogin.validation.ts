import * as Yup from 'yup';

export const adminLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

