import * as Yup from 'yup';

export const phoneNumberValidationRules = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('This field is required')
    .min(8)
});

export const completeProfileValidationRules = Yup.object().shape({
  first_name: Yup.string()
    .required('*This field is required'),
  last_name: Yup.string()
    .required('*This field is required'),
  username: Yup.string()
    .required('*This field is required')
    .matches(/^\S*$/, '*Please enter a username without spaces.')
    .max(15, '*You can\'t use more than 15 characters'),
  date_of_birth: Yup.string()
    .required('*This field is required'),
  gender: Yup.string()
  .required('*This field is required')
});


export const newEventValidationRules = Yup.object().shape({
  name: Yup.string()
      .required('*This field is required'),
  date: Yup.string()
      .required('*This field is required'),
  start_time: Yup.string()
    .required('*This field is required'),
  end_time: Yup.string()
      .required('*This field is required'),
});


