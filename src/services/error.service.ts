import { ErrorInfo } from '../interfaces/ErrorInfo';
import { swalMessageAlertWithTitle } from './swal.service';
import { deleteUserAuth } from './user.service';

export const handleErrorResponse = (error: any, errorKey: string) => {
  if (error.code === 'ERR_NETWORK') {
    return swalMessageAlertWithTitle(
      error.code,
      `<strong>${error.message}</strong>` + ': Check your connection or please try again later.',
      'error'
    );
  }

  const status = error.response?.status || -1;
  const statusText = error.response?.statusText || 'Unknown';

  switch (status) {
    case 400:
      const error400Message = error.response?.data?.[errorKey]?.[0] || error.response.data['error'] || 'Bad Request';
      handleErrorMessage(status, statusText, error400Message);
      break;

    case 401:
      const unauthorizedMessage = 'User unauthenticated or session expired, please sign in again <a href="/">here</a>.';
      deleteUserAuth();
      handleErrorMessage(status, statusText, unauthorizedMessage);
      break;

    case 403:
      const forbiddenMessage = 'Your user does not have permission to perform this action.';
      handleErrorMessage(status, statusText, forbiddenMessage);
      break;

    case 404:
      const notFoundMessage = 'The requested data or resource was not found.';
      swalMessageAlertWithTitle(`<strong>Code ${status}:</strong>`, notFoundMessage, 'warning');
      break;

    default:
      const defaultErrorMessage = 'An error occurred. Please try again later.';
      handleErrorMessage(status, statusText, defaultErrorMessage);
      break;
  }
};

const handleErrorMessage = (statusCode: number, statusText: string, message: string) => {
  const errorResponse: ErrorInfo = {
    statusCode,
    statusText,
    message
  };

  swalMessageAlertWithTitle(`Error ${errorResponse.statusCode}: ${errorResponse.statusText}`, errorResponse.message, 'error');
};
