import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .max(25, 'Username cannot exceed 25 characters.')
    .min(3, 'Username cannot have less than 3 characters.')
    .required('This field is mandatory!'),
  password: Yup.string()
    .max(25, 'Password cannot exceed 25 characters.')
    .min(4, 'Password cannot have less than 4 characters.')
    .required('This field is mandatory!')
});

export const userValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required.')
    .max(25, 'Username cannot exceed 25 characters.')
    .min(3, 'Username cannot have less than 3 characters.'),
  newPassword: Yup.string()
    .max(25, 'Password cannot exceed 25 characters.')
    .min(4, 'Password must be at least 4 characters long.'),
  repeatNewPassword: Yup.string()
    .max(25, 'Password cannot exceed 25 characters.')
    .min(4, 'Password must be at least 4 characters long.')
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match.'),
  firstName: Yup.string()
    .required('First name is required.')
    .max(25, 'First name cannot exceed 25 characters.')
    .min(3, 'First name cannot have less than 3 characters.'),
  lastName: Yup.string()
    .required('Last name is required.')
    .max(25, 'Last name cannot exceed 25 characters.')
    .min(3, 'Last name cannot have less than 3 characters.'),
  email: Yup.string().email('Invalid email address.'),
  userRoleID: Yup.number()
    .typeError('User role ID must be a number')
    .integer('Please select a valid user role.')
    .min(0, 'Please select a valid user role.')
});

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string(),
  newPassword: Yup.string()
    .required('New Password is required.')
    .max(25, 'Password cannot exceed 25 characters.')
    .min(4, 'Password must be at least 4 characters long.')
    .notOneOf(
      [Yup.ref('oldPassword'), undefined],
      'The new password cannot be the same as the old one.'
    ),
  repeatNewPassword: Yup.string()
    .max(25, 'Password cannot exceed 25 characters.')
    .min(4, 'Password must be at least 4 characters long.')
    .oneOf([Yup.ref('newPassword'), undefined], 'The new password must match.')
    .required('Please repeat the new password.')
});

export const categoryValidationSchema = Yup.object({
  categoryID: Yup.number().integer('Category ID must be an integer.'),
  categoryName: Yup.string()
    .max(25, 'Category name cannot exceed 50 characters.')
    .min(4, 'Category name cannot have less than 4 characters.')
    .required('This field is mandatory!')
});

export const productValidationSchema = Yup.object({
  productID: Yup.string(),
  productName: Yup.string()
    .required('Product name is required.')
    .max(50, 'Product name cannot exceed 50 characters.')
    .min(3, 'Product name cannot have less than 3 characters.'),
  productDescription: Yup.string().max(100, 'Product description cannot exceed 100 characters.'),
  productStock: Yup.number()
    .typeError('Product stock must be a number')
    .required('Product stock is required.')
    .integer('Product stock must be an integer.')
    .min(0, 'Product stock must be greater than zero.'),
  productCost: Yup.number()
    .typeError('Product cost must be a number')
    .required('Product cost is required.')
    .positive('Product cost must be greater than zero.'),
  productPrice: Yup.number()
    .typeError('Product price must be a number')
    .required('Product price is required.')
    .positive('Product price must be greater than zero.'),
  productCategoryID: Yup.number()
    .typeError('Product category ID must be a number')
    .required('Product category is required.')
    .integer('Please select a valid product category.')
    .min(1, 'Please select a valid product category.')
});
