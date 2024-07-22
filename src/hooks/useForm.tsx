import { useState } from 'react';

export const useForm = <T extends Object>(initialState: T & { validationSchema: Record<keyof T, { required: boolean }> }) => {
  const [state, setState] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

  const onChange = (value: string | number, field: keyof T) => {
    if (typeof value === 'string' || typeof value === 'number') {
      setState({
        ...state,
        [field]: value,
      });

      // Limpiar el mensaje de error para el campo si no está vacío
      if (typeof state[field] === 'string' && typeof value === 'string' && value.trim()) {
        const filteredErrors = { ...errors };
        delete filteredErrors[field];
        setErrors(filteredErrors);
      }
    }
  };

  const setFormValue = (form: T) => {
    setState(form);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: { [key in keyof T]?: string } = {};
    for (const key in state) {
      const isRequired = initialState.validationSchema[key].required; // Verificar si el campo es obligatorio
      const isEmpty = !state[key] || state[key] === 'unchecked'; // Verificar si el campo está vacío

      if (isRequired && isEmpty) { // Si el campo es obligatorio y está vacío, establecer un mensaje de error
        newErrors[key] = 'Este campo es obligatorio.';
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  return {
    ...state,
    form: state,
    onChange,
    setFormValue,
    validateForm,
    errors,
  };
};
