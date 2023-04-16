import * as Yup from 'yup';

export const loginValidation = Yup.object({
  username: Yup.string()
    .max(25, 'Username cannot exceed 25 characters.')
    .min(3, 'Username cannot have less than 3 characters.')
    .required('This field is mandatory!'),
  password: Yup.string()
    .max(25, 'Password cannot exceed 25 characters.')
    .min(4, 'Password cannot have less than 4 characters.')
    .required('This field is mandatory!')
});
