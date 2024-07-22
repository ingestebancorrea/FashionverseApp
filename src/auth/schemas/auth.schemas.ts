import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
  .string()
  .email()
  .required('Este campo es requerido'),
  password: yup
  .string()
  .required('Este campo es requerido')
  .min(8)
  .max(32),
});

export const signUpSchemaWithOutName = yup.object().shape({
  name: yup
  .string()
  .nullable(),
  lastName: yup
  .string()
  .nullable(),
  email: yup
  .string()
  .email()
  .required('Este campo es requerido'),
  password: yup
  .string()
  .required('Este campo es requerido')
  .min(8)
  .max(32),
  confirmPassword: yup
  .string()
  .required('Este campo es requerido')
  .min(8)
  .max(32),
});

export const signUpSchema = yup.object().shape({
  name: yup
  .string()
  .required('Este campo es requerido'),
  lastName: yup
  .string()
  .required('Este campo es requerido'),
  email: yup
  .string()
  .email()
  .required('Este campo es requerido'),
  password: yup
  .string()
  .required('Este campo es requerido')
  .min(8)
  .max(32),
  confirmPassword: yup
  .string()
  .required('Este campo es requerido')
  .min(8)
  .max(32),
});

export const clientConfirmData = yup.object().shape({
  name: yup
  .string()
  .required('Este campo es requerido'),
  lastName: yup
  .string()
  .required('Este campo es requerido'),
  documentType: yup
  .string()
  .required('Este campo es requerido'),
  documentNumber: yup
  .string()
  .required('Este campo es requerido'),
  dateBirth: yup
  .date()
  .required('Este campo es requerido'),
  terms: yup
  .boolean()
  .oneOf([true], 'Debe aceptar los términos y condiciones.'),
  politics: yup
  .boolean()
  .oneOf([true], 'Debe aceptar la política de privacidad.'),
});

export const storeConfirmData = yup.object().shape({
  name: yup
  .string()
  .required('Este campo es requerido'),
  cellphone: yup
  .string()
  .required('Este campo es requerido'),
  storeType: yup
  .string()
  .required('Este campo es requerido'),
  department: yup
  .string()
  .required('Este campo es requerido'),
  city: yup
  .string()
  .required('Este campo es requerido'),
  neighborhood: yup
  .string()
  .required('Este campo es requerido'),
  street: yup
  .string()
  .required('Este campo es requerido'),
  streetNumber: yup
  .string()
  .required('Este campo es requerido'),
  otherReferences: yup
  .string()
  .nullable(),
  terms: yup
  .boolean()
  .oneOf([true], 'Debe aceptar los términos y condiciones.'),
  politics: yup
  .boolean()
  .oneOf([true], 'Debe aceptar la política de privacidad.'),
});
