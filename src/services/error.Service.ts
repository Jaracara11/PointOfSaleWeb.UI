import { ErrorInfo } from '../interfaces/ErrorInfo';
import { swalErrorAlert, swalWarningAlert } from './swal.service';
import { Link } from 'react-router-dom';

export const handleErrorResponse = (error: any, errorKey: string) => {
  if (error.code === 'ERR_NETWORK') {
    return swalErrorAlert(
      error.code,
      `<strong>${error.message}</strong>` +
        ': Check your connection or please try again later.'
    );
  }

  switch (error.response.status) {
    case 400:
      const errorResponse400: ErrorInfo = {
        statusCode: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data[errorKey][0]
      };

      swalErrorAlert(
        `${errorResponse400.statusCode}: ${errorResponse400.statusText}`,
        errorResponse400.message
      );
      break;

    case 401:
      const errorResponse401: ErrorInfo = {
        statusCode: error.response.status,
        statusText: error.response.statusText,
        message:
          'User unauthenticated or session expired, please sign in again <a href="/">here</a>.'
      };

      swalWarningAlert(
        `${errorResponse401.statusCode}: ${errorResponse401.statusText}`,
        errorResponse401.message
      );
      break;
  }
};
