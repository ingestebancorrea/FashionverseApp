import { AxiosError } from 'axios';

export const errorMessage = (error: AxiosError): string => {
  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case 400:
        return 'La solicitud no es válida.';
      case 401:
        return 'Por favor, compruebe sus credenciales de autenticación.';
      case 403:
        return 'No tiene permiso para acceder a este recurso.';
      case 404:
        return 'No se ha podido encontrar el recurso solicitado.';
      case 500:
        return 'Error interno de servidor.';
      default:
        return 'Se ha producido un error inesperado.';
    }
  } else if (error.request) {
    return 'Error de red: Se ha realizado la solicitud pero no se ha recibido respuesta.';
  } else {
    return `Error: ${error.message || 'Se ha producido un error al configurar la solicitud.'}`;
  }
};
