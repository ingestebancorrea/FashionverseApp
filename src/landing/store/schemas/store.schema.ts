import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Este campo es requerido')
    .min(8)
    .max(32),
  category: yup
    .string()
    .required('Este campo es requerido'),
  brand: yup
    .string()
    .required('Este campo es requerido'),
  size: yup
    .string()
    .required('Este campo es requerido'),
  quantity: yup
    .string()
    .required('Este campo es requerido')
    .min(1)
    .max(32),
});

export const productPriceSchema = yup.object().shape({
  price: yup
    .string()
    .required('Este campo es requerido')
    .matches(/^\d+$/, 'El precio debe ser un número entero')
    .test('is-valid-number', 'El precio debe ser un número menor o igual a 500000', (value) => {
      const numberValue = parseFloat(value);
      return numberValue <= 500000;
    }),
});
