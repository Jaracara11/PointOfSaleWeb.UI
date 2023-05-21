import { ErrorInfo } from '../interfaces/ErrorInfo';
import { swalMessageAlertWithTitle } from './swal.service';

export const handleErrorResponse = (error: any, errorKey: string) => {
  if (error.code === 'ERR_NETWORK') {
    return swalMessageAlertWithTitle(
      error.code,
      `<strong>${error.message}</strong>` + ': Check your connection or please try again later.',
      'error'
    );
  }

  switch (error.response.status) {
    case 400:
      const errorResponse400: ErrorInfo = {
        statusCode: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data[errorKey][0]
      };

      swalMessageAlertWithTitle(
        `${errorResponse400.statusCode}: ${errorResponse400.statusText}`,
        errorResponse400.message,
        'error'
      );
      break;

    case 401:
      const errorResponse401: ErrorInfo = {
        statusCode: error.response.status,
        statusText: error.response.statusText,
        message:
          'User unauthenticated or session expired, please sign in again <a href="/">here</a>.'
      };

      swalMessageAlertWithTitle(
        `${errorResponse401.statusCode}: ${errorResponse401.statusText}`,
        errorResponse401.message,
        'error'
      );
      break;

    case 403:
      const errorResponse403: ErrorInfo = {
        statusCode: error.response.status,
        statusText: error.response.statusText,
        message: 'Your user does not have permission to perform this action.'
      };

      swalMessageAlertWithTitle(
        `${errorResponse403.statusCode}: ${errorResponse403.statusText}`,
        errorResponse403.message,
        'error'
      );
      break;
  }
};
